import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../utils/Header';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Nanti akan diambil dari auth store
  const user = {
    name: 'Rudi Santoso',
    email: 'admin@amanat.com',
    role: 'sekretaris_kantor',
    role_label: 'Administrator',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={user.role}
        userName={user.name}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

// Lokasi: src/components/layout/MainLayout.jsx
