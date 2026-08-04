import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="my-10 p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 text-center space-y-4 max-w-xl mx-auto shadow-[0_0_40px_rgba(244,63,94,0.15)] animate-fade-in">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold font-mono text-rose-200 uppercase tracking-wider">
          Galactic Signal Disrupted
        </h3>
        <p className="text-xs text-rose-300/80 font-sans max-w-md mx-auto">
          {message}
        </p>
      </div>

      <button
        onClick={onRetry}
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Re-establish Connection</span>
      </button>
    </div>
  );
};
