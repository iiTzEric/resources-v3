# Data Fetching Patterns

**Module:** React
**Prerequisites:** [`13-state-management`](../13-state-management)

## What is it?

This topic goes beyond the basic `useEffect` fetch pattern to cover handling it *properly*: loading
and error states, and **race conditions** — a genuine, common bug where fetches can resolve out of
order.

## Why does it matter?

Your earlier `useFetch` example fetched data, but a production-quality version needs to handle:
what the user sees while waiting, what happens if the request fails, and — a subtler issue — what
happens if the component re-fetches (e.g., a search query changes) before the previous fetch has
even finished.

## How does it work?

### Loading and error states — the complete picture

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to load user");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}
```

Three explicit states — `loading`, `error`, and the actual `user` data — each rendered
appropriately, matching the conditional rendering patterns from earlier in this module.

### The race condition problem

```jsx
useEffect(() => {
  async function search() {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data); // PROBLEM: what if a newer search already started?
  }
  search();
}, [query]);
```

Imagine a user types "a", triggering a fetch, then quickly types "ap" before the first fetch
finishes, triggering a second fetch. If the *first* fetch (for "a") happens to resolve *after* the
second one (for "ap") — entirely possible over a real network, where response times vary — the
first fetch's `setResults` call would overwrite the second one's more recent, correct results with
stale data. This is a genuine, common bug, not a rare edge case.

### The fix — a cleanup flag

```jsx
useEffect(() => {
  let ignore = false;

  async function search() {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    if (!ignore) {
      setResults(data);
    }
  }
  search();

  return () => {
    ignore = true;
  };
}, [query]);
```

Each time the effect re-runs (because `query` changed), the *previous* effect's cleanup function
runs first, setting that specific `ignore` flag to `true`. If that older fetch resolves afterward,
it checks its own `ignore` flag, sees it's `true`, and skips calling `setResults` — preventing the
stale, out-of-order response from overwriting newer results. This is a genuinely subtle but real
pattern worth understanding, not just copying.

### Why this matters practically

This is precisely the kind of bug that's invisible during casual testing (typing slowly, one clean
request at a time) but appears in real usage once users type at natural speed, or on slower/variable
network conditions — exactly the gap between "works in my simple test" and "works reliably in
production" that professional software engineering care is meant to close.

## Simple Example

```jsx
function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    let ignore = false;
    async function search() {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      if (!ignore) setResults(data);
    }
    search();
    return () => { ignore = true; };
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}
```

## Let's Break It Down

- An early `return` inside the effect handles the empty-query case, avoiding an unnecessary fetch.
- The `ignore` flag protects against exactly the race condition described above — as the user types
  quickly, only the most recent, still-relevant fetch's results actually get applied to state.

## Common Mistakes

- **Ignoring race conditions entirely**, assuming fetches always resolve in the order they were
  started — network timing makes no such guarantee.
- **Not resetting `error`/`loading` state at the start of a new fetch attempt**, causing a stale
  error message to linger visually even after a subsequent, successful fetch.
- **Forgetting the `finally` block** to reliably turn off a loading indicator regardless of
  success or failure.

## When Should I Use It?

Apply the full loading/error/cleanup pattern for any fetch triggered by something that can change
quickly or repeatedly (search inputs, filters) — for a genuinely one-time fetch on mount with no
re-fetching, the simpler pattern from the `useEffect` topic is sufficient.

## Exercises

1. **(Recall)** What causes a race condition in data fetching, concretely?
2. **(Understanding)** Explain how the `ignore` flag pattern prevents a stale response from
   overwriting more recent results.
3. **(Application)** Add proper loading and error handling to a basic fetch-on-mount component that
   currently has neither.

## What Should I Learn Next?

Continue to [`15-routing`](../15-routing) — building multi-page React applications with React
Router.
