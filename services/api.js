// ============================================
// API SERVICE
//
// WHAT: Pre-configured axios instance that
//       automatically attaches the auth token
//       to every request
// WHEN: Every project that has a backend API
// WHY:  One place to configure base URL and
//       auth headers — no repetition
//
// USAGE:
// import api from '../services/api'
//
// // GET
// const res = await api.get('/api/listings')
//
// // POST
// const res = await api.post('/api/listings', { title, description })
//
// // PUT
// const res = await api.put(`/api/listings/${id}`, data)
//
// // DELETE
// await api.delete(`/api/listings/${id}`)
//
// SETUP:
// 1. Create .env file:
//    VITE_API_URL=http://localhost:5000
//
// 2. Change localStorage key if needed:
//    localStorage.getItem('token')
//    ↑ match whatever key you use in AuthContext
// ============================================

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 — token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api