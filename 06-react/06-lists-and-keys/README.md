# Lists & Keys

**Module:** React
**Prerequisites:** [`05-conditional-rendering`](../05-conditional-rendering)

## What is it?

Rendering a list in React means using `.map()` (from your JavaScript array methods) to transform an
array of data into an array of JSX elements. **`key`** is a special prop React requires on each
item, helping it track which element is which across re-renders.

## Why does it matter?

Rendering lists of data — search results, products, comments — is one of the most common things a
real React app does. `key` specifically prevents subtle, hard-to-diagnose bugs when a list's
contents change (items added, removed, reordered).

## How does it work?

### The basic pattern

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

`{}` drops into JavaScript, `.map()` transforms the array of user objects into an array of `<li>`
elements, which React renders in place.

### Why `key` is required, and what it's actually for

React uses `key` to match up list items between renders — "is this the same logical item as
before, or a new one?" Without stable, unique keys, React falls back to comparing items by
position, which can cause real bugs: incorrect elements retaining state, unnecessary re-renders, or
items appearing to "jump" incorrectly when the list is reordered or filtered.

```jsx
{users.map(user => (
  <li key={user.id}>{user.name}</li>  // correct — a real, stable, unique id
))}
```

```jsx
{users.map((user, index) => (
  <li key={index}>{user.name}</li>   // risky — works, but breaks if list order changes
))}
```

Using the array **index** as a key technically satisfies React's requirement and works fine for
lists that never reorder or have items added/removed from the middle — but for anything that can
change order (search results, sortable lists, filtered lists), index-based keys can cause React to
misattribute state or content to the wrong item after a reorder. **Always prefer a real, stable,
unique identifier from the data itself** (like a database id) over the array index, whenever one is
available.

### `key` goes on the outermost element returned inside `.map()`

```jsx
{users.map(user => (
  <UserCard key={user.id} user={user} />  // key here, on UserCard itself
))}
```

Not buried somewhere inside `UserCard`'s own returned JSX — it needs to be on the element
*directly* produced by each iteration of `.map()`.

### Filtering and mapping together — a common combination

```jsx
function ActiveUserList({ users }) {
  return (
    <ul>
      {users
        .filter(user => user.isActive)
        .map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

Since `.filter()` and `.map()` are ordinary array methods, chaining them inside JSX works exactly
as it does anywhere else in JavaScript.

## Simple Example

```jsx
function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }
  return (
    <div className="grid">
      {products.map(product => (
        <div key={product.id} className="card">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Let's Break It Down

- An early return handles the empty-list case, following the conditional rendering pattern from the
  previous topic.
- `.map()` transforms each product object into a `<div>` card — `key={product.id}` uses a real,
  stable identifier from the actual data, not the array position.
- This combination (early return for empty state, `.map()` for the populated case) is a genuinely
  common, reusable shape for list-rendering components.

## Common Mistakes

- **Omitting `key` entirely** — React will warn about this in the console, and it's a sign of a real
  problem waiting to happen once the list's order or contents change.
- **Using array index as `key` for lists that can reorder, filter, or have items removed from the
  middle** — a common source of subtle, hard-to-diagnose bugs (wrong item's state persisting after
  a reorder).
- **Placing `key` on the wrong element** — inside a nested child, rather than on the top-level
  element returned by each `.map()` iteration.

## When Should I Use It?

Always provide a `key` when rendering a list — use a real, stable, unique value from your data
whenever available. Reserve index-based keys for genuinely static lists that will never reorder,
filter, or have items removed from anywhere but the very end.

## Exercises

1. **(Recall)** What is `key` used for, and why does using array index as `key` become risky for
   reorderable lists specifically?
2. **(Application)** Given an array of comment objects (each with `id` and `text`), write a
   component that renders them as a list with proper keys.
3. **(Problem Solving)** A sortable list of tasks starts showing the wrong "completed" checkbox
   state on the wrong tasks after sorting. Diagnose the likely cause related to `key`.

## What Should I Learn Next?

Continue to [`07-forms-and-controlled-components`](../07-forms-and-controlled-components) — tying
form inputs directly to state.
