import { cn } from '../../../utils/helpers';

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    baru: 'bg-blue-100 text-blue-800',
    diproses: 'bg-yellow-100 text-yellow-800',
    selesai: 'bg-green-100 text-green-800',
    ditolak: 'bg-red-100 text-red-800',
    urgent: 'bg-red-100 text-red-800',
    sedang: 'bg-blue-100 text-blue-800',
    tinggi: 'bg-orange-100 text-orange-800',
    rendah: 'bg-gray-100 text-gray-800',
    // Untuk Surat Keluar
    menunggu: 'bg-yellow-100 text-yellow-800',
    draft: 'bg-gray-100 text-gray-800',
    kirim: 'bg-green-100 text-green-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;

// Lokasi: src/components/common/Badge.jsx
