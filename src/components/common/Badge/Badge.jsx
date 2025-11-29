import { cn } from '../../../utils/helpers';
import {
  SURAT_MASUK_STATUS_COLORS,
  SURAT_KELUAR_STATUS_COLORS,
  PRIORITAS_COLORS,
} from '../../../utils/constants';

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    baru: 'bg-blue-100 text-blue-800',
    ditolak: 'bg-red-100 text-red-800',
    // prioritas (rendah/sedang/tinggi/urgent)
    ...PRIORITAS_COLORS,
    // surat masuk statuses
    ...SURAT_MASUK_STATUS_COLORS,
    // surat keluar statuses
    ...SURAT_KELUAR_STATUS_COLORS,
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
