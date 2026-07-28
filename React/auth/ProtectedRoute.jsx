// ============================================
// PROTECTED ROUTE
//
// WHAT: Wraps a route and redirects to login
//       if the user is not authenticated
// WHEN: Any page that requires login
//       Dashboard, Settings, Profile, etc.
// WHY:  Prevents logged out users accessing
//       private pages on the frontend
//
// USAGE:
// <Route path="/dashboard" element={
//   <ProtectedRoute>
//     <Dashboard />
//   </ProtectedRoute>
// } />
//
// // Custom redirect path
// <Route path="/admin" element={
//   <ProtectedRoute redirectTo="/login">
//     <Admin />
//   </ProtectedRoute>
// } />
//
// PROPS:
// children    (node)   — the protected page
// redirectTo  (string) — where to redirect, default '/login'
// ============================================

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Save the page they tried to visit
    // so we can redirect back after login
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute