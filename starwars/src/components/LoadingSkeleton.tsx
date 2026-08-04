import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden animate-pulse space-y-4 p-4 shadow-lg"
        >
          <div className="aspect-[4/5] w-full bg-slate-800/60 rounded-xl" />
          <div className="space-y-2">
            <div className="h-5 bg-slate-800/80 rounded w-3/4" />
            <div className="h-3 bg-slate-800/50 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
