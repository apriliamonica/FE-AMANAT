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
  // FileStack dihapus dari import
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { getInitials } from '../../utils/helpers';

// Jika Anda menggunakan framework seperti Next.js,
// Anda mungkin perlu mengimpor logo:
// import logoImage from '/path/to/your/logo.png';
// Dan gunakan <img src={logoImage.src} ... />

const Sidebar = ({ isOpen, onClose, userRole, userName }) => {
  const location = useLocation();

  // Menu items berdasarkan role
  const menuItems = {
    sekretaris_kantor: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: FileText, label: 'Disposisi', path: '/disposisi' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
      { icon: Settings, label: 'Pengaturan Pengguna', path: '/pengaturan' },
    ],
    ketua_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: Send, label: 'Surat Keluar', path: '/surat-keluar' },
      { icon: FileText, label: 'Disposisi', path: '/disposisi' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
    sekretaris_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: FileText, label: 'Disposisi', path: '/disposisi' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
    bendahara_pengurus: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Mail, label: 'Surat Masuk', path: '/surat-masuk' },
      { icon: FileText, label: 'Disposisi', path: '/disposisi' },
      { icon: Archive, label: 'Arsip', path: '/arsip' },
      { icon: BarChart3, label: 'Laporan', path: '/laporan' },
    ],
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
          'fixed top-0 left-0 z-50 h-screen w-64 bg-primary-800 transition-transform duration-300',
          'lg:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header dengan Logo */}
        <div className='flex items-center justify-between p-6 border-b border-primary-700'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
              <img src='/logoYPTU.png' alt='Logo AMANAT' className='w-6 h-6' />
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
                    ? 'bg-primary-700 text-white font-medium'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                )}
              >
                <Icon className='w-5 h-5 flex-shrink-0' />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile di bawah - Matching design */}
        <div className='p-4 border-t border-primary-700'>
          <div className='flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary-700'>
            <div className='w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0'>
              {getInitials(userName || 'User')}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-white truncate'>
                {userName || 'User'}
              </p>
              <p className='text-xs text-primary-200 truncate'>Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
