// ============================================
// LOGIN FORM
//
// WHAT: Complete login form with email,
//       password, error handling and loading
// WHEN: Any login page in any app
// WHY:  Self contained — handles its own state
//       just plug in your API endpoint
//
// USAGE:
// function LoginPage() {
//   return (
//     <div className="auth-page">
//       <LoginForm
//         apiEndpoint="/api/auth/login"
//         redirectTo="/"
//         signupPath="/signup"
//       />
//     </div>
//   )
// }
//
// PROPS:
// apiEndpoint (string) — POST endpoint, default '/api/auth/login'
// redirectTo  (string) — where to go after login, default '/'
// signupPath  (string) — link to signup page, default '/signup'
// logo        (string) — app name shown at top
// ============================================

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import api from '../../services/api'

function LoginForm({
  apiEndpoint = '/api/auth/login',
  redirectTo = '/',
  signupPath = '/signup',
  logo = 'App'
}) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect back to page they tried to visit
  const destination = location.state?.from?.pathname || redirectTo

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.post(apiEndpoint, form)
      login(res.data.user, res.data.token)
      navigate(destination, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-logo">{logo}</div>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-subtitle">Login to your account</p>

      {error && (
        <div className="auth-error">
          <span>⚠</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-fields">
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?{' '}
        <Link to={signupPath}>Sign up</Link>
      </p>
    </div>
  )
}

export default LoginForm