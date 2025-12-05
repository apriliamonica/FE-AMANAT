// src/store/suratStore.js

import { create } from 'zustand';
import toast from 'react-hot-toast';
import { suratService } from '../services/suratService';

const useSuratStore = create((set, get) => ({
  // ==================== STATE ====================

  // Surat Masuk
  suratMasukList: [],
  suratMasukTotal: 0,
  suratMasukPage: 1,
  suratMasukLimit: 10,

  // Surat Keluar
  suratKeluarList: [],
  suratKeluarTotal: 0,
  suratKeluarPage: 1,
  suratKeluarLimit: 10,

  // Detail
  selectedSuratMasuk: null,
  selectedSuratKeluar: null,

  // Loading & Error
  isLoading: false,
  error: null,

  // ==================== SURAT MASUK ACTIONS ====================

  // Fetch surat masuk dengan pagination
  fetchSuratMasuk: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.getSuratMasuk({
        page,
        limit,
        ...filters,
      });

      const { items, total, totalPages } = response.data;

      set({
        suratMasukList: items || [],
        suratMasukTotal: total || 0,
        suratMasukPage: page,
        suratMasukLimit: limit,
        isLoading: false,
      });

      return { success: true, data: items };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal memuat surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get detail surat masuk
  fetchSuratMasukDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.getSuratMasukById(id);
      const surat = response.data;

      set({
        selectedSuratMasuk: surat,
        isLoading: false,
      });

      return { success: true, data: surat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal memuat detail surat';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Create surat masuk
  createSuratMasuk: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.createSuratMasuk(data);
      const newSurat = response.data;

      set((state) => ({
        suratMasukList: [newSurat, ...state.suratMasukList],
        suratMasukTotal: state.suratMasukTotal + 1,
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil dibuat');
      return { success: true, data: newSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal membuat surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update surat masuk
  updateSuratMasuk: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.updateSuratMasuk(id, data);
      const updatedSurat = response.data;

      set((state) => ({
        suratMasukList: state.suratMasukList.map((surat) =>
          surat.id === id ? updatedSurat : surat
        ),
        selectedSuratMasuk:
          state.selectedSuratMasuk?.id === id ? updatedSurat : state.selectedSuratMasuk,
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil diupdate');
      return { success: true, data: updatedSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update status surat masuk
  updateSuratMasukStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.updateSuratMasukStatus(id, status);
      const updatedSurat = response.data;

      set((state) => ({
        suratMasukList: state.suratMasukList.map((surat) =>
          surat.id === id ? updatedSurat : surat
        ),
        selectedSuratMasuk:
          state.selectedSuratMasuk?.id === id ? updatedSurat : state.selectedSuratMasuk,
        isLoading: false,
      }));

      toast.success(`Status surat diubah menjadi ${status}`);
      return { success: true, data: updatedSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal mengubah status';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Delete surat masuk
  deleteSuratMasuk: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await suratService.deleteSuratMasuk(id);

      set((state) => ({
        suratMasukList: state.suratMasukList.filter((surat) => surat.id !== id),
        suratMasukTotal: state.suratMasukTotal - 1,
        selectedSuratMasuk: state.selectedSuratMasuk?.id === id ? null : state.selectedSuratMasuk,
        isLoading: false,
      }));

      toast.success('Surat masuk berhasil dihapus');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal menghapus surat masuk';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // ==================== SURAT KELUAR ACTIONS ====================

  // Fetch surat keluar dengan pagination
  fetchSuratKeluar: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.getSuratKeluar({
        page,
        limit,
        ...filters,
      });

      const { items, total } = response.data;

      set({
        suratKeluarList: items || [],
        suratKeluarTotal: total || 0,
        suratKeluarPage: page,
        suratKeluarLimit: limit,
        isLoading: false,
      });

      return { success: true, data: items };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal memuat surat keluar';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get detail surat keluar
  fetchSuratKeluarDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.getSuratKeluarById(id);
      const surat = response.data;

      set({
        selectedSuratKeluar: surat,
        isLoading: false,
      });

      return { success: true, data: surat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal memuat detail surat';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Create surat keluar
  createSuratKeluar: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.createSuratKeluar(data);
      const newSurat = response.data;

      set((state) => ({
        suratKeluarList: [newSurat, ...state.suratKeluarList],
        suratKeluarTotal: state.suratKeluarTotal + 1,
        isLoading: false,
      }));

      toast.success('Surat keluar berhasil dibuat');
      return { success: true, data: newSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal membuat surat keluar';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update surat keluar
  updateSuratKeluar: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.updateSuratKeluar(id, data);
      const updatedSurat = response.data;

      set((state) => ({
        suratKeluarList: state.suratKeluarList.map((surat) =>
          surat.id === id ? updatedSurat : surat
        ),
        selectedSuratKeluar:
          state.selectedSuratKeluar?.id === id ? updatedSurat : state.selectedSuratKeluar,
        isLoading: false,
      }));

      toast.success('Surat keluar berhasil diupdate');
      return { success: true, data: updatedSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate surat keluar';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update status surat keluar
  updateSuratKeluarStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await suratService.updateSuratKeluarStatus(id, status);
      const updatedSurat = response.data;

      set((state) => ({
        suratKeluarList: state.suratKeluarList.map((surat) =>
          surat.id === id ? updatedSurat : surat
        ),
        selectedSuratKeluar:
          state.selectedSuratKeluar?.id === id ? updatedSurat : state.selectedSuratKeluar,
        isLoading: false,
      }));

      toast.success(`Status surat diubah menjadi ${status}`);
      return { success: true, data: updatedSurat };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal mengubah status';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Delete surat keluar
  deleteSuratKeluar: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await suratService.deleteSuratKeluar(id);

      set((state) => ({
        suratKeluarList: state.suratKeluarList.filter((surat) => surat.id !== id),
        suratKeluarTotal: state.suratKeluarTotal - 1,
        selectedSuratKeluar:
          state.selectedSuratKeluar?.id === id ? null : state.selectedSuratKeluar,
        isLoading: false,
      }));

      toast.success('Surat keluar berhasil dihapus');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal menghapus surat keluar';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // ==================== COMMON ACTIONS ====================

  clearSelectedSurat: () =>
    set({
      selectedSuratMasuk: null,
      selectedSuratKeluar: null,
    }),

  clearError: () => set({ error: null }),

  resetSuratMasukPage: () => set({ suratMasukPage: 1 }),

  resetSuratKeluarPage: () => set({ suratKeluarPage: 1 }),
}));

export default useSuratStore;
