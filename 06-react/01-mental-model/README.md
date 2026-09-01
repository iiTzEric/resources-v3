# The React Mental Model

**Module:** React
**Prerequisites:** [`03-javascript`](../../03-javascript), [`05-web-fundamentals`](../../05-web-fundamentals)

## What is it?

React is a library for building user interfaces around one core idea: you describe *what the UI
should look like for a given state*, and React figures out how to update the actual page to match,
rather than you manually finding and mutating DOM elements yourself.

## Why does it matter?

This is a genuine paradigm shift from the DOM manipulation you learned in the JavaScript module —
understanding *why* React works this way, not just its syntax, is what lets the rest of this module
click into place rather than feeling like arbitrary rules to memorize.

## Mental Model

Compare your old approach (imperative — describing *how*, step by step) to React's approach
(declarative — describing *what*):

**Imperative (vanilla JS)**: "Find the button. Add a click listener. When clicked, find the
heading. Change its text directly."

**Declarative (React)**: "The heading's text is whatever `message` currently is. When the button
is clicked, update `message`." You never touch the heading directly — you update the underlying
data, and describe what the UI should show for that data; React handles making the actual page
match.

## How does it work?

### The problem with manual DOM manipulation at scale

Your vanilla JS User Directory app worked, but every single UI update required you to personally
write the exact DOM manipulation code: find the element, set its `innerHTML`, remember to update
it again if the underlying data changed elsewhere. As an application grows, keeping every piece of
the UI perfectly in sync with the underlying data, by hand, becomes genuinely difficult to manage
correctly.

### React's core idea: UI as a function of state

```
UI = f(state)
```

Read this as: "what's on screen is entirely determined by the current state." Change the state,
and React re-runs your component function to figure out what the UI *should* look like now, then
efficiently updates only the parts of the actual DOM that actually changed.

### Components — the basic unit of a React UI

```jsx
function Greeting() {
  return <h1>Hello, world!</h1>;
}
```

A **component** is a function that returns a description of UI (using JSX, covered next). You
compose a whole application out of components, nested inside each other — exactly analogous to how
you compose a program out of functions.

### Re-rendering — what actually happens when state changes

When a component's state changes, React re-runs that component's function, gets the new
description of what the UI should look like, compares it to what's currently on screen, and
applies only the minimal necessary changes to the real DOM. You write code as if the whole
component "re-renders from scratch" every time — React's internal efficiency is what makes that
mental simplicity actually performant in practice.

## Simple Example

Conceptually contrasting both approaches for the same feature — a button that changes displayed
text:

```javascript
// Imperative (vanilla JS) — you did this earlier in your own project work
const heading = document.querySelector("h1");
const button = document.querySelector("button");
button.addEventListener("click", function() {
  heading.textContent = "You clicked the button!";
});
```

```jsx
// Declarative (React)
function App() {
  const [message, setMessage] = useState("Hello");
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("You clicked the button!")}>Click</button>
    </div>
  );
}
```

## Let's Break It Down

- In the vanilla JS version, you personally find the heading and directly mutate it — the update
  logic lives entirely in the event handler.
- In the React version, the `<h1>`'s content is simply `{message}` — whatever `message` currently
  is. Clicking the button doesn't touch the `<h1>` at all; it updates `message` via `setMessage`,
  and React re-renders the component, at which point the `<h1>` naturally reflects the new value,
  since it was always described as "whatever `message` is."
- This is the actual paradigm shift: you stop thinking about "how do I update this specific
  element" and start thinking about "what should this component look like, given its current
  state."

## Common Mistakes

- **Trying to directly manipulate the DOM inside a React component** (e.g., `document.
  querySelector` to change something React is already managing) — this fights against React's own
  update mechanism and can cause confusing, inconsistent behavior.
- **Expecting React's mental model to feel intuitive immediately** — the shift from imperative to
  declarative thinking genuinely takes some practice; expect early confusion as a normal part of
  the transition, not a sign you're doing something wrong.

## When Should I Use It?

Reach for React (or a similar declarative UI approach) once an interface has meaningful, changing
state that affects multiple parts of the UI — the more interconnected the updates, the more this
approach pays off compared to manual DOM manipulation.

## Exercises

1. **(Recall)** In your own words, what does "UI is a function of state" mean?
2. **(Understanding)** Explain the practical difference between imperative and declarative UI
   code, using the button/heading example.
3. **(Application)** Describe (in plain English, no code needed) how you'd approach building a
   counter that increases by 1 on each click, using React's declarative mental model rather than
   direct DOM manipulation.

## What Should I Learn Next?

Continue to [`02-jsx`](../02-jsx) — the syntax React uses to actually describe what a component's
UI should look like.
