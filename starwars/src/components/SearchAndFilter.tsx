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
  const [prevQuery, setPrevQuery] = React.useState(searchQuery);
  const [searchInput, setSearchInput] = React.useState(searchQuery);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Synchronize local searchInput when searchQuery changes externally (e.g. onClearFilters)
  if (prevQuery !== searchQuery) {
    setPrevQuery(searchQuery);
    setSearchInput(searchQuery);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput.trim());
  };

  const handleClearSearchInput = () => {
    setSearchInput('');
    onSearchChange('');
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedHomeworld || selectedSpecies || selectedFilm
  );

  const activeDropdownCount = [selectedHomeworld, selectedSpecies, selectedFilm].filter(Boolean).length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-lg backdrop-blur-sm space-y-3.5 sm:space-y-4 mb-4 sm:mb-8">
      
      {/* 1. Primary Dedicated Search Form (Always Visible on Mobile & Desktop) */}
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search character name (e.g. Luke, Vader, R2)..."
            className="w-full pl-9 pr-8 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all font-mono"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearchInput}
              title="Clear search"
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-200 p-0.5 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dedicated Search Button */}
        <button
          type="submit"
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          <span>Search</span>
        </button>
      </form>

      {/* 2. Secondary Bar: Mobile Filter Drawer Toggle & Image Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-t border-slate-800/80 pt-3">
        <div className="flex items-center justify-between sm:justify-start space-x-2">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold font-mono uppercase tracking-wider text-slate-300">
              Galactic Filters
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="sm:hidden flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg transition-colors"
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
              type="button"
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
              type="button"
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
            type="button"
            onClick={onRefreshAllImages}
            title="Refresh pics for all character cards"
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
          >
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Refresh</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                onClearFilters();
              }}
              className="flex items-center space-x-1 text-[11px] sm:text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-rose-500/30 transition-colors"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Filter Dropdowns Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 ${showMobileFilters ? 'block space-y-2 sm:space-y-0' : 'hidden sm:grid'}`}>
        {/* Homeworld Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedHomeworld}
            onChange={(e) => onHomeworldChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Homeworlds</option>
            {allPlanets.map((planet) => (
              <option key={planet.url} value={planet.url}>
                {planet.name}
              </option>
            ))}
          </select>
          <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 sm:top-3 pointer-events-none" />
        </div>

        {/* Species Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedSpecies}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Species</option>
            {SPECIES_OPTIONS.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
          <Dna className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 sm:top-3 pointer-events-none" />
        </div>

        {/* Film Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedFilm}
            onChange={(e) => onFilmChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Films</option>
            {allFilms.map((film) => (
              <option key={film.url} value={film.url}>
                {film.title} (Ep {film.episode_id})
              </option>
            ))}
          </select>
          <Clapperboard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 sm:top-3 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
