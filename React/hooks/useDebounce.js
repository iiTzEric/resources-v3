// ============================================
// useDebounce
//
// WHAT: Delays updating a value until the user
//       stops typing for a specified amount of time
// WHEN: Search inputs, autocomplete, any input
//       that triggers an API call on change
// WHY:  Without debounce every keystroke fires
//       an API call — wasteful and slow.
//       Debounce waits until user pauses.
//
// USAGE:
// const [search, setSearch] = useState('')
// const debouncedSearch = useDebounce(search, 500)
//
// // API call only fires when user stops typing
// useEffect(() => {
//   if (debouncedSearch) fetchResults(debouncedSearch)
// }, [debouncedSearch])
//
// <input
//   value={search}
//   onChange={e => setSearch(e.target.value)}
//   placeholder="Search..."
// />
//
// PROPS:
// value (any)    — the value to debounce
// delay (number) — milliseconds to wait, default 500
//
// RETURNS:
// debouncedValue — the delayed value
// ============================================

import { useState, useEffect } from 'react'

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel timer if value changes before delay ends
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce