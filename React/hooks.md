# React Hooks

Every built-in React hook explained with
real examples and when to use each one.

---

## What are Hooks?

Hooks are functions that let you use React features
inside function components.

```
Before hooks (2019): had to use class components
After hooks:         function components can do everything

Rules:
1. Only call hooks at the TOP LEVEL of a component
2. Only call hooks inside React FUNCTION COMPONENTS
   or custom hooks
3. Never call inside loops, conditions or nested functions
```

---

## 1. useState

Store and update values in a component.

```jsx
import { useState } from 'react'

// Syntax
const [value, setValue] = useState(initialValue)

// Examples
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [user, setUser] = useState(null)
const [items, setItems] = useState([])

// Updating state
setCount(5)                    // set to value
setCount(count + 1)            // use current value
setCount(c => c + 1)           // functional update — safer

// Updating objects — always spread first
const [user, setUser] = useState({ name: '', age: 0 })
setUser({ ...user, name: 'John' })  // update one field

// Updating arrays
const [items, setItems] = useState([])
setItems([...items, newItem])           // add
setItems(items.filter(i => i.id !== id)) // remove
setItems(items.map(i => i.id === id ? {...i, done: true} : i)) // update

// Lazy initial state — function runs only once
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem('data')) || []
})
```

---

## 2. useEffect

Run side effects after render.

```jsx
import { useEffect } from 'react'

// Run after every render
useEffect(() => {
  console.log('rendered')
})

// Run once on mount
useEffect(() => {
  fetchData()
}, [])

// Run when dependency changes
useEffect(() => {
  fetchUser(userId)
}, [userId])

// Cleanup on unmount
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [])

// Real patterns

// Fetch data
useEffect(() => {
  let cancelled = false

  async function load() {
    setLoading(true)
    try {
      const res = await api.get('/api/listings')
      if (!cancelled) setListings(res.data)
    } catch (err) {
      if (!cancelled) setError(err.message)
    } finally {
      if (!cancelled) setLoading(false)
    }
  }

  load()
  return () => { cancelled = true }  // cleanup
}, [])

// Update document title
useEffect(() => {
  document.title = `${unreadCount} unread messages`
}, [unreadCount])

// Event listener
useEffect(() => {
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleKey)
  return () => document.removeEventListener('keydown', handleKey)
}, [onClose])

// LocalStorage sync
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

---

## 3. useContext

Share state across components without prop drilling.

```jsx
import { createContext, useContext, useState } from 'react'

// Step 1 — Create context
const AuthContext = createContext()

// Step 2 — Create provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3 — Create custom hook for easy access
export function useAuth() {
  return useContext(AuthContext)
}

// Step 4 — Wrap app with provider
function main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

// Step 5 — Use anywhere in the tree
function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}

// When to use context:
// ✅ Auth state — user, token
// ✅ Theme — dark/light mode
// ✅ Language — i18n
// ✅ Shopping cart
// ❌ Data that only one component needs — use useState
// ❌ Frequently changing data — causes too many re-renders
```

---

## 4. useRef

Access DOM elements or store values without re-rendering.

```jsx
import { useRef, useEffect } from 'react'

// Two uses:

// Use 1 — Access DOM elements
function SearchInput() {
  const inputRef = useRef(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleClear = () => {
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}

// Use 2 — Store value without re-rendering
function Timer() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

// Use 3 — Track previous value
function Component({ value }) {
  const prevValue = useRef(value)

  useEffect(() => {
    prevValue.current = value
  })

  return (
    <p>
      Current: {value}, Previous: {prevValue.current}
    </p>
  )
}

// Key difference from useState:
// useState — changing value triggers re-render
// useRef   — changing value does NOT trigger re-render
```

---

## 5. useMemo

Cache expensive calculations.

```jsx
import { useMemo } from 'react'

// Without useMemo — recalculates on every render
function ProductList({ products, category }) {
  // Runs even when other state changes
  const filtered = products.filter(p => p.category === category)

  return filtered.map(p => <ProductCard key={p.id} product={p} />)
}

// With useMemo — only recalculates when dependencies change
function ProductList({ products, category }) {
  const filtered = useMemo(() => {
    return products.filter(p => p.category === category)
  }, [products, category])  // only re-runs when these change

  return filtered.map(p => <ProductCard key={p.id} product={p} />)
}

// More examples
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0)
}, [items])

const sortedUsers = useMemo(() => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name))
}, [users])

// When to use useMemo:
// ✅ Expensive calculations — sorting, filtering large lists
// ✅ Referential equality — object/array passed as prop
// ❌ Simple calculations — useMemo costs more than it saves
// ❌ Premature optimization — only when you notice slowness
```

---

## 6. useCallback

Cache functions to prevent unnecessary re-renders.

```jsx
import { useCallback } from 'react'

// Without useCallback — new function on every render
function Parent() {
  const [count, setCount] = useState(0)

  const handleClick = () => {   // new function every render
    console.log('clicked')
  }

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <Child onClick={handleClick} />  // Child re-renders every time
    </>
  )
}

// With useCallback — same function reference
function Parent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])  // never changes

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <Child onClick={handleClick} />  // Child only re-renders if handleClick changes
    </>
  )
}

// Common pattern — with dependencies
const handleDelete = useCallback((id) => {
  setItems(items => items.filter(item => item.id !== id))
}, [])  // setItems is stable so no dependency needed

// When to use useCallback:
// ✅ Function passed as prop to memoized child component
// ✅ Function used as useEffect dependency
// ❌ Every function — adds complexity without benefit
```

---

## 7. useReducer

Manage complex state with actions — like Redux but built in.

```jsx
import { useReducer } from 'react'

// Define initial state
const initialState = {
  items: [],
  loading: false,
  error: null
}

// Define reducer — pure function that returns new state
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload }

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    default:
      return state
  }
}

// Use in component
function ItemList() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    api.get('/api/items')
      .then(res => dispatch({ type: 'FETCH_SUCCESS', payload: res.data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }))
  }, [])

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id })
  }

  if (state.loading) return <p>Loading...</p>
  if (state.error) return <p>{state.error}</p>

  return (
    <ul>
      {state.items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

// When to use useReducer vs useState:
// useState    — simple values, independent state
// useReducer  — complex state, multiple related values,
//               next state depends on previous state
```

---

## 8. useLayoutEffect

Like useEffect but fires synchronously after DOM updates.

```jsx
import { useLayoutEffect, useRef } from 'react'

// Runs BEFORE browser paints — use for DOM measurements
function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null)

  useLayoutEffect(() => {
    const target = targetRef.current.getBoundingClientRect()
    const tooltip = tooltipRef.current

    // Position tooltip above target
    tooltip.style.top = `${target.top - tooltip.offsetHeight}px`
    tooltip.style.left = `${target.left}px`
  }, [text])

  return <div ref={tooltipRef} className="tooltip">{text}</div>
}

// When to use:
// useEffect       — almost always — data fetching, subscriptions
// useLayoutEffect — DOM measurements, animations that need exact position
```

---

## 9. Custom Hooks

Extract reusable stateful logic into your own hooks.

```jsx
// Custom hook — always starts with 'use'
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api.get(url)
      .then(res => {
        if (!cancelled) {
          setData(res.data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Use it anywhere
function Listings() {
  const { data, loading, error } = useFetch('/api/listings')

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return data.map(listing => <ListingCard key={listing._id} {...listing} />)
}

// More custom hook examples

// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}

// useToggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle, setValue]
}

// useDebounce
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

// useClickOutside
function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback])
}

// Use custom hooks to:
// ✅ Share logic between components
// ✅ Keep components clean and focused
// ✅ Test logic independently
// ✅ Abstract complex useEffect patterns
```

---

## Quick Reference

| Hook | Use for |
|---|---|
| `useState` | Simple values that trigger re-render |
| `useEffect` | Side effects — fetch, subscribe, timers |
| `useContext` | Share state without prop drilling |
| `useRef` | DOM access or values without re-render |
| `useMemo` | Cache expensive calculations |
| `useCallback` | Cache functions passed as props |
| `useReducer` | Complex state with multiple actions |
| `useLayoutEffect` | DOM measurements before paint |
| Custom hooks | Reusable stateful logic |