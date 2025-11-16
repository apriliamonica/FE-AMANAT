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
  [ROLES.KETUA_PENGURUS]: 'Ketua Pengurus Yayasan',
  [ROLES.SEKRETARIS_PENGURUS]: 'Sekretaris Pengurus Yayasan',
  [ROLES.BENDAHARA_PENGURUS]: 'Bendahara Pengurus Yayasan',
  [ROLES.KEPALA_BAGIAN]: 'Kepala Bagian',
};

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

// Status Surat Colors
