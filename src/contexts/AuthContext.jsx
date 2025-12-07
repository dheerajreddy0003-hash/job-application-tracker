import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('jat_user')
    return raw ? JSON.parse(raw) : null
  })
  const navigate = useNavigate()

  const login = (email, password) => {
    const role = email === 'hrmanager@gmail.com' ? 'manager' : 'user'
    const u = { email, role }
    setUser(u)
    localStorage.setItem('jat_user', JSON.stringify(u))
    return u
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('jat_user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
