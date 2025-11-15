import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function RoleBasedMenu() {
  const { user } = useAuth();
  if (!user) return null;

  // simple placeholder menu by role
  const menus = {
    admin: ['Dashboard', 'Surat Masuk', 'Pengaturan'],
    sekretaris: ['Dashboard', 'Surat Masuk', 'Disposisi', 'Arsip'],
    ketua: ['Dashboard', 'Laporan'],
    bendahara: ['Dashboard', 'Keuangan'],
    kabag: ['Dashboard', 'Surat Keluar'],
  };

  return (
    <ul>
      {(menus[user.role] || menus.admin).map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}
