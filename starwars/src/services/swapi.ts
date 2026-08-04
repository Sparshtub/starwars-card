import type { Person, Planet, Species, Film, PaginatedResponse } from '../types/starwars';

const AKABAB_ALL_JSON = 'https://akabab.github.io/starwars-api/api/all.json';
const SWAPI_INFO_BASE = 'https://swapi.info/api';
const PY4E_FALLBACK_BASE = 'https://swapi.py4e.com/api';
const DEV_FALLBACK_BASE = 'https://swapi.dev/api';

// In-memory caching maps to eliminate redundant endpoint requests
const planetCache = new Map<string, Planet>();
const speciesCache = new Map<string, Species>();
const filmCache = new Map<string, Film>();
let akababImageMap = new Map<string, string>(); // name/id -> image URL
let allPeopleCache: Person[] | null = null;

interface AkababCharacter {
  id: number;
  name: string;
  height?: number;
  mass?: number;
  gender?: string;
  homeworld?: string;
  wiki?: string;
  image?: string;
  born?: number | string;
  species?: string;
  hairColor?: string;
  eyeColor?: string;
  skinColor?: string;
}

async function fetchFromUrl<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Pre-fetches Akabab Star Wars API character database for high-definition character images.
 */
async function loadAkababDatabase(): Promise<Map<string, string>> {
  if (akababImageMap.size > 0) return akababImageMap;
  try {
    const list = await fetchFromUrl<AkababCharacter[]>(AKABAB_ALL_JSON);
    if (Array.isArray(list)) {
      list.forEach((char) => {
        if (char.name && char.image) {
          akababImageMap.set(char.name.toLowerCase().trim(), char.image);
          if (char.id) {
            akababImageMap.set(String(char.id), char.image);
          }
        }
      });
    }
  } catch (err) {
    console.warn('Could not fetch Akabab Star Wars API image registry:', err);
  }
  return akababImageMap;
}

/**
 * Universal endpoint requester trying swapi.info first, then py4e, then swapi.dev.
 */
async function fetchSwapiResource<T>(path: string): Promise<T> {
  const cleanPath = path.startsWith('http')
    ? path.replace(/^https?:\/\/[^\/]+\/api/, '')
    : path.startsWith('/') ? path : `/${path}`;

  try {
    return await fetchFromUrl<T>(`${SWAPI_INFO_BASE}${cleanPath}`);
  } catch (err1) {
    console.warn(`Primary swapi.info failed for ${cleanPath}, trying py4e...`, err1);
    try {
      return await fetchFromUrl<T>(`${PY4E_FALLBACK_BASE}${cleanPath}`);
    } catch (err2) {
      console.warn(`py4e fallback failed for ${cleanPath}, trying swapi.dev...`, err2);
      return await fetchFromUrl<T>(`${DEV_FALLBACK_BASE}${cleanPath}`);
    }
  }
}

export async function fetchPeople(
  page: number = 1,
  searchQuery: string = ''
): Promise<PaginatedResponse<Person>> {
  // Pre-load Akabab images in parallel
  const imageMapPromise = loadAkababDatabase();

  try {
    if (!allPeopleCache) {
      const data = await fetchFromUrl<Person[] | PaginatedResponse<Person>>(`${SWAPI_INFO_BASE}/people`);
      const rawList = Array.isArray(data) ? data : data.results || [];
      const imageMap = await imageMapPromise;

      allPeopleCache = rawList.map((person) => {
        const idMatch = person.url ? person.url.match(/\/(\d+)\/?$/) : null;
        const id = idMatch ? idMatch[1] : '';
        const nameKey = person.name.toLowerCase().trim();
        const akababImg = imageMap.get(nameKey) || imageMap.get(id);

        return {
          ...person,
          image: akababImg || `https://starwars-visualguide.com/assets/img/characters/${id || 1}.jpg`,
        };
      });
    }

    if (allPeopleCache) {
      let filtered = allPeopleCache;
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        filtered = allPeopleCache.filter((person) =>
          person.name.toLowerCase().includes(query)
        );
      }

      const count = filtered.length;
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const results = filtered.slice(startIndex, startIndex + pageSize);

      return {
        count,
        next: startIndex + pageSize < count ? `page=${page + 1}` : null,
        previous: page > 1 ? `page=${page - 1}` : null,
        results,
      };
    }
  } catch (err) {
    console.warn('Primary people fetch failed, falling back to paginated endpoints:', err);
  }

  // Fallback to paginated SWAPI endpoints
  let endpoint = `/people/?page=${page}`;
  if (searchQuery.trim()) {
    endpoint = `/people/?search=${encodeURIComponent(searchQuery.trim())}`;
  }
  const fallbackData = await fetchSwapiResource<PaginatedResponse<Person> | Person[]>(endpoint);
  const imageMap = await imageMapPromise;

  if (Array.isArray(fallbackData)) {
    const mapped = fallbackData.map((p) => {
      const idMatch = p.url ? p.url.match(/\/(\d+)\/?$/) : null;
      const id = idMatch ? idMatch[1] : '';
      const akababImg = imageMap.get(p.name.toLowerCase().trim()) || imageMap.get(id);
      return {
        ...p,
        image: akababImg || `https://starwars-visualguide.com/assets/img/characters/${id || 1}.jpg`,
      };
    });
    return {
      count: mapped.length,
      next: null,
      previous: null,
      results: mapped.slice(0, 10),
    };
  }

  const resultsWithImages = fallbackData.results.map((p) => {
    const idMatch = p.url ? p.url.match(/\/(\d+)\/?$/) : null;
    const id = idMatch ? idMatch[1] : '';
    const akababImg = imageMap.get(p.name.toLowerCase().trim()) || imageMap.get(id);
    return {
      ...p,
      image: akababImg || `https://starwars-visualguide.com/assets/img/characters/${id || 1}.jpg`,
    };
  });

  return {
    ...fallbackData,
    results: resultsWithImages,
  };
}

export async function fetchPlanet(url: string): Promise<Planet> {
  if (!url) {
    throw new Error('Homeworld URL is required');
  }
  if (planetCache.has(url)) {
    return planetCache.get(url)!;
  }
  const planet = await fetchSwapiResource<Planet>(url);
  planetCache.set(url, planet);
  return planet;
}

export async function fetchSpecies(url: string): Promise<Species> {
  if (!url) {
    throw new Error('Species URL is required');
  }
  if (speciesCache.has(url)) {
    return speciesCache.get(url)!;
  }
  const species = await fetchSwapiResource<Species>(url);
  speciesCache.set(url, species);
  return species;
}

export async function fetchAllPlanets(): Promise<Planet[]> {
  try {
    const data = await fetchSwapiResource<Planet[] | PaginatedResponse<Planet>>('/planets');
    if (Array.isArray(data)) {
      return data;
    }
    return data.results || [];
  } catch {
    return [];
  }
}

export async function fetchAllFilms(): Promise<Film[]> {
  try {
    if (filmCache.size > 0) {
      return Array.from(filmCache.values());
    }
    const data = await fetchSwapiResource<Film[] | PaginatedResponse<Film>>('/films');
    const films = Array.isArray(data) ? data : data.results || [];
    films.forEach((film) => filmCache.set(film.url, film));
    return films;
  } catch {
    return [];
  }
}
