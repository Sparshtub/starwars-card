import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { Shield, LogIn, LogOut, RefreshCw, Key } from 'lucide-react';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isRefreshing, triggerManualRefresh, refreshCount } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Galactic Brand Header */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-900 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.3)] overflow-hidden p-0.5 group cursor-pointer transition-transform hover:scale-105">
              <img src="/favicon.svg" alt="Star Wars Crest Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="text-base sm:text-2xl font-bold tracking-wider font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 uppercase">
                  STAR WARS
                </h1>
                <span className="hidden xs:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  ARCHIVES
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans hidden sm:block">
                Galactic Character Registry & Homeworld Intelligence
              </p>
            </div>
          </div>

          {/* User Auth Controls & Status Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 pr-3 shadow-inner">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20"
                />
                <div className="hidden md:block text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-semibold text-slate-200">{user.username}</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">
                      JWT ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center space-x-1 font-mono">
                    <Key className="w-3 h-3 text-amber-400" />
                    <span>Refreshes: {refreshCount}</span>
                  </div>
                </div>

                {/* Silent Refresh Manual Trigger */}
                <button
                  onClick={triggerManualRefresh}
                  disabled={isRefreshing}
                  title="Trigger JWT Silent Refresh"
                  className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>JWT Access</span>
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1 opacity-70" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal Component */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};
