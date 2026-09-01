# State Management At Scale

**Module:** React
**Prerequisites:** [`12-component-composition`](../12-component-composition)

## What is it?

This topic covers strategies for organizing state as an application grows: deciding where state
should live, "lifting state up" when siblings need to share it, and a brief, honest look at when
Context alone starts to feel insufficient, and external state libraries enter the picture.

## Why does it matter?

Where state lives is one of the most consequential structural decisions in a growing React app.
Getting it wrong (state too high, too low, or duplicated across components) leads to bugs like UI
getting out of sync, or components re-rendering far more than necessary.

## How does it work?

### The default rule: keep state as close as possible to where it's used

If only one component needs a piece of state, it should live in that component, via `useState` —
no need to reach for anything more complex.

### Lifting state up — when siblings need to share data

```jsx
function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <ProductList onSelect={setSelectedProduct} />
      <ProductDetails product={selectedProduct} />
    </div>
  );
}
```

`ProductList` and `ProductDetails` are siblings — neither can directly access the other's state.
The solution is **lifting state up**: move the shared state to their common parent (`App`), and pass
it down as props to both — `ProductList` receives a function to *update* the state (`onSelect`),
and `ProductDetails` receives the current *value* (`product`). This is a plain-props pattern, not
Context — appropriate here since the sharing is only between two direct, nearby components.

### When plain props (even lifted) start to feel insufficient

As an app grows, state that needs to reach many components at very different depths (not just two
nearby siblings) starts to make prop-passing genuinely cumbersome — this is exactly the scenario
Context (from the earlier topic) addresses.

### When even Context starts to feel insufficient

For genuinely large, complex applications with many interconnected pieces of shared state, some
teams reach for a dedicated **state management library** — Redux and Zustand are two well-known
examples. These provide more structured tools for managing complex state updates, debugging state
changes over time, and organizing logic that touches many parts of an app's state at once.

This curriculum doesn't teach a specific library in depth — the important takeaway at this stage is
recognizing the **progression**: local `useState` → lifted state via props → Context → (only if
genuinely needed) a dedicated state library. Reaching for the most powerful tool by default,
before feeling the actual pain the simpler tools cause, adds unnecessary complexity.

### A concrete signal that state might be in the wrong place

If you find yourself passing the same prop through three or more layers of components that don't
use it themselves, that's a strong, concrete signal to either lift the state to a more appropriate
common ancestor, or introduce Context — not necessarily a sign you need an external library yet.

## Simple Example

```jsx
function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <div>
      <ProductList onAddToCart={addToCart} />
      <CartSummary items={cart} />
    </div>
  );
}
```

## Let's Break It Down

- `cart` lives in `App`, the closest common ancestor of both `ProductList` (which adds items) and
  `CartSummary` (which displays them) — neither sibling holds its own separate copy of this data.
- `addToCart` is passed down to `ProductList` so it can trigger updates; the resulting `cart` array
  is passed down to `CartSummary` so it can display the current state.
- Using spread (`[...cart, product]`) rather than mutating `cart` directly follows the same
  non-mutation practice from the JavaScript Arrays/Memory Basics topics — essential in React, since
  mutating state directly can cause React to miss that a re-render is needed.

## Common Mistakes

- **Lifting state higher than necessary "just in case"**, when only a small, local part of the tree
  actually needs it — this can cause unrelated components to re-render more than needed.
- **Duplicating the same piece of state in multiple components** instead of lifting it to one shared
  location, causing them to drift out of sync with each other.
- **Reaching for an external state library before genuinely needing one**, adding real complexity
  to a problem local state or Context could still solve comfortably.

## When Should I Use It?

Start with local `useState`. Lift state to a common parent when two or more nearby components need
to share it. Reach for Context once state needs to travel through many unrelated layers. Consider a
dedicated state management library only once an application's shared state has grown genuinely
complex and hard to reason about with Context alone.

## Exercises

1. **(Recall)** What does "lifting state up" mean, and when is it the appropriate solution?
2. **(Understanding)** Explain the progression of state management tools this topic describes, and
   the signal that suggests moving to the next one.
3. **(Application)** Two sibling components, a `FilterPanel` and a `ResultsList`, both need access
   to a shared `filters` object. Describe where that state should live and how it should be passed.

## What Should I Learn Next?

Continue to [`14-data-fetching-patterns`](../14-data-fetching-patterns) — handling loading, error,
and race-condition concerns properly when fetching data.
