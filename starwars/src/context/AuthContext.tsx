import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User } from '../types/starwars';
import { generateMockJWT, saveAuthSession, clearAuthSession, getStoredAuth } from '../services/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshCount: number;
  lastRefreshedAt: string | null;
  isRefreshing: boolean;
  triggerManualRefresh: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => getStoredAuth());
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const performSilentRefresh = useCallback(() => {
    if (!authState.isAuthenticated || !authState.user) return;

    setIsRefreshing(true);
    // Simulate brief silent network refresh delay
    setTimeout(() => {
      const { token, expiresAt } = generateMockJWT(authState.user!, 120);
      saveAuthSession(authState.user!, token, expiresAt);
      setAuthState({
        isAuthenticated: true,
        user: authState.user,
        token,
        expiresAt,
      });
      setRefreshCount((prev) => prev + 1);
      setLastRefreshedAt(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 500);
  }, [authState.isAuthenticated, authState.user]);

  // Schedule silent refresh 30s before expiration
  useEffect(() => {
    if (!authState.isAuthenticated || !authState.expiresAt) return;

    const now = Date.now();
    const timeUntilExpiry = authState.expiresAt - now;
    // Schedule refresh 30 seconds before expiry (or immediately if < 30s left)
    const refreshDelay = Math.max(1000, timeUntilExpiry - 30000);

    const timer = setTimeout(() => {
      performSilentRefresh();
    }, refreshDelay);

    return () => clearTimeout(timer);
  }, [authState.isAuthenticated, authState.expiresAt, performSilentRefresh]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Validate mock credentials
    if (!username.trim() || !password.trim()) {
      return false;
    }

    const user: User = {
      username: username.trim(),
      role: 'Jedi Knight',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username.trim()}`,
    };

    const { token, expiresAt } = generateMockJWT(user, 120);
    saveAuthSession(user, token, expiresAt);

    setAuthState({
      isAuthenticated: true,
      user,
      token,
      expiresAt,
    });
    setLastRefreshedAt(new Date().toLocaleTimeString());
    return true;
  };

  const logout = () => {
    clearAuthSession();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      expiresAt: null,
    });
    setRefreshCount(0);
    setLastRefreshedAt(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        refreshCount,
        lastRefreshedAt,
        isRefreshing,
        triggerManualRefresh: performSilentRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
