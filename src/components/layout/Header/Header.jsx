import { Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  // Get current date in Indonesian
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left side - Menu button (mobile) */}
        <div className="flex items-center space-x-4">
          <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo AMANAT untuk mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <img src="public/logoYPTU.png" alt="Logo AMANAT" className="w-6 h-6" />
            <span className="font-bold text-gray-900">AMANAT</span>
          </div>
        </div>

        {/* Right side - Date */}
        <div className="ml-auto">
          <p className="text-sm text-gray-600">{currentDate}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Lokasi: src/components/layout/Header.jsx
