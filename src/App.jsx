import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import './index.css';

export default function App() {
  return (
    <div className="app-root" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 28 }}>
        <header style={{ marginBottom: 20 }}>
          <h2>Dashboard Sekretaris Kantor</h2>
          <p style={{ color: '#6b7280' }}>
            Pusat kendali manajemen surat masuk dan keluar
          </p>
        </header>

        <section>
          <div
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 8,
              boxShadow: '0 6px 18px rgba(2,6,23,0.06)',
            }}
          >
            <h3>Ringkasan</h3>
            <p>
              Konten dashboard akan ditambahkan bertahap — ini placeholder awal.
            </p>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => toast.success('Halo dari react-hot-toast!')}
                className="btn-primary"
              >
                Show Toast
              </button>
            </div>
          </div>
        </section>

        <Toaster />
      </main>
    </div>
  );
}
