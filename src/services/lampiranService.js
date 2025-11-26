import apiClient from '../api/axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const lampiranService = {
  uploadSuratMasuk: async (suratMasukId, files, extra = {}) => {
    const form = new FormData();
    files.forEach((f) => form.append('files', f));
    Object.keys(extra).forEach((k) => form.append(k, extra[k]));

    const response = await apiClient.post(
      API_ENDPOINTS.LAMPIRAN.UPLOAD_SURAT_MASUK(suratMasukId),
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
  },

  uploadSuratKeluar: async (suratKeluarId, files, extra = {}) => {
    const form = new FormData();
    files.forEach((f) => form.append('files', f));
    Object.keys(extra).forEach((k) => form.append(k, extra[k]));

    const response = await apiClient.post(
      API_ENDPOINTS.LAMPIRAN.UPLOAD_SURAT_KELUAR(suratKeluarId),
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
  },

  listSuratMasuk: async (suratMasukId) => {
    const response = await apiClient.get(API_ENDPOINTS.LAMPIRAN.LIST_SURAT_MASUK(suratMasukId));
    return response.data;
  },

  listSuratKeluar: async (suratKeluarId) => {
    const response = await apiClient.get(API_ENDPOINTS.LAMPIRAN.LIST_SURAT_KELUAR(suratKeluarId));
    return response.data;
  },

  download: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.LAMPIRAN.DOWNLOAD(id), { responseType: 'blob' });
    return response.data;
  },
};

export default lampiranService;
