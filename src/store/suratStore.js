import { create } from 'zustand';
import toast from 'react-hot-toast';

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
      // TODO: Replace with actual API call
      // const response = await suratService.getSuratMasuk();

      // Mock data
      const mockData = [
        {
          id: 1,
          nomorSurat: '001/SM/V/2025',
          asalSurat: 'Dinas Pendidikan',
          tanggal: '2025-10-10',
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
          perihal: 'Permohonan Data Keuangan',
          prioritas: 'tinggi',
          status: 'diproses',
          kategori: 'permohonan',
          file: null,
        },
      ];

      set({ suratMasuk: mockData, isLoading: false });
      return mockData;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal memuat surat masuk');
    }
  },

  createSuratMasuk: async (data) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const newSurat = {
        id: Date.now(),
        ...data,
        status: 'baru',
        tanggal: data.tanggalTerima,
      };

      set((state) => ({
        suratMasuk: [newSurat, ...state.suratMasuk],
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil ditambahkan');
      return { success: true, data: newSurat };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal menambahkan surat masuk');
      return { success: false, error: error.message };
    }
  },

  updateSuratMasuk: async (id, data) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        suratMasuk: state.suratMasuk.map((surat) =>
          surat.id === id ? { ...surat, ...data } : surat
        ),
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil diupdate');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal mengupdate surat masuk');
      return { success: false };
    }
  },

  deleteSuratMasuk: async (id) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        suratMasuk: state.suratMasuk.filter((surat) => surat.id !== id),
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil dihapus');
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Gagal menghapus surat masuk');
      return { success: false };
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
