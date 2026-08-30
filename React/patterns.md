# React Patterns

Common patterns you will use in every React project.
These solve real problems that come up again and again.

---

## 1. Container & Presentational Pattern

Separate data fetching from UI rendering.

```jsx
// ❌ Mixed — hard to reuse or test
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${userId}`).then(res => {
      setUser(res.data)
      setLoading(false)
    })
  }, [userId])

  if (loading) return <p>Loading...</p>

  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// ✅ Separated — easy to reuse and test

// Container — handles data
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${userId}`).then(res => {
      setUser(res.data)
      setLoading(false)
    })
  }, [userId])

  if (loading) return <Spinner />
  return <UserProfile user={user} />
}

// Presentational — handles UI only
function UserProfile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// UserProfile can now be used anywhere with any data
<UserProfile user={{ name: 'John', email: 'john@example.com' }} />
```

---

## 2. Compound Components Pattern

Components that work together and share state implicitly.

```jsx
// ❌ Too many props — hard to use
<Select
  options={options}
  value={value}
  onChange={onChange}
  placeholder="Select..."
  renderOption={(opt) => <span>{opt.label}</span>}
/>

// ✅ Compound components — flexible and readable
<Select value={value} onChange={onChange}>
  <Select.Trigger placeholder="Select..." />
  <Select.Options>
    {options.map(opt => (
      <Select.Option key={opt.value} value={opt.value}>
        {opt.label}
      </Select.Option>
    ))}
  </Select.Options>
</Select>

// Implementation
const SelectContext = createContext()

function Select({ value, onChange, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  )
}

Select.Trigger = function Trigger({ placeholder }) {
  const { value, isOpen, setIsOpen } = useContext(SelectContext)
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {value || placeholder}
    </button>
  )
}

Select.Options = function Options({ children }) {
  const { isOpen } = useContext(SelectContext)
  return isOpen ? <ul className="options">{children}</ul> : null
}

Select.Option = function Option({ value, children }) {
  const { onChange, setIsOpen } = useContext(SelectContext)
  return (
    <li onClick={() => { onChange(value); setIsOpen(false) }}>
      {children}
    </li>
  )
}
```

---

## 3. Render Props Pattern

Share logic by passing a function as a prop.

```jsx
// A component that tracks mouse position
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  )
}

// Use it with any UI
<MouseTracker render={({ x, y }) => (
  <p>Mouse is at {x}, {y}</p>
)} />

<MouseTracker render={({ x, y }) => (
  <div style={{ transform: `translate(${x}px, ${y}px)` }}>
    🎯
  </div>
)} />

// Children as render prop — more common
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div onMouseMove={e => setPosition({ x: e.clientX, y: e.clientY })}>
      {children(position)}
    </div>
  )
}

<MouseTracker>
  {({ x, y }) => <p>Mouse: {x}, {y}</p>}
</MouseTracker>

// Note: custom hooks often replace render props
// but render props are still useful for component-level logic
```

---

## 4. Higher Order Component (HOC) Pattern

A function that takes a component and returns
an enhanced version of it.

```jsx
// withAuth HOC — redirect if not logged in
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth()

    if (!user) {
      return <Navigate to="/login" />
    }

    return <Component {...props} />
  }
}

// Use it
const ProtectedDashboard = withAuth(Dashboard)
const ProtectedSettings = withAuth(Settings)

// withLoading HOC — show spinner while loading
function withLoading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Spinner />
    return <Component {...props} />
  }
}

const UserListWithLoading = withLoading(UserList)

<UserListWithLoading isLoading={loading} users={users} />

// Note: custom hooks are usually preferred over HOCs
// but HOCs are still used in some libraries
```

---

## 5. Custom Hook Pattern

Extract and share stateful logic.

```jsx
// Instead of repeating fetch logic in every component
// extract it into a hook

function useListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchListings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/api/listings')
      setListings(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const deleteListing = useCallback(async (id) => {
    await api.delete(`/api/listings/${id}`)
    setListings(prev => prev.filter(l => l._id !== id))
  }, [])

  return { listings, loading, error, refetch: fetchListings, deleteListing }
}

// Clean component — all logic in hook
function Dashboard() {
  const { listings, loading, error, deleteListing } = useListings()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      {listings.map(listing => (
        <ListingCard
          key={listing._id}
          listing={listing}
          onDelete={() => deleteListing(listing._id)}
        />
      ))}
    </div>
  )
}
```

---

## 6. State Initialization Patterns

```jsx
// Lazy initialization — expensive initial state
const [data, setData] = useState(() => {
  // Only runs once on mount — not on every render
  const saved = localStorage.getItem('data')
  return saved ? JSON.parse(saved) : []
})

// Initialize from props
function Component({ initialCount }) {
  // Only uses prop on first render
  const [count, setCount] = useState(initialCount)
  // ...
}

// Reset state when prop changes
function Component({ userId }) {
  const [data, setData] = useState(null)

  // Reset when userId changes
  useEffect(() => {
    setData(null)
    fetchUser(userId).then(setData)
  }, [userId])
}

// Better — use key prop to reset entire component
<UserProfile key={userId} userId={userId} />
// React unmounts and remounts when key changes
// All state resets automatically
```

---

## 7. Error Boundary Pattern

Catch JavaScript errors in component trees.

```jsx
import { Component } from 'react'

// Error boundaries must be class components
class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info)
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Wrap any part of your app
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>

// Wrap individual components for granular control
<div>
  <ErrorBoundary>
    <UserProfile />
  </ErrorBoundary>
  <ErrorBoundary>
    <ListingGrid />
  </ErrorBoundary>
</div>
```

---

## 8. Controlled vs Uncontrolled Components

```jsx
// Controlled — React controls the value
function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <input
      value={value}              // React controls value
      onChange={e => setValue(e.target.value)}
    />
  )
}
// ✅ Can validate on every keystroke
// ✅ Can disable submit until valid
// ✅ Can format as user types

// Uncontrolled — DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef(null)

  const handleSubmit = () => {
    console.log(inputRef.current.value)  // read when needed
  }

  return (
    <div>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
// ✅ Less code for simple forms
// ✅ Easier file inputs
// ❌ Harder to validate, format, disable

// Use controlled for most forms
// Use uncontrolled for file inputs and simple cases
```

---

## 9. Loading & Error States Pattern

Always handle these three states for async data.

```jsx
function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pattern 1 — Early returns
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!data) return <EmptyState />

  return <DataView data={data} />
}

// Pattern 2 — Conditional rendering
function DataComponent() {
  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && data && <DataView data={data} />}
    </div>
  )
}

// Pattern 3 — Skeleton loading
function ListingGrid() {
  const { listings, loading } = useListings()

  return (
    <div className="grid">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))
      }
    </div>
  )
}
```

---

## 10. Optimistic Updates Pattern

Update UI immediately — revert if request fails.

```jsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    // Optimistic update — update UI immediately
    setLiked(true)
    setLikes(l => l + 1)

    try {
      await api.post(`/api/posts/${postId}/like`)
      // Success — keep the optimistic update
    } catch (err) {
      // Failed — revert the optimistic update
      setLiked(false)
      setLikes(l => l - 1)
    }
  }

  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  )
}

// Delete with optimistic update
const handleDelete = async (id) => {
  // Remove from UI immediately
  const previous = items
  setItems(items.filter(item => item.id !== id))

  try {
    await api.delete(`/api/items/${id}`)
  } catch (err) {
    // Restore on failure
    setItems(previous)
    alert('Failed to delete')
  }
}
```

---

## 11. Search & Filter Pattern

```jsx
function ListingsPage() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Derived state — computed from other state
  // No need for useState — recalculates automatically
  const filtered = useMemo(() => {
    return listings
      .filter(listing => {
        const matchesSearch = listing.title
          .toLowerCase()
          .includes(search.toLowerCase())
        const matchesCategory = !category ||
          listing.category === category
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt)
        }
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  }, [listings, search, category, sortBy])

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All categories</option>
        <option value="Tech">Tech</option>
        <option value="Music">Music</option>
      </select>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A-Z</option>
      </select>

      <p>{filtered.length} results</p>

      {filtered.map(listing => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  )
}
```

---

## 12. Form Validation Pattern

```jsx
function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validate a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required'
        if (value.length < 2) return 'Name too short'
        return null

      case 'email':
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email'
        return null

      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Min 8 characters'
        return null

      default:
        return null
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    // Validate on change if field was touched
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    setErrors({ ...errors, [name]: validateField(name, value) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    const newErrors = {}
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key])
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched({ name: true, email: true, password: true })
      return
    }

    // Submit form
    submitForm(form)
  }

  const isValid = Object.keys(form).every(
    key => !validateField(key, form[key])
  )

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
        />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Sign Up
      </button>
    </form>
  )
}
```

---

## Quick Reference

| Pattern | When to use |
|---|---|
| Container/Presentational | Separate data from UI |
| Compound Components | Related components sharing state |
| Render Props | Share component-level logic |
| HOC | Enhance components with shared behavior |
| Custom Hook | Share stateful logic between components |
| Error Boundary | Catch and handle render errors |
| Optimistic Updates | Instant UI feedback for async actions |
| Skeleton Loading | Better UX while data loads |
| Search & Filter | Derived state from user input |
| Form Validation | Validate on blur, submit |