# Performance

**Module:** React
**Prerequisites:** [`16-error-handling`](../16-error-handling)

## What is it?

This topic covers why unnecessary re-renders happen in React, and the main tools for avoiding them
when they genuinely matter: `React.memo`, `useMemo`, and `useCallback`.

## Why does it matter?

React re-renders can happen more often than expected once components are deeply nested and state
changes frequently. For most apps, this is genuinely fine — React is fast, and premature
optimization adds real complexity for little benefit. Understanding *when* it actually matters (and
when it doesn't) is the important skill here, more than memorizing the specific APIs.

## How does it work?

### Why a component re-renders

A component re-renders when: its own state changes, its parent re-renders (by default, **every**
child re-renders when its parent does, regardless of whether that child's own props actually
changed), or context it consumes changes.

### `React.memo` — skip re-rendering if props haven't actually changed

```jsx
const ProductCard = React.memo(function ProductCard({ name, price }) {
  console.log("Rendering ProductCard");
  return <div>{name}: ${price}</div>;
});
```

`React.memo` wraps a component so React compares its new props against its previous props — if
they're the same (a shallow comparison), React skips re-rendering it, even if its parent
re-rendered. Genuinely useful for components that render often with the exact same props, but
unnecessary for components that are cheap to render anyway.

### `useMemo` — avoid recalculating an expensive value unnecessarily

```jsx
const expensiveResult = useMemo(() => {
  return computeSomethingExpensive(data);
}, [data]);
```

Without `useMemo`, `computeSomethingExpensive(data)` would re-run on *every* render, even if `data`
hasn't changed since the last one. `useMemo` caches the result, only recalculating when a listed
dependency actually changes — directly parallel in spirit to `useEffect`'s dependency array, but for
computing a value rather than running a side effect.

### `useCallback` — avoid recreating a function unnecessarily

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

Every render normally creates a brand-new function instance for any function defined inside a
component — usually harmless, but relevant specifically when that function is passed as a prop to
a `React.memo`-wrapped child: a "new" function reference (even if functionally identical) counts as
"changed props" for the memo comparison, defeating its purpose. `useCallback` keeps the same
function reference across renders unless its dependencies change, preserving the benefit of
`React.memo` on the receiving component.

### The important caveat: don't optimize prematurely

These tools add real complexity (extra dependency arrays to maintain correctly, more code to read)
for a performance benefit that, for most components, is genuinely negligible. The general guidance:
**write normal, straightforward React first. Only reach for `memo`/`useMemo`/`useCallback` once you
have a real, measured performance problem** — a component you can observably see re-rendering too
often, causing an actual noticeable slowdown — not as a defensive habit applied everywhere by
default.

## Simple Example

```jsx
function ProductList({ products, onAddToCart }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
      ))}
    </div>
  );
}

const ProductCard = React.memo(function ProductCard({ product, onAdd }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product.id)}>Add</button>
    </div>
  );
});
```

## Let's Break It Down

- `ProductCard` is wrapped in `React.memo`, meaning it only re-renders if its specific `product` or
  `onAdd` props actually change — useful if `ProductList` re-renders frequently for unrelated
  reasons (e.g., a search box elsewhere causing `ProductList`'s parent to re-render) while the
  individual `product` data for most cards hasn't changed.
- If `onAddToCart` were recreated fresh on every render of whatever renders `ProductList` (a very
  common default), it would defeat `ProductCard`'s `memo` optimization for the `onAdd` prop
  specifically — this is exactly the scenario `useCallback` (wrapping `onAddToCart`'s definition,
  higher up) would address, if this optimization were genuinely needed.

## Common Mistakes

- **Wrapping every component in `React.memo` by default**, adding complexity without a measured
  performance benefit in most cases.
- **Using `useMemo`/`useCallback` everywhere "just in case"**, rather than in response to an
  actual, observed performance issue.
- **Forgetting that `React.memo`'s benefit is defeated by passing a fresh function or object as a
  prop on every render**, without also using `useCallback`/`useMemo` for that specific prop.

## When Should I Use It?

Reach for these tools only after observing a genuine performance problem — a component you can see
re-rendering unnecessarily and expensively (using React's own DevTools profiler, or simple
`console.log` placement to observe render frequency), not as a default, defensive habit applied to
every component.

## Exercises

1. **(Recall)** Under what circumstances does a child component re-render, even if its own props
   haven't changed?
2. **(Understanding)** Explain why wrapping a component in `React.memo` alone might not prevent
   unnecessary re-renders if it receives a function prop.
3. **(Application)** Describe a realistic scenario in an app you might build where `React.memo`
   would genuinely help, and one where it would be unnecessary overhead.

## What Should I Learn Next?

Continue to [`18-accessibility`](../18-accessibility) — making React applications usable by
everyone, including people using assistive technology.
