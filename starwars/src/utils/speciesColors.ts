export interface SpeciesTheme {
  name: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  cardGlow: string;
  gradientHeader: string;
  accentColor: string;
}

export const SPECIES_THEMES: Record<string, SpeciesTheme> = {
  human: {
    name: 'Human',
    badgeBg: 'bg-cyan-950/95',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-500/60',
    cardBorder: 'border-cyan-500/40 hover:border-cyan-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
    gradientHeader: 'from-cyan-900/40 via-cyan-950/20 to-transparent',
    accentColor: '#06b6d4',
  },
  droid: {
    name: 'Droid',
    badgeBg: 'bg-amber-950/95',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/60',
    cardBorder: 'border-amber-500/40 hover:border-amber-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    gradientHeader: 'from-amber-900/40 via-amber-950/20 to-transparent',
    accentColor: '#f59e0b',
  },
  wookiee: {
    name: 'Wookiee',
    badgeBg: 'bg-emerald-950/95',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/60',
    cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]',
    gradientHeader: 'from-emerald-900/40 via-emerald-950/20 to-transparent',
    accentColor: '#10b981',
  },
  rodian: {
    name: 'Rodian',
    badgeBg: 'bg-lime-950/95',
    badgeText: 'text-lime-300',
    badgeBorder: 'border-lime-500/60',
    cardBorder: 'border-lime-500/40 hover:border-lime-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(132,204,22,0.35)]',
    gradientHeader: 'from-lime-900/40 via-lime-950/20 to-transparent',
    accentColor: '#84cc16',
  },
  hutt: {
    name: 'Hutt',
    badgeBg: 'bg-orange-950/95',
    badgeText: 'text-orange-300',
    badgeBorder: 'border-orange-500/60',
    cardBorder: 'border-orange-500/40 hover:border-orange-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]',
    gradientHeader: 'from-orange-900/40 via-orange-950/20 to-transparent',
    accentColor: '#f97316',
  },
  'yoda\'s species': {
    name: 'Ancient',
    badgeBg: 'bg-teal-950/95',
    badgeText: 'text-teal-200',
    badgeBorder: 'border-teal-400/60',
    cardBorder: 'border-teal-500/40 hover:border-teal-300',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(20,184,166,0.35)]',
    gradientHeader: 'from-teal-900/40 via-teal-950/20 to-transparent',
    accentColor: '#14b8a6',
  },
  trandoshan: {
    name: 'Trandoshan',
    badgeBg: 'bg-yellow-950/95',
    badgeText: 'text-yellow-300',
    badgeBorder: 'border-yellow-500/60',
    cardBorder: 'border-yellow-500/40 hover:border-yellow-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]',
    gradientHeader: 'from-yellow-900/40 via-yellow-950/20 to-transparent',
    accentColor: '#eab308',
  },
  'mon calamari': {
    name: 'Mon Calamari',
    badgeBg: 'bg-blue-950/95',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/60',
    cardBorder: 'border-blue-500/40 hover:border-blue-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]',
    gradientHeader: 'from-blue-900/40 via-blue-950/20 to-transparent',
    accentColor: '#3b82f6',
  },
  ewok: {
    name: 'Ewok',
    badgeBg: 'bg-amber-950/95',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-600/60',
    cardBorder: 'border-amber-700/40 hover:border-amber-300',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(180,83,9,0.35)]',
    gradientHeader: 'from-amber-950/50 via-amber-950/20 to-transparent',
    accentColor: '#b45309',
  },
  zabrak: {
    name: 'Zabrak',
    badgeBg: 'bg-rose-950/95',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/60',
    cardBorder: 'border-rose-500/40 hover:border-rose-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]',
    gradientHeader: 'from-rose-900/40 via-rose-950/20 to-transparent',
    accentColor: '#f43f5e',
  },
  unknown: {
    name: 'Human / Unspecified',
    badgeBg: 'bg-purple-950/95',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500/60',
    cardBorder: 'border-purple-500/40 hover:border-purple-400',
    cardGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
    gradientHeader: 'from-purple-900/40 via-purple-950/20 to-transparent',
    accentColor: '#a855f7',
  },
};

export function getSpeciesTheme(speciesName: string): SpeciesTheme {
  if (!speciesName) return SPECIES_THEMES.unknown;
  const key = speciesName.trim().toLowerCase();
  return SPECIES_THEMES[key] || SPECIES_THEMES.unknown;
}
