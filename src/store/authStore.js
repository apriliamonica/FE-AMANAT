import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          // TODO: Replace with actual API call
          // const response = await authService.login(credentials);

          // Simulasi login
          const mockUser = {
            id: 1,
            name: 'Rudi Santoso',
            email: credentials.username,
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
            bagian: credentials.username.includes('kabag') ? 'PSDM' : null,
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });

          // Save to localStorage
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));

          return { success: true, user: mockUser };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
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
