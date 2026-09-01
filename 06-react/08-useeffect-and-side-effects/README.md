# useEffect & Side Effects

**Module:** React
**Prerequisites:** [`07-forms-and-controlled-components`](../07-forms-and-controlled-components)

## What is it?

A **side effect** is anything a component does that reaches outside its normal job of "render UI
from state" — fetching data, setting up a timer, subscribing to something external. **`useEffect`**
is the Hook React provides specifically for this kind of code.

## Why does it matter?

Fetching data (something you've done constantly throughout this curriculum) doesn't fit React's
normal render model — it takes time and isn't purely about "what to display." `useEffect` is the
correctly designed place for this kind of work, with explicit control over exactly when it runs.

## How does it work?

### Basic syntax and the dependency array

```jsx
useEffect(() => {
  console.log("Runs after every render");
});

useEffect(() => {
  console.log("Runs once, after the first render only");
}, []);

useEffect(() => {
  console.log("Runs after the first render, and again whenever `count` changes");
}, [count]);
```

The second argument — the **dependency array** — controls when the effect re-runs:
- No array at all: runs after every single render (rarely what you actually want).
- Empty array `[]`: runs once, right after the component's first render — ideal for one-time setup
  like an initial data fetch.
- An array with values: re-runs whenever any listed value has changed since the last render.

### Fetching data — the standard pattern

```jsx
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch("https://api.example.com/users");
      const data = await response.json();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Why the effect's own callback can't be `async` directly

`useEffect` expects its callback to return either nothing, or a cleanup function. Marking a
function `async` makes it automatically return a Promise instead — an unconditional rule of the
`async` keyword — which doesn't match what `useEffect` expects. The fix, always: define a separate,
regular (non-`async`) function as the effect's callback, and declare an `async` function *inside*
it, calling that instead.

### Cleanup functions — for things that need to be "undone"

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timer); // cleanup, runs before the effect re-runs or the component unmounts
}, []);
```

If an effect sets something up that needs to be torn down (a timer, an external subscription),
return a function from inside the effect — React calls this automatically at the appropriate time
(before the effect runs again, or when the component is removed from the page), preventing memory
leaks or duplicate subscriptions.

### Effects that depend on props or state

```jsx
useEffect(() => {
  async function loadUser() {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    setUser(data);
  }
  loadUser();
}, [userId]);
```

Whenever `userId` changes (perhaps the user navigated to a different profile), this effect re-runs
automatically, re-fetching data for the new id — exactly the intended behavior of listing `userId`
in the dependency array.

## Simple Example

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function search() {
      setLoading(true);
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      setLoading(false);
    }
    search();
  }, [query]);

  if (loading) return <p>Searching...</p>;
  return <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>;
}
```

## Let's Break It Down

- The effect re-runs any time `query` changes, since it's listed in the dependency array — a new
  search term automatically triggers a fresh fetch.
- `loading` state, set `true` before the fetch and `false` after, drives the conditional rendering
  (from the earlier topic) showing "Searching..." during the request.
- This combines nearly everything from this module so far: state, conditional rendering, list
  rendering with keys, and now effects, into one realistic, complete component.

## Common Mistakes

- **Marking the effect's own callback function `async` directly**, instead of wrapping the async
  logic in an inner function.
- **Forgetting the dependency array entirely**, causing the effect to re-run after every single
  render — often unintentional and can cause performance problems or infinite update loops if the
  effect itself triggers a state change that causes another render.
- **Omitting a value the effect actually uses from the dependency array**, causing the effect to
  use a stale value instead of the current one on subsequent renders.
- **Forgetting cleanup functions for subscriptions/timers**, causing them to persist even after a
  component is no longer on the page.

## When Should I Use It?

Use `useEffect` for anything that needs to happen outside the normal render-from-state flow:
fetching data on mount or when specific values change, setting up/tearing down subscriptions or
timers. Avoid using it for things that can be computed directly during render.

## Exercises

1. **(Recall)** What do the three different forms of the dependency array (missing, empty, with
   values) each mean?
2. **(Understanding)** Explain precisely why `useEffect`'s callback function itself cannot be
   marked `async`.
3. **(Application)** Write a component that fetches a specific post by `postId` (a prop) whenever
   `postId` changes, showing "Loading..." while the fetch is in progress.

## What Should I Learn Next?

Continue to [`09-useref`](../09-useref) — a Hook for persisting values across renders without
triggering a re-render, and for direct DOM access when genuinely needed.
