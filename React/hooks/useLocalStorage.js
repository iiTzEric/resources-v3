// ============================================
// useLocalStorage
//
// WHAT: Works exactly like useState but persists
//       the value in localStorage across refreshes
// WHEN: Theme preference, saved filters, user
//       preferences, any data that should survive
//       a page refresh
// WHY:  Regular useState resets on refresh.
//       This hook keeps the value alive.
//
// USAGE:
// // Works exactly like useState
// const [theme, setTheme] = useLocalStorage('theme', 'dark')
// const [cart, setCart] = useLocalStorage('cart', [])
// const [filters, setFilters] = useLocalStorage('filters', {})
//
// // Updates state AND localStorage at the same time
// setTheme('light')
// setCart([...cart, newItem])
//
// // Remove from localStorage
// setTheme(null)  // set to null to clear
//
// PROPS:
// key          (string) — localStorage key
// initialValue (any)    — default if nothing stored yet
//
// RETURNS:
// [value, setValue] — same as useState
// ============================================

import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value

      setStoredValue(valueToStore)

      if (valueToStore === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (err) {
      console.error('useLocalStorage error:', err)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage