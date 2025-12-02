import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  Send,
  FileText,
  Archive,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';
import { cn, getInitials } from '../../../utils/helpers';

const Sidebar = ({ isOpen, onClose, userRole, userName, onLogout }) => {
  const location = useLocation();

  // Menu items berdasarkan role
  const menuItems = {
    sekretaris_kantor: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
      { icon: Settings, label: 'Pengaturan Pengguna', path: '/pengaturan' },
    ],
    ketua_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
    sekretaris_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
    bendahara_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
    kepala_bagian: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.sekretaris_kantor;

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar dengan Gradasi Kuning-Hijau */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 transition-transform duration-300',
          'bg-gradient-to-b from-primary-800 to-secondary-600',
          'lg:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header dengan Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
              {/* PILIH SALAH SATU: */}

              {/* Jika logo di public/ */}
              <img
                src="public/logoYPTU.png"
                alt="Logo AMANAT"
                className="w-full h-full object-contain"
              />

              {/* ATAU jika logo di src/assets/images/ */}
              {/* <img
                src={logoYPTU}
                alt="Logo AMANAT"
                className="w-full h-full object-contain"
              /> */}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AMANAT</h1>
              <p className="text-xs text-white/70">Manajemen Surat</p>
            </div>
          </div>

          {/* Close button untuk mobile */}
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm',
                  isActive
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/20 mb-2">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {getInitials(userName || 'User')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName || 'User'}</p>
              <p className="text-xs text-white/70 truncate">Administrator</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={async () => {
              if (onLogout) {
                await onLogout();
                window.location.href = '/login';
              } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
