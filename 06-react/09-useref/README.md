# useRef

**Module:** React
**Prerequisites:** [`08-useeffect-and-side-effects`](../08-useeffect-and-side-effects)

## What is it?

`useRef` creates a "box" that persists across renders, holding a mutable value — but unlike state,
changing a ref's value does **not** trigger a re-render. It's also the standard way to get a direct
reference to a real DOM element when React's usual declarative approach genuinely isn't enough.

## Why does it matter?

Not every value needs to trigger a re-render when it changes — a previous value for comparison, a
timer ID you need to clear later, or a count of renders for debugging. `useRef` provides a place to
store this kind of data without the overhead (and unwanted re-renders) `useState` would introduce.

## How does it work?

### Basic usage — a mutable value that survives renders

```jsx
import { useRef } from "react";

function Example() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return <p>This component has rendered {renderCount.current} times</p>;
}
```

`useRef(0)` returns an object with a single property, `.current`, initialized to `0`. Updating
`.current` directly (`renderCount.current += 1`) does **not** cause a re-render — unlike `setState`,
which always does. The value still persists correctly across renders, though — it just doesn't
*trigger* one.

### Accessing a real DOM element directly

```jsx
function TextInput() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
```

Passing a ref to an element's `ref` attribute gives you `.current` pointing directly at the actual
underlying DOM node — genuinely useful for things React doesn't have a declarative API for, like
manually focusing an input, measuring an element's size, or integrating with a non-React library
that needs a real DOM node.

### `useState` vs `useRef` — the key distinction

| | `useState` | `useRef` |
|---|---|---|
| Triggers re-render on change? | Yes | No |
| Value persists across renders? | Yes | Yes |
| Typical use | Anything the UI should visually reflect | Values you need to keep, but that don't affect what's rendered |

## Simple Example

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return <p>{seconds} seconds elapsed</p>;
}
```

## Let's Break It Down

- `intervalRef` holds the timer's ID, needed later to clear it — this value doesn't need to trigger
  a re-render itself (only `seconds`, updated via `setSeconds`, should do that), which is exactly
  why it belongs in a ref rather than state.
- The effect's cleanup function (`return () => clearInterval(...)`) uses `intervalRef.current` to
  correctly stop the specific timer this effect started, preventing it from continuing to run after
  the component is removed.

## Common Mistakes

- **Using `useRef` for a value that should visually update the UI** — since changing `.current`
  doesn't trigger a re-render, the displayed UI simply won't reflect the new value until something
  else happens to cause a re-render.
- **Reading `ref.current` before the referenced element has actually rendered** (e.g., during the
  initial render itself, before `useEffect` has run) — `.current` may still be `null` at that
  point.
- **Overusing refs for direct DOM manipulation** when a declarative, state-driven approach would
  work just as well — refs are meant for genuine exceptions, not a routine substitute for state.

## When Should I Use It?

Use `useRef` for values that need to persist across renders without causing the UI to update, or
for direct access to a real DOM element when React's declarative tools don't cover a specific need
(focusing, measuring, integrating a non-React library).

## Exercises

1. **(Recall)** What's the key functional difference between updating a `useState` value and
   updating a `useRef`'s `.current`?
2. **(Application)** Write a component with a button that focuses a text input when clicked, using
   `useRef`.
3. **(Problem Solving)** A developer stores a search term in a `useRef` instead of `useState`,
   expecting the displayed results to update as the user types, but nothing on screen changes.
   Explain why, and what should be used instead.

## What Should I Learn Next?

Continue to [`10-context`](../10-context) — sharing state across many components without manually
passing props through every layer in between.
