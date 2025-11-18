import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const disposisiService = {
  getDisposisi: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.DISPOSISI.LIST, { params });
    return response.data;
  },

  getDisposisiById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.DISPOSISI.DETAIL(id));
    return response.data;
  },

  createDisposisi: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.DISPOSISI.CREATE, data);
    return response.data;
  },

  updateDisposisi: async (id, data) => {
    const response = await apiClient.put(API_ENDPOINTS.DISPOSISI.UPDATE(id), data);
    return response.data;
  },

  getTrackingHistory: async (nomorSurat) => {
    const response = await apiClient.get(`/disposisi/tracking/${nomorSurat}`);
    return response.data;
  },
};

