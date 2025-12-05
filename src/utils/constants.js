// src/utils/constants.js

// ==================== SURAT MASUK STATUS ====================
export const SURAT_MASUK_STATUS = {
  DITERIMA: 'DITERIMA',
  DIPROSES: 'DIPROSES',
  DISPOSISI_KETUA: 'DISPOSISI_KETUA',
  DISPOSISI_SEKPENGURUS: 'DISPOSISI_SEKPENGURUS',
  DISPOSISI_KABAG: 'DISPOSISI_KABAG',
  SELESAI: 'SELESAI',
};

export const SURAT_MASUK_STATUS_LABEL = {
  DITERIMA: 'Diterima',
  DIPROSES: 'Diproses',
  DISPOSISI_KETUA: 'Disposisi Ketua',
  DISPOSISI_SEKPENGURUS: 'Disposisi Sekpengurus',
  DISPOSISI_KABAG: 'Disposisi Kabag',
  SELESAI: 'Selesai',
};

// ==================== SURAT KELUAR STATUS ====================
export const SURAT_KELUAR_STATUS = {
  DRAFT: 'DRAFT',
  REVIEW_SEKPENGURUS: 'REVIEW_SEKPENGURUS',
  LAMPIRAN_KABAG: 'LAMPIRAN_KABAG',
  REVIEW_KETUA: 'REVIEW_KETUA',
  TERKIRIM: 'TERKIRIM',
};

export const SURAT_KELUAR_STATUS_LABEL = {
  DRAFT: 'Draft',
  REVIEW_SEKPENGURUS: 'Review Sekpengurus',
  LAMPIRAN_KABAG: 'Lampiran Kabag',
  REVIEW_KETUA: 'Review Ketua',
  TERKIRIM: 'Terkirim',
};

// ==================== DISPOSISI STATUS ====================
export const DISPOSISI_STATUS = {
  PENDING: 'PENDING',
  DITERIMA: 'DITERIMA',
  DIPROSES: 'DIPROSES',
  SELESAI: 'SELESAI',
  DITOLAK: 'DITOLAK',
};

export const DISPOSISI_STATUS_LABEL = {
  PENDING: 'Pending',
  DITERIMA: 'Diterima',
  DIPROSES: 'Diproses',
  SELESAI: 'Selesai',
  DITOLAK: 'Ditolak',
};

// ==================== KATEGORI SURAT ====================
export const KATEGORI_SURAT = {
  UNDANGAN: 'UNDANGAN',
  PERMOHONAN: 'PERMOHONAN',
  PEMBERITAHUAN: 'PEMBERITAHUAN',
  VERIFIKASI: 'VERIFIKASI',
  AUDIT: 'AUDIT',
  LAINNYA: 'LAINNYA',
};

export const KATEGORI_SURAT_LABEL = {
  UNDANGAN: 'Undangan',
  PERMOHONAN: 'Permohonan',
  PEMBERITAHUAN: 'Pemberitahuan',
  VERIFIKASI: 'Verifikasi',
  AUDIT: 'Audit',
  LAINNYA: 'Lainnya',
};

// ==================== USER ROLES ====================
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  KETUA_PENGURUS: 'KETUA_PENGURUS',
  SEKRETARIS_PENGURUS: 'SEKRETARIS_PENGURUS',
  BENDAHARA_PENGURUS: 'BENDAHARA_PENGURUS',
  KEPALA_BAGIAN_PSDM: 'KEPALA_BAGIAN_PSDM',
  KEPALA_BAGIAN_KEUANGAN: 'KEPALA_BAGIAN_KEUANGAN',
  KEPALA_BAGIAN_UMUM: 'KEPALA_BAGIAN_UMUM',
};

export const USER_ROLES_LABEL = {
  ADMIN: 'Admin/Sekretaris Kantor',
  KETUA_PENGURUS: 'Ketua Pengurus',
  SEKRETARIS_PENGURUS: 'Sekretaris Pengurus',
  BENDAHARA_PENGURUS: 'Bendahara Pengurus',
  KEPALA_BAGIAN_PSDM: 'Kepala Bagian PSDM',
  KEPALA_BAGIAN_KEUANGAN: 'Kepala Bagian Keuangan',
  KEPALA_BAGIAN_UMUM: 'Kepala Bagian Umum',
};

// ==================== JENIS DISPOSISI ====================
export const JENIS_DISPOSISI = {
  TRANSFER: 'TRANSFER',
  REQUEST_LAMPIRAN: 'REQUEST_LAMPIRAN',
  APPROVAL: 'APPROVAL',
  REVISI: 'REVISI',
};

export const JENIS_DISPOSISI_LABEL = {
  TRANSFER: 'Transfer',
  REQUEST_LAMPIRAN: 'Request Lampiran',
  APPROVAL: 'Approval',
  REVISI: 'Revisi',
};

// ==================== PAGINATION ====================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [5, 10, 20, 50],
};

// ==================== API ENDPOINTS ====================
// (Opsional, jika ingin centralize endpoints)
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    UPDATE_PROFILE: '/auth/update-profile',
  },

  // Surat Masuk
  SURAT_MASUK: {
    LIST: '/surat-masuk',
    DETAIL: (id) => `/surat-masuk/${id}`,
    CREATE: '/surat-masuk',
    UPDATE: (id) => `/surat-masuk/${id}`,
    DELETE: (id) => `/surat-masuk/${id}`,
    STATUS: (id) => `/surat-masuk/${id}/status`,
    BY_STATUS: (status) => `/surat-masuk/by-status/${status}`,
    PENDING: '/surat-masuk/pending',
    STATS: '/surat-masuk/stats',
  },

  // Surat Keluar
  SURAT_KELUAR: {
    LIST: '/surat-keluar',
    DETAIL: (id) => `/surat-keluar/${id}`,
    CREATE: '/surat-keluar',
    UPDATE: (id) => `/surat-keluar/${id}`,
    DELETE: (id) => `/surat-keluar/${id}`,
    STATUS: (id) => `/surat-keluar/${id}/status`,
  },

  // Disposisi
  DISPOSISI: {
    LIST: '/disposisi',
    DETAIL: (id) => `/disposisi/${id}`,
    CREATE: '/disposisi',
    UPDATE: (id) => `/disposisi/${id}`,
    DELETE: (id) => `/disposisi/${id}`,
    STATUS: (id) => `/disposisi/${id}/status`,
    BY_USER: (userId) => `/disposisi/user/${userId}`,
  },

  // Lampiran
  LAMPIRAN: {
    BY_SURAT_MASUK: (id) => `/lampiran/surat-masuk/${id}`,
    BY_SURAT_KELUAR: (id) => `/lampiran/surat-keluar/${id}`,
    DETAIL: (id) => `/lampiran/${id}`,
    UPLOAD_SURAT_MASUK: (id) => `/lampiran/surat-masuk/${id}`,
    UPLOAD_SURAT_KELUAR: (id) => `/lampiran/surat-keluar/${id}`,
    UPDATE: (id) => `/lampiran/${id}`,
    DELETE: (id) => `/lampiran/${id}`,
  },

  // Tracking
  TRACKING: {
    SURAT_MASUK: (id) => `/tracking/surat-masuk/${id}`,
    SURAT_KELUAR: (id) => `/tracking/surat-keluar/${id}`,
    DETAIL: (id) => `/tracking/${id}`,
    STATS: (tahapProses) => `/tracking/stats/${tahapProses}`,
  },
};

// ==================== COLOR MAPPING ====================
export const STATUS_COLOR = {
  // Surat Masuk
  DITERIMA: 'bg-blue-100 text-blue-800',
  DIPROSES: 'bg-yellow-100 text-yellow-800',
  DISPOSISI_KETUA: 'bg-purple-100 text-purple-800',
  DISPOSISI_SEKPENGURUS: 'bg-indigo-100 text-indigo-800',
  DISPOSISI_KABAG: 'bg-orange-100 text-orange-800',
  SELESAI: 'bg-green-100 text-green-800',

  // Surat Keluar
  DRAFT: 'bg-gray-100 text-gray-800',
  REVIEW_SEKPENGURUS: 'bg-blue-100 text-blue-800',
  LAMPIRAN_KABAG: 'bg-purple-100 text-purple-800',
  REVIEW_KETUA: 'bg-indigo-100 text-indigo-800',
  TERKIRIM: 'bg-green-100 text-green-800',

  // Disposisi
  PENDING: 'bg-gray-100 text-gray-800',
  DITOLAK: 'bg-red-100 text-red-800',
};

// Status Surat Masuk (6 tahap)

export const SURAT_MASUK_STATUS_LABELS = {
  [SURAT_MASUK_STATUS.DITERIMA]: 'Diterima',
  [SURAT_MASUK_STATUS.DIPROSES]: 'Diproses',
  [SURAT_MASUK_STATUS.DISPOSISI_KETUA]: 'Disposisi Ketua',
  [SURAT_MASUK_STATUS.DISPOSISI_SEKRETARIS_PENGURUS]: 'Disposisi Sekretaris Pengurus',
  [SURAT_MASUK_STATUS.DISPOSISI_KABAG]: 'Disposisi Kabag',
  [SURAT_MASUK_STATUS.SELESAI]: 'Selesai',
};

export const SURAT_MASUK_STATUS_COLORS = {
  [SURAT_MASUK_STATUS.DITERIMA]: 'bg-blue-100 text-blue-800',
  [SURAT_MASUK_STATUS.DIPROSES]: 'bg-yellow-100 text-yellow-800',
  [SURAT_MASUK_STATUS.DISPOSISI_KETUA]: 'bg-orange-100 text-orange-800',
  [SURAT_MASUK_STATUS.DISPOSISI_SEKRETARIS_PENGURUS]: 'bg-indigo-100 text-indigo-800',
  [SURAT_MASUK_STATUS.DISPOSISI_KABAG]: 'bg-purple-100 text-purple-800',
  [SURAT_MASUK_STATUS.SELESAI]: 'bg-green-100 text-green-800',
};

export const SURAT_KELUAR_STATUS_LABELS = {
  [SURAT_KELUAR_STATUS.DRAFT]: 'Draft',
  [SURAT_KELUAR_STATUS.REVIEW_SEKRETARIS_PENGURUS]: 'Review Sekretaris Pengurus',
  [SURAT_KELUAR_STATUS.LAMPIRAN_KABAG]: 'Lampiran Kabag',
  [SURAT_KELUAR_STATUS.REVIEW_KETUA]: 'Review Ketua',
  [SURAT_KELUAR_STATUS.TERKIRIM]: 'Terkirim',
};

export const SURAT_KELUAR_STATUS_COLORS = {
  [SURAT_KELUAR_STATUS.DRAFT]: 'bg-gray-100 text-gray-800',
  [SURAT_KELUAR_STATUS.REVIEW_SEKRETARIS_PENGURUS]: 'bg-yellow-100 text-yellow-800',
  [SURAT_KELUAR_STATUS.LAMPIRAN_KABAG]: 'bg-indigo-100 text-indigo-800',
  [SURAT_KELUAR_STATUS.REVIEW_KETUA]: 'bg-orange-100 text-orange-800',
  [SURAT_KELUAR_STATUS.TERKIRIM]: 'bg-green-100 text-green-800',
};

// Jenis Surat
export const JENIS_SURAT = {
  UNDANGAN: 'undangan',
  PERMOHONAN: 'permohonan',
  PEMBERITAHUAN: 'pemberitahuan',
  LAPORAN: 'laporan',
  SURAT_TUGAS: 'surat_tugas',
  LAINNYA: 'lainnya',
};

// Jenis Surat Labels
export const JENIS_SURAT_LABELS = {
  [JENIS_SURAT.UNDANGAN]: 'Undangan',
  [JENIS_SURAT.PERMOHONAN]: 'Permohonan',
  [JENIS_SURAT.PEMBERITAHUAN]: 'Pemberitahuan',
  [JENIS_SURAT.LAPORAN]: 'Laporan',
  [JENIS_SURAT.SURAT_TUGAS]: 'Surat Tugas',
  [JENIS_SURAT.LAINNYA]: 'Lainnya',
};

// Prioritas
export const PRIORITAS = {
  RENDAH: 'rendah',
  SEDANG: 'sedang',
  TINGGI: 'tinggi',
  URGENT: 'urgent',
};

// Prioritas Labels
export const PRIORITAS_LABELS = {
  [PRIORITAS.RENDAH]: 'Rendah',
  [PRIORITAS.SEDANG]: 'Sedang',
  [PRIORITAS.TINGGI]: 'Tinggi',
  [PRIORITAS.URGENT]: 'Urgent',
};

// Prioritas Colors
export const PRIORITAS_COLORS = {
  [PRIORITAS.RENDAH]: 'bg-gray-100 text-gray-800',
  [PRIORITAS.SEDANG]: 'bg-blue-100 text-blue-800',
  [PRIORITAS.TINGGI]: 'bg-orange-100 text-orange-800',
  [PRIORITAS.URGENT]: 'bg-red-100 text-red-800',
};

// Bagian/Divisi
export const BAGIAN = {
  PSDM: 'psdm',
  KEUANGAN: 'keuangan',
  UMUM: 'umum',
};

// Bagian Labels
export const BAGIAN_LABELS = {
  [BAGIAN.PSDM]: 'PSDM',
  [BAGIAN.KEUANGAN]: 'Keuangan',
  [BAGIAN.UMUM]: 'Umum',
};

// User Roles
export const ROLES = {
  SEKRETARIS_KANTOR: 'sekretaris_kantor',
  KETUA_PENGURUS: 'ketua_pengurus',
  SEKRETARIS_PENGURUS: 'sekretaris_pengurus',
  BENDAHARA_PENGURUS: 'bendahara_pengurus',
  KEPALA_BAGIAN: 'kepala_bagian',
};

// Role Labels
export const ROLE_LABELS = {
  [ROLES.SEKRETARIS_KANTOR]: 'Sekretaris Kantor',
  [ROLES.KETUA_PENGURUS]: 'Ketua Pengurus',
  [ROLES.SEKRETARIS_PENGURUS]: 'Sekretaris Pengurus',
  [ROLES.BENDAHARA_PENGURUS]: 'Bendahara Pengurus',
  [ROLES.KEPALA_BAGIAN]: 'Kepala Bagian',
};

// Menu Access per Role
export const MENU_ACCESS = {
  [ROLES.SEKRETARIS_KANTOR]: [
    'dashboard',
    'surat-masuk',
    'surat-keluar',
    'disposisi',
    'arsip',
    'laporan',
    'pengaturan',
  ],
  [ROLES.KETUA_PENGURUS]: [
    'dashboard',
    'surat-masuk',
    'surat-keluar',
    'disposisi',
    'arsip',
    'laporan',
  ],
  [ROLES.SEKRETARIS_PENGURUS]: ['dashboard', 'surat-masuk', 'disposisi', 'arsip', 'laporan'],
  [ROLES.BENDAHARA_PENGURUS]: ['dashboard', 'surat-masuk', 'disposisi', 'arsip', 'laporan'],
  [ROLES.KEPALA_BAGIAN]: ['dashboard', 'surat-masuk', 'surat-keluar', 'arsip', 'laporan'],
};
