import React, { useEffect, useState } from 'react';
import type { Person } from '../types/starwars';
import type { ImageMode } from '../services/characterImages';
import { useHomeworld } from '../hooks/useHomeworld';
import { formatHeight, formatMass, formatDate, formatPopulation, extractIdFromUrl, getCharacterImageUrl, getPicsumImageUrl } from '../utils/formatters';
import { getSpeciesTheme } from '../utils/speciesColors';
import { X, Globe, Calendar, Film, Ruler, Weight, Sparkles, Compass, Thermometer, Users, ShieldAlert } from 'lucide-react';

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
  imageMode = 'picsum',
  refreshKey = 0,
  onClose,
}) => {
  const { planet, loading: planetLoading, error: planetError } = useHomeworld(person ? person.homeworld : null);

  const [imageSrc, setImageSrc] = useState<string | undefined>(() => 
    person ? getCharacterImageUrl(person.name, extractIdFromUrl(person.url), imageMode, refreshKey) : undefined
  );

  useEffect(() => {
    if (person) {
      const id = extractIdFromUrl(person.url);
      setImageSrc(getCharacterImageUrl(person.name, id, imageMode, refreshKey));
    } else {
      setImageSrc(undefined);
    }
  }, [person, imageMode, refreshKey]);

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
    const fallbackUrl = getPicsumImageUrl(person.name, id, refreshKey);
    if (imageSrc !== fallbackUrl) {
      setImageSrc(fallbackUrl);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner with Image Overlay */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={imageSrc || undefined}
            alt={person.name}
            onError={handleImageError}
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent`} />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white bg-slate-950/70 hover:bg-slate-900 rounded-xl border border-slate-800 backdrop-blur-md transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2.5 py-0.5 text-xs font-semibold font-mono rounded-lg border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                {speciesName}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold font-mono rounded-lg bg-slate-950/70 text-slate-300 border border-slate-800">
                {`Birth Year: ${person.birth_year}`}
              </span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-wide">
              {person.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Details */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans">
          
          {/* Person Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Biometric & Archive Specs</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1">
                  <Ruler className="w-3 h-3 text-cyan-400" />
                  <span>Height</span>
                </span>
                <p className="text-sm font-semibold text-slate-100">{formatHeight(person.height)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1">
                  <Weight className="w-3 h-3 text-amber-400" />
                  <span>Mass</span>
                </span>
                <p className="text-sm font-semibold text-slate-100">{formatMass(person.mass)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Date Added</span>
                </span>
                <p className="text-sm font-semibold text-slate-100">{formatDate(person.created)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase flex items-center space-x-1">
                  <Film className="w-3 h-3 text-purple-400" />
                  <span>Films Count</span>
                </span>
                <p className="text-sm font-semibold text-slate-100">{`${person.films.length} films`}</p>
              </div>
            </div>
          </div>

          {/* Homeworld Intelligence Section */}
          <div className="border-t border-slate-800/80 pt-5">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center space-x-1.5">
              <Globe className="w-4 h-4" />
              <span>Homeworld Intelligence Data</span>
            </h3>

            {planetLoading ? (
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 animate-pulse space-y-2">
                <div className="h-4 bg-slate-800/80 rounded w-1/3" />
                <div className="h-3 bg-slate-800/60 rounded w-2/3" />
              </div>
            ) : planetError ? (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{`Could not load homeworld data: ${planetError}`}</span>
              </div>
            ) : planet ? (
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-lg font-bold font-mono text-slate-100">{planet.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">{`Climate: ${planet.climate}`}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-mono rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {`POP: ${formatPopulation(planet.population)}`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Terrain</span>
                      <span className="capitalize line-clamp-1">{planet.terrain}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <Thermometer className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Climate</span>
                      <span className="capitalize line-clamp-1">{planet.climate}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Residents</span>
                      <span>{formatPopulation(planet.population)}</span>
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
