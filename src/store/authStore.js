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
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Username atau password salah';
          set({ error: errorMessage, isLoading: false });
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
