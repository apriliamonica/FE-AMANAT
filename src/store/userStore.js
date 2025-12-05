import { create } from 'zustand';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';

const useUserStore = create((set, get) => ({
  // State
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  // Fetch Users
  fetchUsers: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getUsers({
        page,
        limit,
        ...filters,
      });

      const { items, total } = response.data;

      set({
        users: items || [],
        userTotal: total || 0,
        userPage: page,
        userLimit: limit,
        isLoading: false,
      });
      return { success: true, data: items };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat data pengguna');
      return { success: false };
    }
  },

  // Create User
  createUser: async (userData) => {
    set({ isLoading: true });
    try {
      const newUser = {
        id: Date.now(),
        ...userData,
        role_label: getRoleLabel(userData.role),
      };

      set((state) => ({
        users: [newUser, ...state.users],
        isLoading: false,
      }));

      toast.success('Pengguna berhasil ditambahkan');
      return { success: true, data: newUser };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal menambahkan pengguna');
      return { success: false };
    }
  },

  // Update User
  updateUser: async (id, userData) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, ...userData, role_label: getRoleLabel(userData.role || user.role) }
            : user
        ),
        isLoading: false,
      }));

      toast.success('Data pengguna berhasil diupdate');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal mengupdate data pengguna');
      return { success: false };
    }
  },

  // Delete User
  deleteUser: async (id) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }));

      toast.success('Pengguna berhasil dihapus');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal menghapus pengguna');
      return { success: false };
    }
  },

  // Toggle User Status
  toggleUserStatus: async (id) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, status: user.status === 'aktif' ? 'nonaktif' : 'aktif' }
            : user
        ),
        isLoading: false,
      }));

      toast.success('Status pengguna berhasil diubah');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal mengubah status pengguna');
      return { success: false };
    }
  },

  // Set Selected User
  setSelectedUser: (user) => set({ selectedUser: user }),

  clearError: () => set({ error: null }),
}));

// Helper function
function getRoleLabel(role) {
  const roleLabels = {
    sekretaris_kantor: 'Sekretaris Kantor',
    ketua_pengurus: 'Ketua Pengurus',
    sekretaris_pengurus: 'Sekretaris Pengurus',
    bendahara_pengurus: 'Bendahara Pengurus',
    kepala_bagian: 'Kepala Bagian',
  };
  return roleLabels[role] || role;
}

export default useUserStore;

// Lokasi: src/store/userStore.js
