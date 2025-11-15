import React from 'react';
import '../styles/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">FE-AMANAT</div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active">Dashboard</li>
          <li>Surat Masuk</li>
          <li>Surat Keluar</li>
          <li>Disposisi</li>
          <li>Arsip</li>
          <li>Laporan</li>
          <li>Pengaturan Pengguna</li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">BU</div>
        <div className="user-info">
          <div className="user-name">Budi Santoso</div>
          <div className="user-role">Administrator</div>
        </div>
      </div>
    </aside>
  );
}
