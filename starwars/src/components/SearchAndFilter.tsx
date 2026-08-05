import React from 'react';
import type { Planet, Film } from '../types/starwars';
import type { ImageMode } from '../services/characterImages';
import { Search, Filter, X, Globe, Dna, Clapperboard, RefreshCw, Image, Sparkles } from 'lucide-react';

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
  imageMode: ImageMode;
  onImageModeChange: (mode: ImageMode) => void;
  onRefreshAllImages: () => void;
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
  imageMode,
  onImageModeChange,
  onRefreshAllImages,
}) => {
  const hasActiveFilters = Boolean(
    searchQuery || selectedHomeworld || selectedSpecies || selectedFilm
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-sm space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-200">
            Search & Galactic Filters
          </h2>
        </div>

        {/* Image Source Mode & Refresh Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => onImageModeChange('picsum')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
                imageMode === 'picsum'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alternate Pics</span>
            </button>
            <button
              onClick={() => onImageModeChange('official')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
                imageMode === 'official'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Visual Guide</span>
            </button>
          </div>

          <button
            onClick={onRefreshAllImages}
            title="Refresh pics for all character cards"
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh Pics</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1.5 rounded-xl border border-rose-500/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
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
    </div>
  );
};
