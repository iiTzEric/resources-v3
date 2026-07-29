# React Basics

React from the very beginning.
Everything explained simply with real examples.

---

## 1. What is React?

React is a JavaScript library for building user interfaces.
It was created by Facebook and is now the most popular
frontend library in the world.

```
Traditional websites:
- Server sends HTML page
- User clicks → new HTML page loads
- Full page reload every time

React (Single Page Application):
- Server sends one HTML file
- React updates only what changed
- No full page reloads — feels like an app
```

**Why React?**
- Component based — build small pieces, combine them
- Declarative — describe what you want, React figures out how
- Fast — only updates what changed (Virtual DOM)
- Huge ecosystem — tools, libraries, community

---

## 2. Setup

```bash
# Create a new React app with Vite (recommended)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**Project structure:**
```
my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx       ← main component
│   ├── App.css
│   ├── main.jsx      ← entry point
│   └── index.css
├── index.html
└── package.json
```

---

## 3. JSX

JSX is HTML-like syntax inside JavaScript.
React uses it to describe what the UI looks like.

```jsx
// JSX looks like HTML
const element = <h1>Hello World</h1>

// But it is actually JavaScript
const element = React.createElement('h1', null, 'Hello World')

// JSX rules:
// 1. Must have one root element
function Bad() {
  return (
    <h1>Hello</h1>
    <p>World</p>   // Error — two root elements
  )
}

function Good() {
  return (
    <div>          // one root element
      <h1>Hello</h1>
      <p>World</p>
    </div>
  )
}

// Use fragment to avoid extra div
function Better() {
  return (
    <>             // fragment — renders nothing extra
      <h1>Hello</h1>
      <p>World</p>
    </>
  )
}

// 2. Use className instead of class
<div className="card">...</div>

// 3. Self-close tags with no children
<input type="text" />
<img src="photo.jpg" alt="photo" />
<br />

// 4. JavaScript goes inside curly braces
const name = 'John'
const age = 25

<h1>{name}</h1>
<p>{age}</p>
<p>{2 + 2}</p>
<p>{name.toUpperCase()}</p>
<p>{age >= 18 ? 'Adult' : 'Minor'}</p>

// 5. Comments in JSX
<div>
  {/* This is a JSX comment */}
  <p>Hello</p>
</div>
```

---

## 4. Components

A component is a JavaScript function that returns JSX.
Everything in React is a component.

```jsx
// Function component — always start with capital letter
function Greeting() {
  return <h1>Hello World</h1>
}

// Arrow function component
const Greeting = () => {
  return <h1>Hello World</h1>
}

// Short arrow function
const Greeting = () => <h1>Hello World</h1>

// Use a component like an HTML tag
function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}
```

**Rules:**
```
1. Component name MUST start with capital letter
   <greeting /> — React treats as HTML tag
   <Greeting /> — React treats as component

2. Must return JSX (or null to render nothing)

3. Keep components small and focused
   One component = one job
```

---

## 5. Props

Props are how you pass data from parent to child.
Like function arguments for components.

```jsx
// Define what props the component accepts
function ProfileCard({ name, bio, age }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{bio}</p>
      <span>{age} years old</span>
    </div>
  )
}

// Pass props like HTML attributes
function App() {
  return (
    <ProfileCard
      name="John Doe"
      bio="Guitar teacher"
      age={25}
    />
  )
}

// Strings use quotes, everything else uses {}
<Component
  title="Hello"          // string
  count={42}             // number
  isActive={true}        // boolean
  skills={['React']}     // array
  user={{ name: 'John' }} // object
  onClick={handleClick}   // function
/>

// Default props
function Button({ label = 'Click me', color = 'blue' }) {
  return <button style={{ color }}>{label}</button>
}

// Spread props
const props = { name: 'John', age: 25 }
<ProfileCard {...props} />

// Children prop — content between tags
function Card({ children }) {
  return <div className="card">{children}</div>
}

<Card>
  <h2>Title</h2>
  <p>Content goes here</p>
</Card>
```

---

## 6. useState

useState lets React remember values between renders.
When state changes, the component re-renders.

```jsx
import { useState } from 'react'

function Counter() {
  // [currentValue, functionToUpdate] = useState(initialValue)
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Common state patterns

// Boolean state
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(!isOpen)

// String state
const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />

// Array state
const [items, setItems] = useState([])
const addItem = (item) => setItems([...items, item])
const removeItem = (id) => setItems(items.filter(i => i.id !== id))

// Object state
const [user, setUser] = useState({ name: '', email: '' })
const updateName = (name) => setUser({ ...user, name })

// Form state — one object for all fields
const [form, setForm] = useState({ name: '', email: '', password: '' })
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}

// Rules of useState:
// 1. Only call at the top level — not inside loops or conditions
// 2. Only call inside React components or custom hooks
// 3. Never mutate state directly — always use the setter
```

---

## 7. useEffect

useEffect runs code after the component renders.
Use it for side effects — fetching data, subscriptions, timers.

```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered')
  })

  // Runs only once — on mount
  useEffect(() => {
    console.log('Component mounted')
  }, [])  // empty dependency array

  // Runs when userId changes
  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [userId])  // re-runs when userId changes

  // Cleanup — runs before next effect or unmount
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick')
    }, 1000)

    return () => clearInterval(timer)  // cleanup
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>No user found</p>

  return <h1>{user.name}</h1>
}

// Common useEffect patterns

// Fetch data on mount
useEffect(() => {
  api.get('/api/listings')
    .then(res => setListings(res.data))
}, [])

// Fetch data when id changes
useEffect(() => {
  api.get(`/api/listings/${id}`)
    .then(res => setListing(res.data))
}, [id])

// Update document title
useEffect(() => {
  document.title = `${count} items`
}, [count])

// Listen to window events
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

---

## 8. Event Handling

```jsx
// Click event
function Button() {
  const handleClick = () => {
    console.log('clicked')
  }

  return <button onClick={handleClick}>Click me</button>
}

// Inline handler
<button onClick={() => console.log('clicked')}>Click</button>

// Pass arguments
<button onClick={() => handleDelete(item.id)}>Delete</button>

// Form events
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault()  // prevent page reload
    console.log('submitted')
  }

  const handleChange = (e) => {
    console.log(e.target.value)  // input value
    console.log(e.target.name)   // input name
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="email" />
      <button type="submit">Submit</button>
    </form>
  )
}

// Common events
onClick        // button, div, any element
onChange       // input, select, textarea
onSubmit       // form
onFocus        // input gets focus
onBlur         // input loses focus
onMouseEnter   // hover start
onMouseLeave   // hover end
onKeyDown      // key pressed
onKeyUp        // key released
onScroll       // element scrolled
```

---

## 9. Conditional Rendering

```jsx
const isLoggedIn = true
const user = { name: 'John' }
const items = []

// if statement
function Greeting() {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>
  }
  return <h1>Please log in</h1>
}

// Ternary — inline if/else
<div>
  {isLoggedIn ? <UserMenu /> : <LoginButton />}
</div>

// Short circuit — show if true
<div>
  {isLoggedIn && <UserMenu />}
  {!isLoggedIn && <LoginButton />}
</div>

// Nullish coalescing — show default
<h1>{user?.name ?? 'Guest'}</h1>

// Return null to render nothing
function Alert({ message }) {
  if (!message) return null
  return <div className="alert">{message}</div>
}

// Complex conditions
{items.length === 0 ? (
  <p>No items yet</p>
) : (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)}
```

---

## 10. Lists and Keys

```jsx
const fruits = ['apple', 'banana', 'cherry']
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

// Render a list with map
function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}

// Always add key prop — must be unique among siblings
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}

// Why keys?
// React uses keys to track which items changed
// Without keys React re-renders everything
// With keys React only updates what changed

// Key rules:
// 1. Must be unique among siblings
// 2. Should be stable — same item = same key
// 3. Use id from data — not index if list can change

// Using index as key — only ok if list never reorders
{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>  // ok if list is static
))}
```

---

## 11. Forms

```jsx
import { useState } from 'react'

function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // One handler for all inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    // prevent page reload
    setLoading(true)
    try {
      await login(form)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <input
        type="email"
        name="email"           // matches state key
        value={form.email}     // controlled input
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
```

---

## 12. Component Lifecycle

```
Mount    → component appears on screen
Update   → state or props change
Unmount  → component removed from screen

useEffect(() => {
  // Mount — runs once when component appears

  return () => {
    // Unmount — cleanup when component disappears
  }
}, [])

useEffect(() => {
  // Update — runs when dependency changes
}, [dependency])
```

---

## 13. Lifting State Up

When two components need the same state,
move it to their closest common parent.

```jsx
// ❌ Wrong — each has its own count
function CounterA() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

function CounterB() {
  const [count, setCount] = useState(0)
  return <p>Count: {count}</p>  // different from CounterA
}

// ✅ Correct — share state through parent
function Parent() {
  const [count, setCount] = useState(0)  // lifted up

  return (
    <>
      <CounterA count={count} onIncrement={() => setCount(count + 1)} />
      <CounterB count={count} />
    </>
  )
}

function CounterA({ count, onIncrement }) {
  return <button onClick={onIncrement}>{count}</button>
}

function CounterB({ count }) {
  return <p>Count: {count}</p>
}
```

---

## 14. Common Mistakes

```jsx
// 1. Mutating state directly
const [items, setItems] = useState([1, 2, 3])

// ❌ Wrong — mutates state directly
items.push(4)
setItems(items)

// ✅ Correct — create new array
setItems([...items, 4])

// 2. Missing key in lists
// ❌ Wrong
items.map(item => <li>{item}</li>)

// ✅ Correct
items.map(item => <li key={item.id}>{item.name}</li>)

// 3. Calling hooks conditionally
// ❌ Wrong
if (isLoggedIn) {
  const [data, setData] = useState(null)  // Error
}

// ✅ Correct — always call hooks at top level
const [data, setData] = useState(null)
if (!isLoggedIn) return null

// 4. Forgetting dependency array
// ❌ Wrong — runs after every render
useEffect(() => {
  fetchData()
})

// ✅ Correct — runs once on mount
useEffect(() => {
  fetchData()
}, [])

// 5. Stale closure in useEffect
const [count, setCount] = useState(0)

// ❌ Wrong — count is always 0 inside
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1)  // count is stale
  }, 1000)
  return () => clearInterval(timer)
}, [])

// ✅ Correct — use functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1)  // always uses latest value
  }, 1000)
  return () => clearInterval(timer)
}, [])
```