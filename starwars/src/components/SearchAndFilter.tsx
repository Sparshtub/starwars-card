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
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const hasActiveFilters = Boolean(
    searchQuery || selectedHomeworld || selectedSpecies || selectedFilm
  );

  const activeDropdownCount = [selectedHomeworld, selectedSpecies, selectedFilm].filter(Boolean).length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-lg backdrop-blur-sm space-y-3 sm:space-y-4 mb-4 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-800/80 pb-2.5 sm:pb-3">
        <div className="flex items-center justify-between sm:justify-start">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider text-slate-200">
              Search & Galactic Filters
            </h2>
          </div>

          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="sm:hidden flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg"
          >
            <span>{showMobileFilters ? 'Hide Filters' : 'Filter Options'}</span>
            {activeDropdownCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px]">
                {activeDropdownCount}
              </span>
            )}
          </button>
        </div>

        {/* Image Source Mode & Refresh Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center bg-slate-950 p-0.5 sm:p-1 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-mono">
            <button
              onClick={() => onImageModeChange('picsum')}
              className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                imageMode === 'picsum'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Picsum</span>
            </button>
            <button
              onClick={() => onImageModeChange('official')}
              className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                imageMode === 'official'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Image className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Visual Guide</span>
            </button>
          </div>

          <button
            onClick={onRefreshAllImages}
            title="Refresh pics for all character cards"
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
          >
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Refresh</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-1 text-[11px] sm:text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-rose-500/30 transition-colors"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 ${showMobileFilters ? 'block' : 'hidden sm:grid'}`}>
        {/* Name Search Box */}
        <div className="relative col-span-1">
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
