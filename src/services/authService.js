// src/services/authService.js

import apiClient from '../api/axios.config';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await apiClient.put('/auth/change-password', data);
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await apiClient.put('/auth/update-profile', data);
    return response.data;
  },
};
