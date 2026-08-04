import type { AuthState, User } from '../types/starwars';

const TOKEN_KEY = 'sw_jwt_token';
const EXPIRES_KEY = 'sw_jwt_expires';
const USER_KEY = 'sw_jwt_user';

// Mock secret key
const JWT_SECRET = 'force_jwt_secret_2026';

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Creates a mock signed JWT token
 */
export function generateMockJWT(user: User, expiresInSeconds: number = 120): { token: string; expiresAt: number } {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Date.now();
  const expiresAt = now + expiresInSeconds * 1000;
  
  const payload = {
    sub: user.username,
    role: user.role,
    iat: Math.floor(now / 1000),
    exp: Math.floor(expiresAt / 1000),
    iss: 'starwars-galactic-auth',
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode(`${encodedHeader}.${encodedPayload}.${JWT_SECRET}`);

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;
  return { token, expiresAt };
}

export function saveAuthSession(user: User, token: string, expiresAt: number) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
}

export function clearAuthSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getStoredAuth(): AuthState {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAtStr = localStorage.getItem(EXPIRES_KEY);

    if (userStr && token && expiresAtStr) {
      const expiresAt = parseInt(expiresAtStr, 10);
      if (Date.now() < expiresAt) {
        return {
          isAuthenticated: true,
          user: JSON.parse(userStr),
          token,
          expiresAt,
        };
      }
    }
  } catch (e) {
    console.error('Failed to parse stored auth session', e);
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    expiresAt: null,
  };
}
