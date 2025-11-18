import { create } from 'zustand';
import toast from 'react-hot-toast';

const useDisposisiStore = create((set, get) => ({
  // State
  disposisiList: [],
  trackingHistory: [],
  isLoading: false,
  error: null,

  // Fetch Disposisi
  fetchDisposisi: async () => {
    set({ isLoading: true });
    try {
      // Mock data
      const mockData = [
        {
          id: 1,
          nomorSurat: '001/SM/V/2025',
          dari: 'Admin',
          kepada: 'Ketua Yayasan',
          perihal: 'Undangan Rapat Koordinasi Pendidikan',
          instruksi: 'Mohon ditinjau dan diberikan disposisi',
          tenggatWaktu: '2025-10-16',
          status: 'selesai',
          tanggalDisposisi: '2025-10-10',
          catatan: null,
        },
        {
          id: 2,
          nomorSurat: '002/SM/V/2025',
          dari: 'Admin',
          kepada: 'Bendahara',
          perihal: 'Permohonan Pencairan Dana Bantuan',
          instruksi: 'Mohon diverifikasi data keuangan',
          tenggatWaktu: '2025-10-20',
          status: 'menunggu',
          tanggalDisposisi: '2025-10-09',
          catatan: null,
        },
      ];

      set({ disposisiList: mockData, isLoading: false });
      return mockData;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat disposisi');
    }
  },

  // Create Disposisi
  createDisposisi: async (data) => {
    set({ isLoading: true });
    try {
      const newDisposisi = {
        id: Date.now(),
        ...data,
        status: 'menunggu',
        tanggalDisposisi: new Date().toISOString().split('T')[0],
      };

      set((state) => ({
        disposisiList: [newDisposisi, ...state.disposisiList],
        isLoading: false,
      }));

      toast.success('Disposisi berhasil dibuat');
      return { success: true, data: newDisposisi };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal membuat disposisi');
      return { success: false };
    }
  },

  // Update Status Disposisi
  updateDisposisiStatus: async (id, status, catatan = null) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        disposisiList: state.disposisiList.map((disposisi) =>
          disposisi.id === id
            ? {
                ...disposisi,
                status,
                catatan,
                tanggalSelesai: new Date().toISOString().split('T')[0],
              }
            : disposisi
        ),
        isLoading: false,
      }));

      toast.success('Status disposisi berhasil diupdate');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal mengupdate status disposisi');
      return { success: false };
    }
  },

  // Fetch Tracking History
  fetchTrackingHistory: async (nomorSurat) => {
    set({ isLoading: true });
    try {
      // Mock tracking history
      const mockHistory = [
        {
          id: 1,
          tanggal: '2025-10-10 08:30',
          status: 'Diterima',
          oleh: 'Sekretaris Kantor',
          keterangan: 'Surat masuk diterima dan dicatat',
        },
        {
          id: 2,
          tanggal: '2025-10-10 09:15',
          status: 'Disposisi',
          oleh: 'Sekretaris Kantor',
          keterangan: 'Disposisi ke Ketua Pengurus Yayasan',
        },
        {
          id: 3,
          tanggal: '2025-10-10 14:30',
          status: 'Review',
          oleh: 'Ketua Pengurus Yayasan',
          keterangan: 'Sedang ditinjau oleh Ketua Pengurus',
        },
        {
          id: 4,
          tanggal: '2025-10-11 10:00',
          status: 'Disposisi Lanjutan',
          oleh: 'Ketua Pengurus Yayasan',
          keterangan: 'Disposisi ke Sekretaris Pengurus untuk tindak lanjut',
        },
      ];

      set({ trackingHistory: mockHistory, isLoading: false });
      return mockHistory;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat tracking history');
    }
  },

  // Add Tracking Entry
  addTrackingEntry: async (nomorSurat, entry) => {
    try {
      const newEntry = {
        id: Date.now(),
        tanggal: new Date().toISOString(),
        ...entry,
      };

      set((state) => ({
        trackingHistory: [...state.trackingHistory, newEntry],
      }));

      return { success: true };
    } catch (error) {
      toast.error('Gagal menambah tracking entry');
      return { success: false };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useDisposisiStore;

// Lokasi: src/store/disposisiStore.js
