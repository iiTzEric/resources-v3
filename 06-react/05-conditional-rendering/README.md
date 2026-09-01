# Conditional Rendering

**Module:** React
**Prerequisites:** [`04-state-and-events`](../04-state-and-events)

## What is it?

Conditional rendering means showing different UI depending on the current state or props — using
ordinary JavaScript conditional logic directly within JSX, since JSX expressions are just
JavaScript.

## Why does it matter?

Almost every real component needs to display differently depending on some condition — logged in
vs. not, loading vs. loaded, empty vs. populated. There's no special React syntax for this; it's
entirely built from the conditional expressions you already know.

## How does it work?

### The ternary operator — the most common pattern

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```

### `&&` for "render this, or nothing"

```jsx
function Notification({ hasNewMessages }) {
  return (
    <div>
      {hasNewMessages && <p>You have new messages!</p>}
    </div>
  );
}
```

If `hasNewMessages` is `false`, the `&&` short-circuits (from the JavaScript Operators topic) and
the whole expression evaluates to `false` — which React simply doesn't render anything for. If
`true`, the right side (the JSX) renders.

**A genuine gotcha**: if the left side of `&&` is `0` (not `false`, an actual number zero), React
will render the literal text `0` on the page, since `0` is falsy but not `undefined`/`null`/
`false` — the specific values React chooses not to render anything for:

```jsx
{count && <p>You have {count} items</p>}
// if count is 0, this renders "0" on the page — a common, real bug
{count > 0 && <p>You have {count} items</p>}
// safer — explicitly produces a real boolean
```

### Early returns for entirely different UI

```jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>No user found.</p>;
  }
  return <h1>{user.name}</h1>;
}
```

When a component's different states genuinely produce entirely different markup (not just a small
inline difference), an early `return` inside the function body is often clearer than cramming
everything into one large ternary.

### `if`/`else` assigning to a variable before returning

```jsx
function StatusBadge({ status }) {
  let label;
  if (status === "active") {
    label = "Active";
  } else if (status === "pending") {
    label = "Pending";
  } else {
    label = "Inactive";
  }
  return <span className="badge">{label}</span>;
}
```

Useful when there are more than two possibilities, which would make a nested ternary hard to read.

## Simple Example

```jsx
function Cart({ items }) {
  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }
  return (
    <div>
      <p>{items.length} item(s) in cart</p>
      {items.length > 5 && <p>You qualify for free shipping!</p>}
    </div>
  );
}
```

## Let's Break It Down

- An empty cart returns entirely different, simpler markup via an early return — no reason to
  render the rest of the component's normal structure for this case.
- Once past that check, `items.length > 5 && ...` conditionally shows an extra message only when
  relevant — using an explicit comparison (`> 5`, producing a real boolean) rather than a bare
  truthy/falsy number, avoiding the `0`-renders-as-text gotcha.

## Common Mistakes

- **Using `count && <Component />` where `count` could be `0`**, accidentally rendering a literal
  "0" on the page instead of nothing.
- **Nesting ternaries several levels deep**, producing JSX that's genuinely hard to read — an early
  return or an intermediate variable is usually clearer once there are more than two real outcomes.
- **Forgetting that `null` is a valid thing for a component to return** — `return null;` renders
  nothing at all, a legitimate, common pattern for "sometimes this component shows nothing."

## When Should I Use It?

Use a ternary for simple, two-way choices inline within JSX. Use `&&` for "show this, or nothing"
(with an explicit boolean condition, not a raw number). Use early returns or an intermediate
variable once there are more than two distinct outcomes, or the different cases produce
substantially different markup.

## Exercises

1. **(Recall)** What specific values does React choose not to render anything for?
2. **(Understanding)** Explain why `{count && <p>Items: {count}</p>}` can produce an unwanted "0" on
   the page, and how to fix it.
3. **(Application)** Write a component that shows "Loading..." if a `loading` prop is `true`, an
   error message if an `error` prop is set, and the actual data otherwise.

## What Should I Learn Next?

Continue to [`06-lists-and-keys`](../06-lists-and-keys) — rendering collections of data as
repeated UI elements.
