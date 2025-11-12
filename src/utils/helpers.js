export const formatNumber = (value) =>
  new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value)

export const formatShortNumber = (value) => {
  const units = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' },
  ]

  const match = units.find((unit) => value >= unit.value)
  if (!match) return new Intl.NumberFormat('id-ID').format(value)

  const formatted = (value / match.value).toFixed(1).replace(/\.0$/, '')
  return `${formatted}${match.suffix}`
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const formatPercentage = (value, digits = 0) =>
  `${value.toFixed(digits)}%`

export const getStatusColor = (status) => {
  const normalized = status.toLowerCase()
  if (['connected', 'success', 'online', 'active', 'cleaned'].includes(normalized))
    return 'success'
  if (['pending', 'warning', 'degraded'].includes(normalized)) return 'warning'
  if (['offline', 'error', 'failed'].includes(normalized)) return 'danger'
  return 'neutral-500'
}

export const timeSince = (date) => {
  const diff = Date.now() - new Date(date).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} hari lalu`
  if (hours > 0) return `${hours} jam lalu`
  if (minutes > 0) return `${minutes} menit lalu`
  return 'Baru saja'
}

export const simulateAsync = (response, delay = 1200) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response), delay)
  })

export const randomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const getTrendDirection = (current, previous) => {
  if (current > previous) return 'up'
  if (current < previous) return 'down'
  return 'neutral'
}

export const generateActivityHeatmap = (days = 30) => {
  const today = new Date()
  return Array.from({ length: days }).map((_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - index - 1))
    return {
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 16),
    }
  })
}


