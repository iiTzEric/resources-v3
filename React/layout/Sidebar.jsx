// ============================================
// SIDEBAR
//
// WHAT: Collapsible sidebar with navigation
//       links, user info and logout
// WHEN: Protected pages — dashboard, settings,
//       any app-like page
// WHY:  Better UX than top nav for app pages
//
// USAGE:
// // In App.jsx — add before page component
// <Route path="/dashboard" element={
//   <ProtectedRoute>
//     <Sidebar
//       items={[
//         { to: '/dashboard', icon: '📋', label: 'Dashboard' },
//         { to: '/settings', icon: '⚙️', label: 'Settings' },
//       ]}
//     />
//     <Dashboard />
//   </ProtectedRoute>
// } />
//
// PROPS:
// items  (array) — [{ to, icon, label }] nav items
// logo   (string) — app name, default 'App'
// ============================================

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Sidebar({ items = [], logo = 'App' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <>
      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="/" onClick={() => setIsOpen(false)}>
            {logo}
          </Link>
        </div>

        {/* User info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-name">{user.name}</span>
            <span className="sidebar-email">{user.email}</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {items.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${
                location.pathname === item.to ? 'active' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon && (
                <span className="sidebar-icon">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button className="sidebar-logout" onClick={handleLogout}>
          <span>⎋</span>
          <span>Logout</span>
        </button>

      </aside>
    </>
  )
}

export default Sidebar