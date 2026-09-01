# State & Events (useState)

**Module:** React
**Prerequisites:** [`03-components-and-props`](../03-components-and-props)

## What is it?

**State** is data a component "remembers" between renders, which can change over time — component
memory. **`useState`** is the Hook that gives a component this capability, and updating state is
what triggers React to re-render and reflect the new value on screen.

## Why does it matter?

This is the mechanism that replaces manual DOM manipulation entirely — instead of finding an
element and changing it directly, you update state, and React handles reflecting that change in
the actual rendered output.

## How does it work?

### Declaring state

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```

`useState(0)` creates a piece of state starting at `0`, and returns an array (destructured
immediately, same pattern from your JS destructuring work): the current value (`count`), and a
function to update it (`setCount`).

### Why you must use the setter function, never modify state directly

```jsx
count = count + 1;      // WRONG — does nothing React notices
setCount(count + 1);      // correct — tells React "this changed, re-render"
```

React only knows to re-render when you call the setter function. Directly reassigning the state
variable doesn't trigger anything — React has no way of knowing the value changed, since it's just
a regular variable from JavaScript's perspective outside of the setter call.

### Each component instance has its own independent state

```jsx
function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}
```

Each `<Counter />` here maintains its own separate `count` — clicking one's button has zero effect
on the other's. This mirrors the closures topic from JavaScript: each "instance" gets its own
private state.

### Updating state based on the previous value — the safer pattern

```jsx
setCount(count + 1);              // works, but can be unreliable in rapid updates
setCount(prev => prev + 1);        // safer — always uses the true latest value
```

When a new state value depends on the previous one, passing a function to the setter (rather than
a computed value directly) guarantees you're building on the actual latest state, avoiding subtle
bugs that can occur when multiple state updates happen in quick succession.

### Handling events

```jsx
<button onClick={() => setCount(count + 1)}>Add</button>
<input onChange={(e) => setSearchTerm(e.target.value)} />
```

Event handlers are passed as props directly (`onClick`, `onChange`), using the same `event.target`
pattern from vanilla JS DOM events — React's event system wraps the browser's native events, but
the core mental model is identical.

## Simple Example

```jsx
function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked!" : "Like"}
    </button>
  );
}
```

## Let's Break It Down

- `liked` starts as `false`. The button's text is directly derived from this state: `{liked ? ... :
  ...}`.
- Clicking calls `setLiked(!liked)` — flipping the boolean — which triggers React to re-render this
  component, and the button's text updates automatically to match the new `liked` value.
- Notice the component never manually touches the button's text — it's always described as
  "whatever matches the current `liked` state," exactly the declarative pattern from the mental
  model topic.

## Common Mistakes

- **Directly mutating the state variable** instead of calling its setter function — this silently
  does nothing from React's perspective.
- **Reading a stale value of state inside a rapid sequence of updates**, instead of using the
  functional updater form (`setCount(prev => prev + 1)`) when the new value depends on the previous
  one.
- **Expecting state updates to happen synchronously/immediately** — state updates trigger a
  re-render, but the actual variable itself doesn't change value mid-function; you'll see the new
  value on the *next* render, not immediately after calling the setter within the same function call.

## When Should I Use It?

Use `useState` for any value that changes over time and should cause the UI to update when it
does — form input values, toggles, counters, lists that grow/shrink. If a value never changes after
being set, it doesn't need to be state — a plain variable or prop is sufficient.

## Exercises

1. **(Recall)** What does `useState` return, and what does each part of that return value do?
2. **(Understanding)** Explain why directly modifying a state variable doesn't cause a re-render,
   while calling its setter function does.
3. **(Application)** Build a `Toggle` component with a button that switches between displaying "ON"
   and "OFF" each time it's clicked.

## What Should I Learn Next?

Continue to [`05-conditional-rendering`](../05-conditional-rendering) — showing different UI
depending on the current state.
