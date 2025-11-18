import { create } from 'zustand';
import toast from 'react-hot-toast';
import { suratService } from '../services/suratService';

const useSuratStore = create((set, get) => ({
  // State
  suratMasuk: [],
  suratKeluar: [],
  selectedSurat: null,
  isLoading: false,
  error: null,

  // Surat Masuk Actions
  fetchSuratMasuk: async () => {
    set({ isLoading: true });
    try {
      try {
        const response = await suratService.getSuratMasuk();
        const data = response.data || response;
        set({ suratMasuk: Array.isArray(data) ? data : data.items || [], isLoading: false });
        return Array.isArray(data) ? data : data.items || [];
      } catch (apiError) {
        // Fallback to mock data if API is not available
        if (apiError.response?.status >= 400 && apiError.response?.status < 500) {
          throw apiError; // Re-throw real API errors
        }

        console.warn('API not available, using mock data');
        const mockData = [
          {
            id: 1,
            nomorSurat: '001/SM/V/2025',
            asalSurat: 'Dinas Pendidikan',
            tanggal: '2025-10-10',
            tanggalTerima: '2025-10-10',
            perihal: 'Undangan Rapat Koordinasi Pendidikan',
            prioritas: 'urgent',
            status: 'baru',
            kategori: 'undangan',
            file: null,
          },
          {
            id: 2,
            nomorSurat: '002/SM/V/2025',
            asalSurat: 'Kementerian Keuangan',
            tanggal: '2025-10-09',
            tanggalTerima: '2025-10-09',
            perihal: 'Permohonan Data Keuangan',
            prioritas: 'tinggi',
            status: 'diproses',
            kategori: 'permohonan',
            file: null,
          },
        ];

        set({ suratMasuk: mockData, isLoading: false });
        return mockData;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal memuat surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  createSuratMasuk: async (data) => {
    set({ isLoading: true });
    try {
      try {
        const response = await suratService.createSuratMasuk(data);
        const newSurat = response.data || response;
        set((state) => ({
          suratMasuk: [newSurat, ...state.suratMasuk],
          isLoading: false,
        }));
        toast.success('Surat masuk berhasil ditambahkan');
        return { success: true, data: newSurat };
      } catch (apiError) {
        if (apiError.response?.status >= 400 && apiError.response?.status < 500) {
          throw apiError;
        }

        // Fallback to mock
        const newSurat = {
          id: Date.now(),
          ...data,
          status: 'baru',
          tanggal: data.tanggalTerima || data.tanggal,
        };

        set((state) => ({
          suratMasuk: [newSurat, ...state.suratMasuk],
          isLoading: false,
        }));

        toast.success('Surat masuk berhasil ditambahkan (mock mode)');
        return { success: true, data: newSurat };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal menambahkan surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  updateSuratMasuk: async (id, data) => {
    set({ isLoading: true });
    try {
      try {
        const response = await suratService.updateSuratMasuk(id, data);
        const updatedSurat = response.data || response;
        set((state) => ({
          suratMasuk: state.suratMasuk.map((surat) =>
            surat.id === id ? updatedSurat : surat
          ),
          isLoading: false,
        }));
        toast.success('Surat masuk berhasil diupdate');
        return { success: true, data: updatedSurat };
      } catch (apiError) {
        if (apiError.response?.status >= 400 && apiError.response?.status < 500) {
          throw apiError;
        }

        // Fallback to mock
        set((state) => ({
          suratMasuk: state.suratMasuk.map((surat) =>
            surat.id === id ? { ...surat, ...data } : surat
          ),
          isLoading: false,
        }));
        toast.success('Surat masuk berhasil diupdate (mock mode)');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal mengupdate surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  deleteSuratMasuk: async (id) => {
    set({ isLoading: true });
    try {
      try {
        await suratService.deleteSuratMasuk(id);
        set((state) => ({
          suratMasuk: state.suratMasuk.filter((surat) => surat.id !== id),
          isLoading: false,
        }));
        toast.success('Surat masuk berhasil dihapus');
        return { success: true };
      } catch (apiError) {
        if (apiError.response?.status >= 400 && apiError.response?.status < 500) {
          throw apiError;
        }

        // Fallback to mock
        set((state) => ({
          suratMasuk: state.suratMasuk.filter((surat) => surat.id !== id),
          isLoading: false,
        }));
        toast.success('Surat masuk berhasil dihapus (mock mode)');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal menghapus surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Surat Keluar Actions
  fetchSuratKeluar: async () => {
    set({ isLoading: true });
    try {
      // Mock data
      const mockData = [
        {
          id: 1,
          nomorSurat: '001/SK/V/2025',
          tujuan: 'Dinas Kesehatan',
          tanggal: '2025-10-10',
          perihal: 'Permohonan Data Kesehatan',
          kategori: 'permohonan',
          status: 'kirim',
        },
        {
          id: 2,
          nomorSurat: '002/SK/V/2025',
          tujuan: 'Bank BRI Cabang Jakarta',
          tanggal: '2025-10-11',
          perihal: 'Surat Keterangan Aktif Pegawai',
          kategori: 'keterangan',
          status: 'menunggu',
        },
      ];

      set({ suratKeluar: mockData, isLoading: false });
      return mockData;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat surat keluar');
    }
  },

  createSuratKeluar: async (data) => {
    set({ isLoading: true });
    try {
      const newSurat = {
        id: Date.now(),
        ...data,
        status: 'draft',
        tanggal: data.tanggalSurat,
        tujuan: data.tujuanSurat,
      };

      set((state) => ({
        suratKeluar: [newSurat, ...state.suratKeluar],
        isLoading: false,
      }));

      toast.success('Surat keluar berhasil disimpan sebagai draft');
      return { success: true, data: newSurat };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal menyimpan surat keluar');
      return { success: false };
    }
  },

  sendSuratKeluar: async (id) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        suratKeluar: state.suratKeluar.map((surat) =>
          surat.id === id ? { ...surat, status: 'kirim' } : surat
        ),
        isLoading: false,
      }));

      toast.success('Surat keluar berhasil dikirim');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal mengirim surat keluar');
      return { success: false };
    }
  },

  // Common Actions
  setSelectedSurat: (surat) => set({ selectedSurat: surat }),

  clearError: () => set({ error: null }),

  // Search & Filter
  searchSuratMasuk: (query) => {
    const { suratMasuk } = get();
    if (!query) return suratMasuk;

    return suratMasuk.filter(
      (surat) =>
        surat.nomorSurat.toLowerCase().includes(query.toLowerCase()) ||
        surat.asalSurat.toLowerCase().includes(query.toLowerCase()) ||
        surat.perihal.toLowerCase().includes(query.toLowerCase())
    );
  },

  searchSuratKeluar: (query) => {
    const { suratKeluar } = get();
    if (!query) return suratKeluar;

    return suratKeluar.filter(
      (surat) =>
        surat.nomorSurat.toLowerCase().includes(query.toLowerCase()) ||
        surat.tujuan.toLowerCase().includes(query.toLowerCase()) ||
        surat.perihal.toLowerCase().includes(query.toLowerCase())
    );
  },
}));

export default useSuratStore;

// Lokasi: src/store/suratStore.js
