import { useState } from 'react';
import { usePeople } from './hooks/usePeople';
import type { Person } from './types/starwars';
import { extractIdFromUrl } from './utils/formatters';
import { Header } from './components/Header';
import { SearchAndFilter } from './components/SearchAndFilter';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { Pagination } from './components/Pagination';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorMessage } from './components/ErrorMessage';
import { Sparkles, Users, Database } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHomeworld, setSelectedHomeworld] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedFilm, setSelectedFilm] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const {
    people,
    totalCount,
    totalPages,
    loading,
    error,
    refetch,
    speciesMap,
    allPlanets,
    allFilms,
  } = usePeople({
    page: currentPage,
    searchQuery,
    selectedHomeworld,
    selectedSpecies,
    selectedFilm,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedHomeworld('');
    setSelectedSpecies('');
    setSelectedFilm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Background Starfield Pattern & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Top Header */}
      <Header />

      {/* Main Page Layout Container */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Banner Hero Section */}
        <div className="mb-8 space-y-2 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GALACTIC DIRECTORY • SWAPI REAL-TIME INTEGRATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-slate-100">
            Galactic Personnel Archives
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Explore Star Wars characters with species-based visual signatures, biometric metrics, and real-time homeworld intelligence.
          </p>
        </div>

        {/* Search & Filter Component */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedHomeworld={selectedHomeworld}
          onHomeworldChange={setSelectedHomeworld}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
          selectedFilm={selectedFilm}
          onFilmChange={setSelectedFilm}
          allPlanets={allPlanets}
          allFilms={allFilms}
          onClearFilters={handleClearFilters}
        />

        {/* Content Section: Loader, Error, or Character Grid */}
        {loading ? (
          <LoadingSkeleton count={10} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : people.length === 0 ? (
          <div className="my-16 p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 max-w-md mx-auto">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold font-mono text-slate-300">No Galactic Records Found</h3>
            <p className="text-xs text-slate-500">
              No subjects matched your active filter rules. Try broadening your query or resetting filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 transition-all font-mono"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4 px-1 text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Showing {people.length} character records</span>
              </span>
              <span>Click any card for homeworld specs</span>
            </div>

            {/* Character Cards Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {people.map((person) => {
                const id = extractIdFromUrl(person.url);
                const speciesName = speciesMap[id] || 'Human';

                return (
                  <CharacterCard
                    key={person.url}
                    person={person}
                    speciesName={speciesName}
                    onClick={() => setSelectedPerson(person)}
                  />
                );
              })}
            </div>

            {/* Pagination Control Bar */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={loading}
            />
          </div>
        )}
      </main>

      {/* Detail Modal Component */}
      <CharacterModal
        person={selectedPerson}
        speciesName={selectedPerson ? speciesMap[extractIdFromUrl(selectedPerson.url)] || 'Human' : 'Human'}
        onClose={() => setSelectedPerson(null)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Galactic Archives • Built with React, TypeScript & SWAPI API</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">SWAPI API v1</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">Picsum Seeded Portraits</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
