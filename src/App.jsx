import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  return (
    <div className="app-root" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 28 }}>
        <Dashboard />
      </main>
    </div>
  );
}
