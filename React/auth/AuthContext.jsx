// ============================================
// AUTH CONTEXT
//
// WHAT: Global auth state — user, token, login,
//       logout — available to every component
// WHEN: Every app that has user authentication
// WHY:  Avoids prop drilling auth state through
//       every component in the tree
//
// USAGE:
// // 1. Wrap app in main.jsx
// import { AuthProvider } from './context/AuthContext'
//
// <AuthProvider>
//   <App />
// </AuthProvider>
//
// // 2. Use anywhere in the app
// import { useAuth } from './context/AuthContext'
//
// function Navbar() {
//   const { user, logout } = useAuth()
//   return user ? <p>{user.name}</p> : <Link to="/login">Login</Link>
// }
//
// CUSTOMIZE:
// - Change localStorage keys if needed
// - Add more fields to login() if your API returns more
// - Add token refresh logic if needed
// ============================================

import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Restore user from localStorage on page refresh
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  // Call after successful login or signup
  const login = (userData, tokenData) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenData)
  }

  // Call to log user out
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Update user data without changing token
  // Use after profile update
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      updateUser,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — import this instead of useContext directly
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}

export default AuthContext