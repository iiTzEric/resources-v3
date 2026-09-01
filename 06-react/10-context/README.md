# Context (useContext)

**Module:** React
**Prerequisites:** [`09-useref`](../09-useref)

## What is it?

**Context** lets data be shared across many components at different depths in the tree, without
manually passing it down through every layer as props — avoiding what's called **prop drilling**.

## Why does it matter?

As component trees grow deeper, passing a piece of data through several layers of components that
don't actually use it themselves (just to reach a deeply nested one that does) becomes genuinely
awkward and error-prone. Context solves this directly.

## How does it work?

### The problem: prop drilling

```jsx
function App() {
  const [theme, setTheme] = useState("light");
  return <Page theme={theme} />;
}

function Page({ theme }) {
  // Page doesn't use theme itself, just passes it along
  return <Navbar theme={theme} />;
}

function Navbar({ theme }) {
  return <p>Current theme: {theme}</p>;
}
```

`Page` is forced to accept and pass along a prop it never actually uses, purely so `Navbar` can
reach it. In a real app with many layers, this becomes messy fast.

### The fix — create, provide, consume

**Step 1: create a context**

```jsx
import { createContext } from "react";
const ThemeContext = createContext();
```

**Step 2: provide a value, wrapping the components that need access**

```jsx
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**Step 3: consume it, anywhere inside the Provider, at any depth**

```jsx
import { useContext } from "react";

function Navbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}
```

`Page` no longer needs to know or care about `theme` at all — it becomes a plain pass-through
component again:

```jsx
function Page() {
  return <Navbar />;
}
```

### Providing multiple values

```jsx
<ThemeContext.Provider value={{ theme, setTheme }}>
  <Page />
</ThemeContext.Provider>
```

Passing an object lets you share both a value and its setter — genuinely common once consuming
components need to both read and update the shared value.

### When context is (and isn't) the right tool

Context is genuinely useful for **global-ish** data that many components at different depths need:
current user, theme, a shared favorites list. For data only shared between a parent and its
*direct* child, plain props remain simpler and are usually the better choice — reaching for context
by default, even when a prop would do, adds unnecessary indirection.

## Simple Example

```jsx
const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </AuthContext.Provider>
  );
}

function Dashboard() {
  return <Header />; // doesn't touch AuthContext at all
}

function Header() {
  const { user } = useContext(AuthContext);
  return <p>{user ? `Welcome, ${user.name}` : "Please log in"}</p>;
}
```

## Let's Break It Down

- `App` owns the actual `user` state and wraps everything below it in `AuthContext.Provider`.
- `Dashboard` is a pure pass-through — it renders `Header` with no props, and has no awareness that
  `AuthContext` even exists.
- `Header`, despite being two levels deep, reaches directly into `AuthContext` via `useContext` and
  renders based on the current `user` value — exactly the "skip the layers that don't need it"
  behavior context is designed for.

## Common Mistakes

- **Reaching for context for every piece of shared state**, even when a direct parent-to-child prop
  would be simpler — context adds a layer of indirection that isn't always warranted.
- **Forgetting to wrap the components that need access in the actual `Provider`** — a component
  outside the `Provider` calling `useContext` will get the context's default value (often
  `undefined`), not the intended shared value.
- **Creating a new object literal directly in the `value` prop on every render**
  (`value={{ user, setUser }}`) without considering performance implications in larger apps — a more
  advanced concern, but worth being aware of as apps grow (each render creates a new object,
  potentially causing more re-renders in consuming components than necessary).

## When Should I Use It?

Use context for data that's genuinely needed by many components at varying depths — current user,
theme, language/locale, a shared cart or favorites list. Prefer plain props for anything only
shared between a direct parent and child.

## Exercises

1. **(Recall)** What problem does context solve that plain props don't handle well?
2. **(Application)** Set up a `LanguageContext` providing a `language` value from `App`, consumed by
   a deeply nested `Footer` component with at least one pass-through component in between.
3. **(Problem Solving)** A component calls `useContext(SomeContext)` and gets `undefined` even
   though the value was clearly set somewhere in `App`. What's the most likely structural mistake?

## What Should I Learn Next?

Continue to [`11-custom-hooks`](../11-custom-hooks) — extracting and reusing stateful logic across
multiple components.
