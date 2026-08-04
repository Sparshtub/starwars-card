import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Person, Planet, Film } from '../types/starwars';
import { fetchPeople, fetchSpecies, fetchAllPlanets, fetchAllFilms } from '../services/swapi';
import { extractIdFromUrl } from '../utils/formatters';

interface UsePeopleProps {
  page: number;
  searchQuery: string;
  selectedHomeworld: string;
  selectedSpecies: string;
  selectedFilm: string;
}

export function usePeople({
  page,
  searchQuery,
  selectedHomeworld,
  selectedSpecies,
  selectedFilm,
}: UsePeopleProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Species names map for each character URL/person URL
  const [speciesMap, setSpeciesMap] = useState<Record<string, string>>({});
  
  // Lists for filter options
  const [allPlanets, setAllPlanets] = useState<Planet[]>([]);
  const [allFilms, setAllFilms] = useState<Film[]>([]);

  // Pre-fetch filter metadata (planets and films) once
  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchAllPlanets(), fetchAllFilms()])
      .then(([planets, films]) => {
        if (isMounted) {
          setAllPlanets(planets);
          setAllFilms(films);
        }
      })
      .catch((err) => console.warn('Failed to fetch filter metadata:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  const loadPeople = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPeople(page, searchQuery);
      setPeople(data.results);
      setTotalCount(data.count);

      // Asynchronously fetch species names for characters on current page
      const newSpeciesMap: Record<string, string> = {};
      const speciesPromises = data.results.map(async (person) => {
        const charId = extractIdFromUrl(person.url);
        if (person.species && person.species.length > 0) {
          try {
            const speciesData = await fetchSpecies(person.species[0]);
            newSpeciesMap[charId] = speciesData.name;
          } catch {
            newSpeciesMap[charId] = 'Human / Unspecified';
          }
        } else {
          newSpeciesMap[charId] = 'Human';
        }
      });

      await Promise.all(speciesPromises);
      setSpeciesMap((prev) => ({ ...prev, ...newSpeciesMap }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to load Star Wars characters from API. Please verify server connection.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  // Client-side combined filtration for homeworld, species, and film
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Homeworld filter
      if (selectedHomeworld) {
        const targetId = extractIdFromUrl(selectedHomeworld);
        const personHomeworldId = extractIdFromUrl(person.homeworld);
        if (personHomeworldId !== targetId) return false;
      }

      // Species filter
      if (selectedSpecies) {
        const charId = extractIdFromUrl(person.url);
        const speciesName = speciesMap[charId] || 'Human';
        if (selectedSpecies.toLowerCase() === 'human') {
          if (speciesName.toLowerCase() !== 'human' && speciesName.toLowerCase() !== 'human / unspecified') {
            return false;
          }
        } else if (!speciesName.toLowerCase().includes(selectedSpecies.toLowerCase())) {
          return false;
        }
      }

      // Film filter
      if (selectedFilm) {
        const targetFilmId = extractIdFromUrl(selectedFilm);
        const personFilmIds = person.films.map(extractIdFromUrl);
        if (!personFilmIds.includes(targetFilmId)) return false;
      }

      return true;
    });
  }, [people, selectedHomeworld, selectedSpecies, selectedFilm, speciesMap]);

  const totalPages = Math.ceil(totalCount / 10) || 1;

  return {
    people: filteredPeople,
    rawPeopleCount: people.length,
    totalCount,
    totalPages,
    loading,
    error,
    refetch: loadPeople,
    speciesMap,
    allPlanets,
    allFilms,
  };
}
