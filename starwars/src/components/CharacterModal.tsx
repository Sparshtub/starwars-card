import React, { useEffect, useState } from 'react';
import type { Person } from '../types/starwars';
import type { ImageMode } from '../services/characterImages';
import { useHomeworld } from '../hooks/useHomeworld';
import { formatHeight, formatMass, formatDate, formatPopulation, extractIdFromUrl, getCharacterImageUrl, getPicsumImageUrl } from '../utils/formatters';
import { getSpeciesTheme } from '../utils/speciesColors';
import { X, Globe, Calendar, Film, Ruler, Weight, Sparkles, Compass, Thermometer, Users, ShieldAlert, Zap } from 'lucide-react';

interface CharacterModalProps {
  person: Person | null;
  speciesName?: string;
  imageMode?: ImageMode;
  refreshKey?: number;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  person,
  speciesName = 'Human',
  imageMode = 'official',
  refreshKey = 0,
  onClose,
}) => {
  const { planet, loading: planetLoading, error: planetError } = useHomeworld(person ? person.homeworld : null);

  const [hasError, setHasError] = useState<boolean>(false);
  const [prevKey, setPrevKey] = useState<string>(`${person?.url}-${imageMode}-${refreshKey}`);

  const currentKey = `${person?.url}-${imageMode}-${refreshKey}`;
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setHasError(false);
  }

  const modalId = person ? extractIdFromUrl(person.url) : '1';
  const primaryUrl = person ? getCharacterImageUrl(person, modalId, imageMode, refreshKey) : undefined;
  const fallbackUrl = person ? getPicsumImageUrl(person.name, modalId, refreshKey) : undefined;
  const imageSrc = hasError ? fallbackUrl : primaryUrl;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!person) return null;

  const id = extractIdFromUrl(person.url);
  const theme = getSpeciesTheme(speciesName);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card Shell with Glassmorphism and Neon Border */}
      <div
        className={`relative w-full max-w-4xl bg-slate-900/95 border ${theme.cardBorder} rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden max-h-[92vh] flex flex-col lg:flex-row animate-scale-up border-opacity-60`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white bg-slate-950/80 hover:bg-slate-900 rounded-full border border-slate-800 backdrop-blur-md transition-all z-20 shadow-lg group"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Column: Character Full Portrait Frame */}
        <div className="relative lg:w-5/12 bg-slate-950 flex flex-col justify-end overflow-hidden shrink-0 min-h-[180px] sm:min-h-[300px] lg:min-h-[500px]">
          <img
            src={imageSrc || undefined}
            alt={person.name}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          {/* Vignette Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/60 hidden lg:block" />

          {/* Species Badge Overlay on Portrait */}
          <div className="relative p-3 sm:p-6 z-10 space-y-1 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span
                className={`inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold font-mono tracking-wide backdrop-blur-md border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} shadow-lg`}
              >
                <Zap className="w-3 h-3 mr-1" />
                {speciesName}
              </span>
              <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-medium bg-slate-950/80 text-slate-300 border border-slate-800 backdrop-blur-md">
                {`Birth Year: ${person.birth_year}`}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-mono text-slate-400">
              Subject ID: #{id.padStart(3, '0')} • Gender: {person.gender}
            </p>
          </div>
        </div>

        {/* Right Column: Information & Specs Panel */}
        <div className="lg:w-7/12 p-4 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto font-sans flex flex-col justify-between">
          
          {/* Header Title Section */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
              <Sparkles className="w-3 h-3" />
              <span>GALACTIC DOSSIER</span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-tight">
              {person.name}
            </h2>
          </div>

          {/* Biometric & Archive Specs Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <span>Biometric Specs</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1 hover:border-cyan-500/40 transition-colors">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1 font-semibold">
                  <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Height</span>
                </span>
                <p className="text-base font-bold text-slate-100">{formatHeight(person.height)}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1 hover:border-amber-500/40 transition-colors">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1 font-semibold">
                  <Weight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mass</span>
                </span>
                <p className="text-base font-bold text-slate-100">{formatMass(person.mass)}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1 hover:border-emerald-500/40 transition-colors">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Date Added</span>
                </span>
                <p className="text-sm font-bold text-slate-100">{formatDate(person.created)}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1 hover:border-purple-500/40 transition-colors">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1 font-semibold">
                  <Film className="w-3.5 h-3.5 text-purple-400" />
                  <span>Films Count</span>
                </span>
                <p className="text-sm font-bold text-slate-100">{`${person.films.length} films`}</p>
              </div>
            </div>
          </div>

          {/* Homeworld Intelligence Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Globe className="w-4 h-4" />
              <span>Homeworld Intelligence</span>
            </h3>

            {planetLoading ? (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 animate-pulse space-y-2">
                <div className="h-4 bg-slate-800/80 rounded w-1/3" />
                <div className="h-3 bg-slate-800/60 rounded w-2/3" />
              </div>
            ) : planetError ? (
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{`Could not load homeworld data: ${planetError}`}</span>
              </div>
            ) : planet ? (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <h4 className="text-xl font-bold font-mono text-slate-100">{planet.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">{`Climate: ${planet.climate}`}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-mono font-semibold rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {`POP: ${formatPopulation(planet.population)}`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="flex items-center space-x-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <Compass className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Terrain</span>
                      <span className="capitalize font-semibold line-clamp-1">{planet.terrain}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Thermometer className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Climate</span>
                      <span className="capitalize font-semibold line-clamp-1">{planet.climate}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 text-slate-300">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Users className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Residents</span>
                      <span className="font-semibold">
                        {Array.isArray(planet.residents) ? `${planet.residents.length} character${planet.residents.length === 1 ? '' : 's'}` : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
};
