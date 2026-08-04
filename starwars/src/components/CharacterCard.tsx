import React from 'react';
import type { Person } from '../types/starwars';
import { extractIdFromUrl, getCharacterImageUrl, formatHeight, formatMass } from '../utils/formatters';
import { getSpeciesTheme } from '../utils/speciesColors';
import { ExternalLink, Film, Ruler, Weight } from 'lucide-react';

interface CharacterCardProps {
  person: Person;
  speciesName?: string;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ person, speciesName = 'Human', onClick }) => {
  const id = extractIdFromUrl(person.url);
  const imageUrl = getCharacterImageUrl(person.name, id);
  const theme = getSpeciesTheme(speciesName);

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

      {/* Card Image Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
        <img
          src={imageUrl}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Species Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold font-mono tracking-wide backdrop-blur-md border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} shadow-md`}
          >
            {speciesName}
          </span>
        </div>

        {/* Film Count Pill */}
        <div className="absolute top-3 right-3">
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
