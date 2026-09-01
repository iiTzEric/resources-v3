# Custom Hooks

**Module:** React
**Prerequisites:** [`10-context`](../10-context)

## What is it?

A **custom hook** is a regular JavaScript function, conventionally named starting with `use`, that
packages up reusable stateful logic — built from the built-in hooks you already know (`useState`,
`useEffect`, etc.) — so it can be shared across multiple components.

## Why does it matter?

Without custom hooks, reusing stateful logic (like a data-fetching pattern) across multiple
components means either copy-pasting the same `useState`/`useEffect` code repeatedly, or awkwardly
restructuring components to share it. Custom hooks solve this cleanly, the same way a regular
function extracts and reuses any other repeated logic.

## How does it work?

### The pattern you've already repeated — extracted into a hook

Recall the fetch pattern you've now used many times:

```jsx
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch("https://api.example.com/users");
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    load();
  }, []);

  // ... render using data and loading
}
```

Extracted into a custom hook:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    load();
  }, [url]);

  return { data, loading };
}
```

Now any component can reuse this entire pattern in one line:

```jsx
function UserList() {
  const { data: users, loading } = useFetch("https://api.example.com/users");

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function PostList() {
  const { data: posts, loading } = useFetch("https://api.example.com/posts");
  // same reusable logic, different URL
}
```

### Why custom hooks work — they're just regular functions using other hooks

There's no special mechanism here — `useFetch` is an ordinary JavaScript function. The `use`
naming convention exists so React's tooling (and other developers) can recognize it follows React's
rules for hooks (like being able to call other hooks inside it), but structurally, it's exactly the
same "extract repeated logic into a reusable function" principle from the Fundamentals Functions
lesson, just specifically packaging up *stateful* React logic.

### Rules of hooks — apply to custom hooks too

- Only call hooks at the top level of a component or another hook — never inside loops,
  conditions, or nested functions.
- Only call hooks from React components or other custom hooks — not from regular JavaScript
  functions.

These rules exist because React relies on hooks being called in the exact same order on every
render to correctly match up state between renders — breaking this ordering (by calling a hook
conditionally, for instance) can cause genuinely confusing bugs.

## Simple Example

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  function toggle() {
    setValue(v => !v);
  }
  return [value, toggle];
}

function Accordion() {
  const [isOpen, toggleOpen] = useToggle();
  return (
    <div>
      <button onClick={toggleOpen}>{isOpen ? "Collapse" : "Expand"}</button>
      {isOpen && <p>Content here</p>}
    </div>
  );
}
```

## Let's Break It Down

- `useToggle` packages up a common pattern — a boolean that flips — into a genuinely reusable hook,
  returning both the value and a function to flip it, mirroring `useState`'s own array-return
  convention.
- `Accordion` uses it exactly like a built-in hook, with no awareness that it's custom — this is
  precisely the point: custom hooks integrate seamlessly alongside React's own hooks.

## Common Mistakes

- **Not naming custom hooks starting with `use`**, which breaks React's tooling assumptions and
  hides that hook-calling rules apply to this function.
- **Calling a hook conditionally** inside a custom hook (e.g., inside an `if` block) — violates the
  rules of hooks and can cause React to lose track of state correctly across renders.
- **Extracting logic into a custom hook prematurely**, before it's actually needed in more than one
  place — like any abstraction, it's often clearer to wait until real duplication appears before
  extracting it.

## When Should I Use It?

Extract a custom hook once you notice the same stateful logic (state plus effects, typically)
repeated across two or more components. For logic used in only one place, keeping it directly in
the component is simpler and avoids premature abstraction.

## Exercises

1. **(Recall)** What naming convention do custom hooks follow, and why does it matter?
2. **(Application)** Write a `useLocalStorage(key, initialValue)` custom hook that behaves like
   `useState`, but also persists its value to `localStorage`.
3. **(Problem Solving)** A custom hook calls `useState` inside an `if` block, conditionally.
   Explain what rule this violates and why it can cause bugs.

## What Should I Learn Next?

Continue to [`12-component-composition`](../12-component-composition) — structuring components to
work well together as an application grows.
