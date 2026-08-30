// ============================================
// useAsync
//
// WHAT: Runs any async function and manages
//       its loading, error and data states
// WHEN: Any async operation triggered by user
//       action — button click, form submit, etc.
// WHY:  Cleaner than managing loading/error
//       state manually for every async action
//
// USAGE:
// const { execute, loading, error, data } = useAsync(
//   async (id) => {
//     const res = await api.delete(`/api/items/${id}`)
//     return res.data
//   }
// )
//
// // Call it
// <button
//   onClick={() => execute(item.id)}
//   disabled={loading}
// >
//   {loading ? 'Deleting...' : 'Delete'}
// </button>
//
// {error && <p>{error}</p>}
//
// PROPS:
// asyncFn (function) — the async function to wrap
//
// RETURNS:
// execute (function) — call this to run asyncFn
// loading (bool)     — true while running
// error   (string)   — error message or null
// data    (any)      — resolved value or null
// reset   (function) — clear error and data
// ============================================

import { useState, useCallback } from 'react'

function useAsync(asyncFn) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFn(...args)
      setData(result)
      return result
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [asyncFn])

  const reset = () => {
    setError(null)
    setData(null)
  }

  return { execute, loading, error, data, reset }
}

export default useAsync