import { describe, it, expect, beforeEach } from 'vitest';
import { generateMockJWT, saveAuthSession, clearAuthSession, getStoredAuth } from '../services/auth';

describe('Authentication & JWT Service Unit Tests', () => {
  beforeEach(() => {
    clearAuthSession();
    localStorage.clear();
  });

  it('generates a valid signed mock JWT token with exp payload', () => {
    const user = { username: 'jedi_master', role: 'Jedi Master', avatar: 'avatar-url' };
    const { token, expiresAt } = generateMockJWT(user, 120);

    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3); // Header.Payload.Signature
    expect(expiresAt).toBeGreaterThan(Date.now());
  });

  it('stores and retrieves authenticated session in localStorage', () => {
    const user = { username: 'jedi_master', role: 'Jedi Master', avatar: 'avatar-url' };
    const { token, expiresAt } = generateMockJWT(user, 120);

    saveAuthSession(user, token, expiresAt);
    const session = getStoredAuth();

    expect(session.isAuthenticated).toBe(true);
    expect(session.user?.username).toBe('jedi_master');
    expect(session.token).toBe(token);
  });

  it('clears auth session on logout', () => {
    const user = { username: 'jedi_master', role: 'Jedi Master', avatar: 'avatar-url' };
    const { token, expiresAt } = generateMockJWT(user, 120);

    saveAuthSession(user, token, expiresAt);
    clearAuthSession();
    const session = getStoredAuth();

    expect(session.isAuthenticated).toBe(false);
    expect(session.user).toBeNull();
    expect(session.token).toBeNull();
  });
});
