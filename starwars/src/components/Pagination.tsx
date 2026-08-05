import React from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-800/80 font-mono text-xs">
      
      {/* Total Count Status Indicator */}
      <div className="flex items-center space-x-2 text-slate-400">
        <Layers className="w-4 h-4 text-amber-400" />
        <span>
          Showing page <strong className="text-slate-100">{currentPage}</strong> of{' '}
          <strong className="text-slate-100">{totalPages}</strong> ({totalCount} total subjects)
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {pages.map((p) => {
          // Render page numbers (show first, last, current, adjacent)
          const isCurrent = p === currentPage;
          if (
            p === 1 ||
            p === totalPages ||
            (p >= currentPage - 1 && p <= currentPage + 1)
          ) {
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                disabled={disabled}
                className={`w-9 h-9 rounded-xl font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {p}
              </button>
            );
          } else if (p === currentPage - 2 || p === currentPage + 2) {
            return (
              <span key={p} className="px-1 text-slate-600">
                ..
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
