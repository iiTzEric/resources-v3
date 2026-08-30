// ============================================
// useFetch
//
// WHAT: Fetches data from any API endpoint
//       and manages loading, error and data states
// WHEN: Any component that needs to load data
//       from an API on mount
// WHY:  Removes repetitive useEffect + useState
//       boilerplate from every component
//
// USAGE:
// const { data, loading, error, refetch } = useFetch('/api/listings')
//
// if (loading) return <Spinner />
// if (error) return <p>{error}</p>
// return data.map(item => <Card key={item._id} {...item} />)
//
// // Refetch manually
// <button onClick={refetch}>Refresh</button>
//
// // With dependencies — refetch when id changes
// const { data } = useFetch(`/api/listings/${id}`, [id])
//
// RETURNS:
// data    (any)      — response data or null
// loading (bool)     — true while fetching
// error   (string)   — error message or null
// refetch (function) — manually trigger fetch
// ============================================

import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

function useFetch(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await api.get(url)
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await api.get(url)
        if (!cancelled) setData(res.data)
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Something went wrong')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [url, ...deps])

  return { data, loading, error, refetch: fetchData }
}

export default useFetch