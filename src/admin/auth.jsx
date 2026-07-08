/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, tokenStore } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  // Start in "loading" only if there's a token to verify; otherwise we're
  // immediately settled (logged out), avoiding a synchronous setState here.
  const [loading, setLoading] = useState(() => !!tokenStore.get())

  // On mount, if a token exists, verify it and load the admin profile.
  useEffect(() => {
    let active = true
    if (!tokenStore.get()) return undefined
    api
      .me()
      .then((res) => active && setAdmin(res.admin))
      .catch(() => active && tokenStore.clear())
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await api.login(email, password)
    tokenStore.set(res.token)
    setAdmin(res.admin)
    return res.admin
  }, [])

  const logout = useCallback(() => {
    tokenStore.clear()
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
