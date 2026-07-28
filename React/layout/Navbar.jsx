// ============================================
// NAVBAR
//
// WHAT: Sticky top navigation bar that shows
//       different links based on auth state
// WHEN: Every page that needs navigation
// WHY:  Centralizes navigation in one place
//
// USAGE:
// // In App.jsx
// <Navbar
//   logo="MyApp"
//   links={[
//     { to: '/dashboard', label: 'Dashboard' },
//     { to: '/products', label: 'Products' },
//   ]}
//   authLinks={{
//     login: '/login',
//     signup: '/signup',
//     dashboard: '/dashboard',
//     addItem: { to: '/add', label: '+ Add' }
//   }}
// />
//
// PROPS:
// logo      (string)   — app name shown on left
// links     (array)    — [{ to, label }] logged in links
// authLinks (object)   — { login, signup, dashboard, addItem }
// ============================================

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar({
  logo = 'App',
  links = [],
  authLinks = {
    login: '/login',
    signup: '/signup',
    dashboard: '/dashboard',
    addItem: { to: '/add', label: '+ Add' }
  }
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">{logo}</Link>

      <div className="navbar-links">
        {user ? (
          <>
            {links.map(link => (
              <Link key={link.to} to={link.to} className="navbar-link">
                {link.label}
              </Link>
            ))}
            <span className="navbar-user">
              {user.name?.split(' ')[0]}
            </span>
            {authLinks.addItem && (
              <Link to={authLinks.addItem.to} className="navbar-btn">
                {authLinks.addItem.label}
              </Link>
            )}
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={authLinks.login} className="navbar-link">
              Login
            </Link>
            <Link to={authLinks.signup} className="navbar-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar