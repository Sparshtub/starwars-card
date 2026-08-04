import type { Person, Planet, Species, Film, PaginatedResponse } from '../types/starwars';

const BASE_URL = 'https://swapi.py4e.com/api';
const FALLBACK_URL = 'https://swapi.dev/api';

// In-memory caching maps to eliminate redundant endpoint requests
const planetCache = new Map<string, Planet>();
const speciesCache = new Map<string, Species>();
const filmCache = new Map<string, Film>();

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('http') 
    ? endpoint.replace(/^https?:\/\/[^\/]+\/api/, '')
    : endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const response = await fetch(`${BASE_URL}${cleanEndpoint}`);
    if (!response.ok) {
      throw new Error(`Primary API failed with status ${response.status}`);
    }
    return await response.json();
  } catch (primaryErr) {
    console.warn('SWAPI primary endpoint failed, trying fallback...', primaryErr);
    const fallbackResponse = await fetch(`${FALLBACK_URL}${cleanEndpoint}`);
    if (!fallbackResponse.ok) {
      throw new Error(`API error: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
    }
    return await fallbackResponse.json();
  }
}

export async function fetchPeople(
  page: number = 1, 
  searchQuery: string = ''
): Promise<PaginatedResponse<Person>> {
  let endpoint = `/people/?page=${page}`;
  if (searchQuery.trim()) {
    endpoint = `/people/?search=${encodeURIComponent(searchQuery.trim())}`;
  }
  return fetchWithFallback<PaginatedResponse<Person>>(endpoint);
}

export async function fetchPlanet(url: string): Promise<Planet> {
  if (!url) {
    throw new Error('Homeworld URL is required');
  }
  if (planetCache.has(url)) {
    return planetCache.get(url)!;
  }
  const planet = await fetchWithFallback<Planet>(url);
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
  const species = await fetchWithFallback<Species>(url);
  speciesCache.set(url, species);
  return species;
}

export async function fetchAllPlanets(): Promise<Planet[]> {
  try {
    const data = await fetchWithFallback<PaginatedResponse<Planet>>('/planets/?page=1');
    return data.results;
  } catch {
    return [];
  }
}

export async function fetchAllFilms(): Promise<Film[]> {
  try {
    if (filmCache.size > 0) {
      return Array.from(filmCache.values());
    }
    const data = await fetchWithFallback<PaginatedResponse<Film>>('/films/');
    data.results.forEach(film => filmCache.set(film.url, film));
    return data.results;
  } catch {
    return [];
  }
}
