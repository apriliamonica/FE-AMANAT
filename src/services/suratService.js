// src/services/suratService.js

import apiClient from '../api/axios.config';

export const suratService = {
  // ==================== SURAT MASUK ====================

  // Get list surat masuk dengan pagination, filter, search
  getSuratMasuk: async (params = {}) => {
    const response = await apiClient.get('/surat-masuk', { params });
    return response.data;
  },

  // Get detail surat masuk by ID
  getSuratMasukById: async (id) => {
    const response = await apiClient.get(`/surat-masuk/${id}`);
    return response.data;
  },

  // Create surat masuk
  createSuratMasuk: async (data) => {
    const response = await apiClient.post('/surat-masuk', data);
    return response.data;
  },

  // Update surat masuk
  updateSuratMasuk: async (id, data) => {
    const response = await apiClient.put(`/surat-masuk/${id}`, data);
    return response.data;
  },

  // Update status surat masuk
  updateSuratMasukStatus: async (id, status) => {
    const response = await apiClient.put(`/surat-masuk/${id}/status`, { status });
    return response.data;
  },

  // Delete surat masuk
  deleteSuratMasuk: async (id) => {
    const response = await apiClient.delete(`/surat-masuk/${id}`);
    return response.data;
  },

  // Get surat masuk by status
  getSuratMasukByStatus: async (status, params = {}) => {
    const response = await apiClient.get(`/surat-masuk/by-status/${status}`, { params });
    return response.data;
  },

  // Get pending surat masuk
  getPendingSuratMasuk: async (params = {}) => {
    const response = await apiClient.get('/surat-masuk/pending', { params });
    return response.data;
  },

  // Get stats surat masuk
  getSuratMasukStats: async () => {
    const response = await apiClient.get('/surat-masuk/stats');
    return response.data;
  },

  // ==================== SURAT KELUAR ====================

  // Get list surat keluar
  getSuratKeluar: async (params = {}) => {
    const response = await apiClient.get('/surat-keluar', { params });
    return response.data;
  },

  // Get detail surat keluar by ID
  getSuratKeluarById: async (id) => {
    const response = await apiClient.get(`/surat-keluar/${id}`);
    return response.data;
  },

  // Create surat keluar
  createSuratKeluar: async (data) => {
    const response = await apiClient.post('/surat-keluar', data);
    return response.data;
  },

  // Update surat keluar
  updateSuratKeluar: async (id, data) => {
    const response = await apiClient.put(`/surat-keluar/${id}`, data);
    return response.data;
  },

  // Update status surat keluar
  updateSuratKeluarStatus: async (id, status) => {
    const response = await apiClient.put(`/surat-keluar/${id}/status`, { status });
    return response.data;
  },

  // Delete surat keluar
  deleteSuratKeluar: async (id) => {
    const response = await apiClient.delete(`/surat-keluar/${id}`);
    return response.data;
  },

  // ==================== DISPOSISI ====================

  // Get list disposisi
  getDisposisi: async (params = {}) => {
    const response = await apiClient.get('/disposisi', { params });
    return response.data;
  },

  // Get disposisi by user ID
  getDisposisiByUser: async (userId, params = {}) => {
    const response = await apiClient.get(`/disposisi/user/${userId}`, { params });
    return response.data;
  },

  // Get detail disposisi
  getDisposisiById: async (id) => {
    const response = await apiClient.get(`/disposisi/${id}`);
    return response.data;
  },

  // Create disposisi
  createDisposisi: async (data) => {
    const response = await apiClient.post('/disposisi', data);
    return response.data;
  },

  // Update disposisi
  updateDisposisi: async (id, data) => {
    const response = await apiClient.put(`/disposisi/${id}`, data);
    return response.data;
  },

  // Update disposisi status
  updateDisposisiStatus: async (id, status) => {
    const response = await apiClient.put(`/disposisi/${id}/status`, { status });
    return response.data;
  },

  // Delete disposisi
  deleteDisposisi: async (id) => {
    const response = await apiClient.delete(`/disposisi/${id}`);
    return response.data;
  },

  // ==================== LAMPIRAN ====================

  // Get lampiran by surat masuk ID
  getLampiranSuratMasuk: async (suratMasukId) => {
    const response = await apiClient.get(`/lampiran/surat-masuk/${suratMasukId}`);
    return response.data;
  },

  // Get lampiran by surat keluar ID
  getLampiranSuratKeluar: async (suratKeluarId) => {
    const response = await apiClient.get(`/lampiran/surat-keluar/${suratKeluarId}`);
    return response.data;
  },

  // Get detail lampiran
  getLampiranById: async (id) => {
    const response = await apiClient.get(`/lampiran/${id}`);
    return response.data;
  },

  // Upload lampiran surat masuk
  uploadLampiranSuratMasuk: async (suratMasukId, file, keterangan) => {
    const formData = new FormData();
    formData.append('file', file);
    if (keterangan) {
      formData.append('keterangan', keterangan);
    }

    const response = await apiClient.post(`/lampiran/surat-masuk/${suratMasukId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload lampiran surat keluar
  uploadLampiranSuratKeluar: async (suratKeluarId, file, keterangan) => {
    const formData = new FormData();
    formData.append('file', file);
    if (keterangan) {
      formData.append('keterangan', keterangan);
    }

    const response = await apiClient.post(`/lampiran/surat-keluar/${suratKeluarId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update keterangan lampiran
  updateLampiran: async (id, data) => {
    const response = await apiClient.put(`/lampiran/${id}`, data);
    return response.data;
  },

  // Delete lampiran
  deleteLampiran: async (id) => {
    const response = await apiClient.delete(`/lampiran/${id}`);
    return response.data;
  },

  // ==================== TRACKING ====================

  // Get tracking surat masuk
  getTrackingSuratMasuk: async (suratMasukId) => {
    const response = await apiClient.get(`/tracking/surat-masuk/${suratMasukId}`);
    return response.data;
  },

  // Get tracking surat keluar
  getTrackingSuratKeluar: async (suratKeluarId) => {
    const response = await apiClient.get(`/tracking/surat-keluar/${suratKeluarId}`);
    return response.data;
  },

  // Get detail tracking
  getTrackingById: async (id) => {
    const response = await apiClient.get(`/tracking/${id}`);
    return response.data;
  },

  // Get tracking stats by tahap
  getTrackingStats: async (tahapProses) => {
    const response = await apiClient.get(`/tracking/stats/${tahapProses}`);
    return response.data;
  },
};
