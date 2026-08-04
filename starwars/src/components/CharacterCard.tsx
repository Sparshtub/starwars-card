import React, { useState } from 'react';
import type { Person } from '../types/starwars';
import { extractIdFromUrl, getCharacterImageUrl, getAkababFallbackUrl, getPicsumImageUrl, formatHeight, formatMass } from '../utils/formatters';
import { getSpeciesTheme } from '../utils/speciesColors';
import { ExternalLink, Film, Ruler, Weight, RefreshCw } from 'lucide-react';

interface CharacterCardProps {
  person: Person;
  speciesName?: string;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ person, speciesName = 'Human', onClick }) => {
  const id = extractIdFromUrl(person.url);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [fallbackStage, setFallbackStage] = useState<number>(0); // 0: Primary, 1: Akabab, 2: Picsum
  const [imageSrc, setImageSrc] = useState<string>(() => getCharacterImageUrl(person.name, id));

  const theme = getSpeciesTheme(speciesName);

  const handleImageError = () => {
    if (fallbackStage === 0) {
      setFallbackStage(1);
      setImageSrc(getAkababFallbackUrl(person.name));
    } else if (fallbackStage === 1) {
      setFallbackStage(2);
      setImageSrc(getPicsumImageUrl(person.name, id, refreshKey));
    }
  };

  const handleRefreshPicture = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextKey = refreshKey + 1;
    setRefreshKey(nextKey);
    setFallbackStage(2);
    setImageSrc(getPicsumImageUrl(person.name, id, nextKey));
  };

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative rounded-2xl bg-slate-900/90 border ${theme.cardBorder} ${theme.cardGlow} overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400`}
    >
      {/* Background Gradient Header Glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientHeader} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {/* Card Image Section - Standardized 4:5 Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
        <img
          src={imageSrc}
          alt={person.name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Species Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold font-mono tracking-wide backdrop-blur-md border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} shadow-md`}
          >
            {speciesName}
          </span>
        </div>

        {/* Top Right Actions: Film Count & Refresh Picture */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <button
            onClick={handleRefreshPicture}
            title="Refresh character portrait"
            className="p-1 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 backdrop-blur-md shadow-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 shadow-md">
            <Film className="w-3 h-3 text-amber-400" />
            <span>{person.films.length}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="relative p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold font-mono text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {person.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-slate-400 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5">
            <Ruler className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatHeight(person.height)}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Weight className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatMass(person.mass)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
