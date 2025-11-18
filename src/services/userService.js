import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const userService = {
  getUsers: async (params) => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.DETAIL(id));
    return response.data;
  },

  createUser: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    return response.data;
  },
};

