import React from 'react';
import type { Planet, Film } from '../types/starwars';
import { Search, Filter, X, Globe, Dna, Clapperboard, Sparkles } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedHomeworld: string;
  onHomeworldChange: (homeworld: string) => void;
  selectedSpecies: string;
  onSpeciesChange: (species: string) => void;
  selectedFilm: string;
  onFilmChange: (film: string) => void;
  allPlanets: Planet[];
  allFilms: Film[];
  onClearFilters: () => void;
}

const SPECIES_OPTIONS = [
  'Human',
  'Droid',
  'Wookiee',
  'Rodian',
  'Hutt',
  'Yoda\'s species',
  'Trandoshan',
  'Mon Calamari',
  'Ewok',
  'Zabrak',
];

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedHomeworld,
  onHomeworldChange,
  selectedSpecies,
  onSpeciesChange,
  selectedFilm,
  onFilmChange,
  allPlanets,
  allFilms,
  onClearFilters,
}) => {
  const hasActiveFilters = Boolean(
    searchQuery || selectedHomeworld || selectedSpecies || selectedFilm
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-sm space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-200">
            Search & Galactic Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Name Search Box */}
        <div className="relative md:col-span-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search character name..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        {/* Homeworld Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedHomeworld}
            onChange={(e) => onHomeworldChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Homeworlds</option>
            {allPlanets.map((planet) => (
              <option key={planet.url} value={planet.url}>
                {planet.name}
              </option>
            ))}
          </select>
          <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        </div>

        {/* Species Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedSpecies}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Species</option>
            {SPECIES_OPTIONS.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
          <Dna className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        </div>

        {/* Film Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedFilm}
            onChange={(e) => onFilmChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Films</option>
            {allFilms.map((film) => (
              <option key={film.url} value={film.url}>
                {film.title} (Ep {film.episode_id})
              </option>
            ))}
          </select>
          <Clapperboard className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono pt-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Active filter parameters combined with real-time SWAPI pagination</span>
        </div>
      )}
    </div>
  );
};
