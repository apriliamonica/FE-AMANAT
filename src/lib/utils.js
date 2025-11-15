export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID')
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
