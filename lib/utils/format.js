export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export function formatPrice(price) {
  return Number(price).toLocaleString('ko-KR')
}

export function truncateText(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}
