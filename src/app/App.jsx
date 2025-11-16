
import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import SekretarisDashboard from '../components/dashboard/SekretarisDashboard';
import Login from '../components/Login';
import '../styles/global.css';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar user={user} />
      <main style={{ flex: 1, padding: 24 }}>
        <Header user={user} />
        <div style={{ marginTop: 18 }}>
          <SekretarisDashboard />
        </div>
      </main>
    </div>
  );
}
