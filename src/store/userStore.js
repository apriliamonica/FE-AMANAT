import { create } from 'zustand';
import toast from 'react-hot-toast';

const useUserStore = create((set, get) => ({
  // State
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  // Fetch Users
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Mock data
      const mockUsers = [
        {
          id: 1,
          nama: 'Rudi Santoso',
          email: 'rudi@amanat.com',
          username: 'admin',
          role: 'sekretaris_kantor',
          role_label: 'Sekretaris Kantor',
          bagian: '-',
          status: 'aktif',
        },
        {
          id: 2,
          nama: 'Dr. Ahmad Fauzi',
          email: 'ahmad.fauzi@amanat.com',
          username: 'ketua',
          role: 'ketua_pengurus',
          role_label: 'Ketua Pengurus',
          bagian: '-',
          status: 'aktif',
        },
        {
          id: 3,
          nama: 'Siti Nurhaliza',
          email: 'siti@amanat.com',
          username: 'sekretaris',
          role: 'sekretaris_pengurus',
          role_label: 'Sekretaris Pengurus',
          bagian: '-',
          status: 'aktif',
        },
        {
          id: 4,
          nama: 'Budi Prasetyo',
          email: 'budi@amanat.com',
          username: 'bendahara',
          role: 'bendahara_pengurus',
          role_label: 'Bendahara Pengurus',
          bagian: '-',
          status: 'aktif',
        },
        {
          id: 5,
          nama: 'Andi Wijaya',
          email: 'andi@amanat.com',
          username: 'kabag_psdm',
          role: 'kepala_bagian',
          role_label: 'Kepala Bagian',
          bagian: 'PSDM',
          status: 'aktif',
        },
        {
          id: 6,
          nama: 'Dewi Kartika',
          email: 'dewi@amanat.com',
          username: 'kabag_keuangan',
          role: 'kepala_bagian',
          role_label: 'Kepala Bagian',
          bagian: 'Keuangan',
          status: 'aktif',
        },
        {
          id: 7,
          nama: 'Hadi Saputra',
          email: 'hadi@amanat.com',
          username: 'kabag_umum',
          role: 'kepala_bagian',
          role_label: 'Kepala Bagian',
          bagian: 'Umum',
          status: 'nonaktif',
        },
      ];

      set({ users: mockUsers, isLoading: false });
      return mockUsers;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat data pengguna');
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