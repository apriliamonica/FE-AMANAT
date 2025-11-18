// Status Surat
export const SURAT_STATUS = {
  BARU: 'baru',
  DIPROSES: 'diproses',
  SELESAI: 'selesai',
  DITOLAK: 'ditolak',
  PENDING: 'pending',
};

// Status Surat Labels
export const SURAT_STATUS_LABELS = {
  [SURAT_STATUS.BARU]: 'Baru',
  [SURAT_STATUS.DIPROSES]: 'Diproses',
  [SURAT_STATUS.SELESAI]: 'Selesai',
  [SURAT_STATUS.DITOLAK]: 'Ditolak',
  [SURAT_STATUS.PENDING]: 'Pending',
};

// Status Surat Colors (Tailwind)
export const SURAT_STATUS_COLORS = {
  [SURAT_STATUS.BARU]: 'bg-blue-100 text-blue-800',
  [SURAT_STATUS.DIPROSES]: 'bg-yellow-100 text-yellow-800',
  [SURAT_STATUS.SELESAI]: 'bg-green-100 text-green-800',
  [SURAT_STATUS.DITOLAK]: 'bg-red-100 text-red-800',
  [SURAT_STATUS.PENDING]: 'bg-gray-100 text-gray-800',
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
