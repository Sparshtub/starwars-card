import type { Person, Planet, Species, Film, PaginatedResponse } from '../types/starwars';

const SWAPI_INFO_BASE = 'https://swapi.info/api';
const PY4E_FALLBACK_BASE = 'https://swapi.py4e.com/api';
const DEV_FALLBACK_BASE = 'https://swapi.dev/api';

// In-memory caching maps to eliminate redundant endpoint requests
const planetCache = new Map<string, Planet>();
const speciesCache = new Map<string, Species>();
const filmCache = new Map<string, Film>();
let allPeopleCache: Person[] | null = null;

async function fetchFromUrl<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Universal endpoint requester trying https://swapi.info/api first, then py4e, then dev.
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
  try {
    // 1. Try fetching full people collection from swapi.info
    if (!allPeopleCache) {
      const data = await fetchFromUrl<Person[] | PaginatedResponse<Person>>(`${SWAPI_INFO_BASE}/people`);
      if (Array.isArray(data)) {
        allPeopleCache = data;
      } else if (data.results) {
        allPeopleCache = data.results;
      }
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
    console.warn('swapi.info people fetch failed, falling back to paginated endpoints:', err);
  }

  // 2. Fallback to paginated SWAPI endpoints
  let endpoint = `/people/?page=${page}`;
  if (searchQuery.trim()) {
    endpoint = `/people/?search=${encodeURIComponent(searchQuery.trim())}`;
  }
  const fallbackData = await fetchSwapiResource<PaginatedResponse<Person> | Person[]>(endpoint);
  if (Array.isArray(fallbackData)) {
    return {
      count: fallbackData.length,
      next: null,
      previous: null,
      results: fallbackData.slice(0, 10),
    };
  }
  return fallbackData;
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
