import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const arsipService = {
  getArsip: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.ARSIP.LIST, { params });
    return response.data;
  },

  getArsipById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.ARSIP.DETAIL(id));
    return response.data;
  },

  searchArsip: async (query, params) => {
    const response = await apiClient.get(API_ENDPOINTS.ARSIP.LIST, {
      params: { ...params, search: query },
    });
    return response.data;
  },
};

