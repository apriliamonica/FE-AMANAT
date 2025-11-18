import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const laporanService = {
  generateLaporan: async (params) => {
    const response = await apiClient.post(API_ENDPOINTS.LAPORAN.GENERATE, params);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  getSuratMasukStats: async (params) => {
    const response = await apiClient.get('/dashboard/surat-masuk', { params });
    return response.data;
  },

  getSuratKeluarStats: async (params) => {
    const response = await apiClient.get('/dashboard/surat-keluar', { params });
    return response.data;
  },
};

