import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const userService = {
  getUsers: async (params) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  getUserByRole: async (role) => {
    const response = await apiClient.get(`/users/by-role/${role}`);
    return response.data;
  },

  getUserByBagian: async (kodeBagian) => {
    const response = await apiClient.get(`/users/by-bagian/${kodeBagian}`);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },
  updateUserStatus: async (id, status) => {
    const response = await apiClient.put(`/users/${id}/status`, { status });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
