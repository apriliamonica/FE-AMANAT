// Status Surat Masuk (6 tahap)
export const SURAT_MASUK_STATUS = {
  DITERIMA: 'diterima',
  DIPROSES: 'diproses',
  DISPOSISI_KETUA: 'disposisi_ketua',
  DISPOSISI_SEKRETARIS_PENGURUS: 'disposisi_sekretaris_pengurus',
  DISPOSISI_KABAG: 'disposisi_kabag',
  SELESAI: 'selesai',
};

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

// Status Surat Keluar (5 tahap)
export const SURAT_KELUAR_STATUS = {
  DRAFT: 'draft',
  REVIEW_SEKRETARIS_PENGURUS: 'review_sekretaris_pengurus',
  LAMPIRAN_KABAG: 'lampiran_kabag',
  REVIEW_KETUA: 'review_ketua',
  TERKIRIM: 'terkirim',
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

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  SURAT_MASUK: {
    LIST: '/surat-masuk',
    DETAIL: (id) => `/surat-masuk/${id}`,
    CREATE: '/surat-masuk',
    UPDATE: (id) => `/surat-masuk/${id}`,
    DELETE: (id) => `/surat-masuk/${id}`,
  },
  SURAT_KELUAR: {
    LIST: '/surat-keluar',
    DETAIL: (id) => `/surat-keluar/${id}`,
    CREATE: '/surat-keluar',
    UPDATE: (id) => `/surat-keluar/${id}`,
    DELETE: (id) => `/surat-keluar/${id}`,
  },
  DISPOSISI: {
    LIST: '/disposisi',
    DETAIL: (id) => `/disposisi/${id}`,
    CREATE: '/disposisi',
    UPDATE: (id) => `/disposisi/${id}`,
  },
  ARSIP: {
    LIST: '/arsip',
    DETAIL: (id) => `/arsip/${id}`,
  },
  LAPORAN: {
    GENERATE: '/laporan/generate',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
};
