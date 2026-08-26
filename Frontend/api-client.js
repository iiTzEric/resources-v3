const API_URL = globalThis.API_URL || 'http://localhost:3000'

let token = null

export function setToken(value) {
  token = value
}

export function clearToken() {
  token = null
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (options.body !== undefined) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const body = response.status === 204 ? {} : await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(body.message || `Request failed with status ${response.status}`)
  }

  return body
}

export const api = {
  get: path => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  delete: path => request(path, { method: 'DELETE' })
}
