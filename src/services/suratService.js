import apiClient from '../config/axios.config';
import { API_ENDPOINTS } from '../../utils/constants';

export const suratService = {
  // Surat Masuk
  getSuratMasuk: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.SURAT_MASUK.LIST, { params });
    return response.data;
  },

  getSuratMasukById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.SURAT_MASUK.DETAIL(id));
    return response.data;
  },

  createSuratMasuk: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.SURAT_MASUK.CREATE, data);
    return response.data;
  },

  // Surat Keluar
  getSuratKeluar: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.SURAT_KELUAR.LIST, { params });
    return response.data;
  },

  createSuratKeluar: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.SURAT_KELUAR.CREATE, data);
    return response.data;
  },
};
