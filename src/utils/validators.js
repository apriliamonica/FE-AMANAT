// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation (Indonesia)
export function isValidPhone(phone) {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
}

// NIK validation (16 digit)
export function isValidNIK(nik) {
  return /^[0-9]{16}$/.test(nik);
}

// Required field validation
export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

// Min length validation
export function minLength(value, min) {
  if (typeof value === 'string') {
    return value.length >= min;
  }
  return false;
}

// Max length validation
export function maxLength(value, max) {
  if (typeof value === 'string') {
    return value.length <= max;
  }
  return false;
}

// File size validation (in MB)
export function isValidFileSize(file, maxSizeMB) {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

// Allowed file types validation
export function isAllowedFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type);
}
