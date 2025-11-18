import { apiClient } from '../client';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from '../types';

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

    // Store tokens
    apiClient.setAccessToken(response.accessToken);
    apiClient.setRefreshToken(response.refreshToken);

    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
      refreshToken,
    });

    apiClient.setAccessToken(response.accessToken);

    return response;
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.patch('/auth/password/change', {
      currentPassword,
      newPassword,
    });
  }

  async setupMFA(): Promise<{ secret: string; qrCode: string }> {
    return apiClient.post('/auth/mfa/setup');
  }

  async verifyMFA(token: string): Promise<{ verified: boolean }> {
    return apiClient.post('/auth/mfa/verify', { token });
  }

  async disableMFA(token: string): Promise<void> {
    await apiClient.post('/auth/mfa/disable', { token });
  }

  isAuthenticated(): boolean {
    return !!apiClient.getAccessToken();
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userJson = localStorage.getItem('shepherd_user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }

  setStoredUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('shepherd_user', JSON.stringify(user));
  }

  clearStoredUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('shepherd_user');
  }

  clearTokens(): void {
    apiClient.clearTokens();
    this.clearStoredUser();
  }
}

export const authService = new AuthService();
