const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://endearing-prosperity-production.up.railway.app';

export interface SupabaseUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  provider: string;
  created_at: string;
  last_login: string;
}

export interface AuthResponse {
  success: boolean;
  authenticated: boolean;
  user?: SupabaseUser;
  message?: string;
}

export interface ProvidersResponse {
  providers: string[];
  login_urls: {
    google: string;
  };
}

export const supabaseAuthService = {
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/supabase/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get user info:', error);
      return {
        success: false,
        authenticated: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },

  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/supabase/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Logout failed:', error);
      return {
        success: false,
        authenticated: true,
        message: error instanceof Error ? error.message : 'Logout failed'
      };
    }
  },

  loginWithGoogle(): void {
    window.location.href = `${API_BASE}/auth/supabase/login/google`;
  },


  async getProviders(): Promise<ProvidersResponse | null> {
    try {
      const response = await fetch(`${API_BASE}/auth/supabase/providers`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProvidersResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get providers:', error);
      return null;
    }
  },

  async checkHealth(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/auth/supabase/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      return null;
    }
  }
};