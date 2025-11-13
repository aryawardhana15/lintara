import { useEffect, useState } from 'react'

const getInitialValue = () => {
  if (typeof window === 'undefined') return false
  const stored = window.localStorage.getItem('sync-ln-theme')
  if (stored) return stored === 'dark'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(getInitialValue)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem('sync-ln-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return [isDark, setIsDark]
}

