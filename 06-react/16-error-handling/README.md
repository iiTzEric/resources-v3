# Error Handling In React

**Module:** React
**Prerequisites:** [`15-routing`](../15-routing)

## What is it?

This topic covers handling errors gracefully within a React component tree — both the errors
you've already handled inside individual components (fetch failures, from the Data Fetching
Patterns topic) and **Error Boundaries**, a React-specific mechanism for catching rendering errors
that would otherwise crash the entire application.

## Why does it matter?

Without any error handling, one broken component (throwing an error during render, perhaps due to
unexpected data) can crash the *entire* React application, showing a blank white screen to users.
Error Boundaries prevent this from cascading, containing the damage to a smaller part of the UI.

## How does it work?

### Errors you've already been handling — inside event handlers and effects

```jsx
async function handleSubmit() {
  try {
    await saveData();
  } catch (error) {
    setErrorMessage(error.message);
  }
}
```

`try`/`catch` around async operations (fetches, event handlers) works exactly as covered in the
JavaScript module — this handles errors that occur *during* an operation, and you display the
result via ordinary state and conditional rendering.

### Error Boundaries — catching errors during rendering itself

Error Boundaries specifically catch errors that occur *while React is rendering* a component (not
inside event handlers or async code, which need their own `try`/`catch` as shown above). They must
currently be written as class components (one of the few remaining places classes are still
required in modern React, since there's no hook equivalent yet):

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

If `Dashboard` (or anything inside it) throws during rendering, `ErrorBoundary` catches it,
`hasError` becomes `true`, and the fallback UI renders instead of a blank crashed page — critically,
this containment means the rest of the application outside `ErrorBoundary` (a navbar, a sidebar)
can remain functional even if one section fails.

### What Error Boundaries do NOT catch

- Errors inside event handlers (use `try`/`catch` there directly, as shown above).
- Errors inside `useEffect`/async code (same — handle with `try`/`catch`).
- Errors during server-side rendering.

Error Boundaries specifically catch errors thrown *during the render phase* — this distinction
matters, since it's a common misconception that they catch everything.

### Placing Error Boundaries strategically

```jsx
function App() {
  return (
    <div>
      <Navbar />
      <ErrorBoundary>
        <ProductList />
      </ErrorBoundary>
      <ErrorBoundary>
        <RecommendationsWidget />
      </ErrorBoundary>
    </div>
  );
}
```

Wrapping distinct sections separately means a failure in `RecommendationsWidget` doesn't take down
`ProductList` or `Navbar` — a more resilient structure than one giant boundary around the entire
app, which would still show a completely blank page on any single failure anywhere.

## Simple Example

```jsx
function ProductPrice({ product }) {
  // if product is ever null/undefined, this throws during render
  return <p>${product.price.toFixed(2)}</p>;
}

function App() {
  return (
    <ErrorBoundary>
      <ProductPrice product={someProductThatMightBeUndefined} />
    </ErrorBoundary>
  );
}
```

## Let's Break It Down

- If `product` is ever `undefined`, `product.price` throws a `TypeError` *during rendering* — a
  scenario `try`/`catch` in an event handler wouldn't help with at all, since nothing here is inside
  an event handler.
- Wrapping `ProductPrice` in `ErrorBoundary` ensures this specific failure shows a fallback message
  instead of crashing the whole page — while a real fix would also involve guarding against
  `product` being undefined in the first place (e.g., optional chaining or a conditional check), the
  boundary provides a safety net for cases that slip through.

## Common Mistakes

- **Assuming Error Boundaries catch every kind of error**, including ones inside event handlers or
  async code — they specifically only catch render-phase errors.
- **Wrapping the entire app in a single Error Boundary**, meaning any single failure anywhere blanks
  out the whole application, rather than containing damage to a smaller section.
- **Relying on Error Boundaries as a substitute for actually validating data and handling expected
  failure cases** (like a missing field) — boundaries are a safety net for the unexpected, not a
  replacement for the deliberate error handling covered in the Data Fetching Patterns topic.

## When Should I Use It?

Use `try`/`catch` for errors inside event handlers and async operations, exactly as you've done
throughout this curriculum. Add Error Boundaries around distinct sections of your UI as an
additional safety net against unexpected render-phase errors, especially around sections dealing
with data whose shape you don't fully control.

## Exercises

1. **(Recall)** What specific category of errors do Error Boundaries catch, and what do they not
   catch?
2. **(Understanding)** Explain why wrapping several independent sections of an app in separate
   Error Boundaries is generally better than one boundary around the whole app.
3. **(Application)** Sketch (in plain English or pseudocode) how you'd structure Error Boundaries
   around a page with a navbar, a main content area, and a sidebar widget.

## What Should I Learn Next?

Continue to [`17-performance`](../17-performance) — avoiding unnecessary re-renders and
understanding when optimization is actually worth applying.
