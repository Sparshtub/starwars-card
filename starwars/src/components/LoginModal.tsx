import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, Key, Lock, UserCheck, RefreshCw, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated, user, token, expiresAt, logout, refreshCount, lastRefreshedAt, isRefreshing, triggerManualRefresh } = useAuth();

  const [username, setUsername] = useState('jedi_master');
  const [password, setPassword] = useState('force2026');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Calculate live countdown timer for token expiration
  useEffect(() => {
    if (!expiresAt || !isAuthenticated) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, isAuthenticated]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Invalid galactic credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              {isAuthenticated ? 'Galactic Access Token (JWT)' : 'Galactic Authentication'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {isAuthenticated && user ? (
            <div className="space-y-5">
              {/* Authenticated Banner */}
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30" />
                <div>
                  <h4 className="text-base font-semibold text-emerald-300 flex items-center space-x-2">
                    <span>{user.username}</span>
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-emerald-400/80 font-mono">{user.role} • Security Level 5</p>
                </div>
              </div>

              {/* Live JWT Specs & Silent Refresh Monitor */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>JWT Status:</span>
                  </span>
                  <span className="text-emerald-400 font-semibold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    VALID & ACTIVE
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Token Expires In:</span>
                  <span className="text-amber-400 font-bold">{timeLeft}s</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Silent Refreshes Triggered:</span>
                  <span className="text-cyan-400 font-semibold">{refreshCount} times</span>
                </div>

                {lastRefreshedAt && (
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                    <span>Last Refreshed At:</span>
                    <span>{lastRefreshedAt}</span>
                  </div>
                )}

                {/* Encoded JWT Token Preview */}
                <div className="mt-3">
                  <span className="text-slate-400 block mb-1 text-[11px]">Bearer Token Signature:</span>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] break-all font-mono text-slate-400 max-h-20 overflow-y-auto select-all">
                    {token}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={triggerManualRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Silent Refresh Token</span>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">JWT Auth Demo Credentials</span>
                  Mock token authentication with silent refresh timer 30s prior to expiry. Click Sign In with prefilled demo credentials.
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
                  />
                  <UserCheck className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all font-mono"
              >
                GENERATE JWT TOKEN & SIGN IN
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
