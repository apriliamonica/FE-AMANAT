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
import { cn } from '../../utils/helpers';
import { getInitials } from '../../utils/helpers';

// Asumsi logo di folder public
// import logoAmanat from '../../assets/images/logo.png';

const Sidebar = ({ isOpen, onClose, userRole, userName }) => {
  const location = useLocation();

  // Menu items... (tidak berubah)
  const menuItems = {
    // ... (menu items Anda di sini) ...
    sekretaris_kantor: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: FileText, label: 'Disposisi', path: '/disposisi' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
      { icon: Settings, label: 'Pengaturan Pengguna', path: '/pengaturan' },
    ],
    // ... roles lainnya ...
    kepala_bagian: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.sekretaris_kantor;

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 transition-transform duration-300',
          // === PERUBAHAN DI SINI: Gradasi Kuning Hijau ===
          'bg-gradient-to-b from-primary-800 to-secondary-600',
          'lg:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header dengan Logo */}
        <div className='flex items-center justify-between p-6 border-b border-primary-700'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
              <img
                src='public/logoYPTU.png' // Path logo Anda
                alt='Logo AMANAT'
                className='w-6 h-6'
              />
            </div>
            <div>
              <h1 className='text-xl font-bold text-white'>AMANAT</h1>
              <p className='text-xs text-primary-200'>Manajemen Surat</p>
            </div>
          </div>

          {/* Close button untuk mobile */}
          <button
            onClick={onClose}
            className='lg:hidden p-1 rounded hover:bg-primary-700 text-white'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
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
                    ? 'bg-white/20 text-white font-medium' // Ubah latar belakang item aktif agar terlihat di gradasi
                    : 'text-white hover:bg-white/10 hover:text-white' // Ubah warna teks default menjadi putih
                )}
              >
                <Icon className='w-5 h-5 flex-shrink-0' />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile di bawah - Matching design */}
        <div className='p-4 border-t border-white/20'>
          {' '}
          {/* Ubah warna border bawah */}
          <div className='flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/20'>
            {' '}
            {/* Ubah bg profil */}
            <div className='w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0'>
              {getInitials(userName || 'User')}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-white truncate'>
                {userName || 'User'}
              </p>
              <p className='text-xs text-white/70 truncate'>Administrator</p>{' '}
              {/* Ubah warna teks */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
