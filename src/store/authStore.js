import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => set({ token }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // Try API call first
          try {
            const response = await authService.login(credentials);
            const { user: userData, token: authToken } = response.data || response;

            set({
              user: userData,
              token: authToken,
              isAuthenticated: true,
              isLoading: false,
            });

            // Save to localStorage
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));

            toast.success('Login berhasil');
            return { success: true, user: userData };
          } catch (apiError) {
            // Fallback to mock data if API is not available (for development)
            if (apiError.response?.status >= 400) {
              throw apiError; // Re-throw real API errors
            }

            // Mock data for development when API is not available
            console.warn('API not available, using mock data');
            const mockUser = {
              id: 1,
              name: 'Rudi Santoso',
              email: credentials.username + '@amanat.com',
              username: credentials.username,
              role:
                credentials.username === 'admin'
                  ? 'sekretaris_kantor'
                  : credentials.username === 'ketua'
                    ? 'ketua_pengurus'
                    : credentials.username === 'sekretaris'
                      ? 'sekretaris_pengurus'
                      : credentials.username === 'bendahara'
                        ? 'bendahara_pengurus'
                        : 'kepala_bagian',
              role_label:
                credentials.username === 'admin'
                  ? 'Sekretaris Kantor'
                  : credentials.username === 'ketua'
                    ? 'Ketua Pengurus Yayasan'
                    : credentials.username === 'sekretaris'
                      ? 'Sekretaris Pengurus'
                      : credentials.username === 'bendahara'
                        ? 'Bendahara Pengurus'
                        : 'Kepala Bagian PSDM',
              bagian: credentials.username.includes('kabag')
                ? credentials.username.includes('keuangan')
                  ? 'keuangan'
                  : credentials.username.includes('umum')
                    ? 'umum'
                    : 'psdm'
                : null,
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            set({
              user: mockUser,
              token: mockToken,
              isAuthenticated: true,
              isLoading: false,
            });

            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            toast.success('Login berhasil (mock mode)');
            return { success: true, user: mockUser };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || 'Login gagal';
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        try {
          // Try to call logout API
          await authService.logout();
        } catch (error) {
          // Ignore API errors on logout
          console.warn('Logout API error (ignored):', error);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        toast.success('Logout berhasil');
      },

      checkAuth: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
            });
            return true;
          } catch (error) {
            get().logout();
            return false;
          }
        }
        return false;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

// Lokasi: src/store/authStore.js
