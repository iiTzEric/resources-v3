// ============================================
// SIGNUP FORM
//
// WHAT: Complete signup form with name, email,
//       password, error handling and loading
// WHEN: Any signup/register page in any app
// WHY:  Self contained — handles its own state
//       just plug in your API endpoint
//
// USAGE:
// function SignupPage() {
//   return (
//     <div className="auth-page">
//       <SignupForm
//         apiEndpoint="/api/auth/signup"
//         redirectTo="/login"
//         loginPath="/login"
//       />
//     </div>
//   )
// }
//
// PROPS:
// apiEndpoint (string) — POST endpoint, default '/api/auth/signup'
// redirectTo  (string) — where to go after signup, default '/login'
// loginPath   (string) — link to login page, default '/login'
// logo        (string) — app name shown at top
// ============================================

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

function SignupForm({
  apiEndpoint = '/api/auth/signup',
  redirectTo = '/login',
  loginPath = '/login',
  logo = 'App'
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic validation
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      await api.post(apiEndpoint, form)
      navigate(redirectTo)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-logo">{logo}</div>
      <h1 className="auth-title">Create account</h1>
      <p className="auth-subtitle">Start building today</p>

      {error && (
        <div className="auth-error" role="alert">
          <span>⚠</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-fields">
        <div className="auth-field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            autoComplete="name"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
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
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link to={loginPath}>Login</Link>
      </p>
    </div>
  )
}

export default SignupForm