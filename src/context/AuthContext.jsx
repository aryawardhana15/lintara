import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DEFAULT_USER = {
  name: 'Lintara Admin',
  email: 'admin@gov.id',
  role: 'government_admin',
}

const storageKey = 'lintara-user'

const getStoredUser = () => {
  if (typeof window === 'undefined') return DEFAULT_USER
  try {
    const stored = window.localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : DEFAULT_USER
  } catch (error) {
    console.warn('Unable to parse stored user, fallback to default.', error)
    return DEFAULT_USER
  }
}

const AuthContext = createContext({
  user: DEFAULT_USER,
  role: DEFAULT_USER.role,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey, JSON.stringify(user))
  }, [user])

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? DEFAULT_USER.role,
      login: (payload) =>
        setUser((prev) => ({
          ...prev,
          ...payload,
        })),
      logout: () => setUser(DEFAULT_USER),
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

