import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import useAuthStore from '../../../store/authStore';

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    if (!checkAuth() && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, checkAuth]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {user && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={user.role}
          userName={user.name || user.username}
          onLogout={logout}
        />
      )}

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
