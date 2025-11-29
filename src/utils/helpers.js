import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SURAT_MASUK_STATUS_COLORS, SURAT_KELUAR_STATUS_COLORS } from './constants';

// Merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format tanggal Indonesia
export function formatDate(date, formatStr = 'dd MMMM yyyy') {
  if (!date) return '-';
  return format(new Date(date), formatStr, { locale: id });
}

// Format tanggal dengan jam
export function formatDateTime(date) {
  if (!date) return '-';
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: id });
}

// Format relative time (2 hari yang lalu)
export function formatRelativeTime(date) {
  if (!date) return '-';
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  });
}

// Format file size
export function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Get file extension
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

// Validate file type
export function isValidFileType(file, allowedTypes) {
  const fileType = file.type;
  return allowedTypes.some((type) => {
    if (type.endsWith('/*')) {
      return fileType.startsWith(type.slice(0, -1));
    }
    return fileType === type;
  });
}

// Truncate text
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Download file
export function downloadFile(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Copy to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// Get initials from name
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Get status badge color
export function getStatusColor(status) {
  if (!status) return 'bg-gray-100 text-gray-800';

  // Prefer explicit mappings from constants
  if (SURAT_MASUK_STATUS_COLORS[status]) return SURAT_MASUK_STATUS_COLORS[status];
  if (SURAT_KELUAR_STATUS_COLORS[status]) return SURAT_KELUAR_STATUS_COLORS[status];

  // Fallback generic set
  const colors = {
    baru: 'bg-blue-100 text-blue-800',
    diproses: 'bg-yellow-100 text-yellow-800',
    selesai: 'bg-green-100 text-green-800',
    ditolak: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || colors.pending;
}

// Get priority color
export function getPriorityColor(priority) {
  const colors = {
    rendah: 'bg-gray-100 text-gray-800',
    sedang: 'bg-blue-100 text-blue-800',
    tinggi: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };
  return colors[priority] || colors.rendah;
}
