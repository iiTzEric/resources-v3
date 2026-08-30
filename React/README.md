# React

See also: [`components/`](./components/README.md) for specific, ready-to-use component patterns with full examples.

## What React actually is

**What:** A JavaScript library for building UI out of small, reusable pieces called components.

**Why:** In vanilla JS, you'd manually write a `render()` function to wipe and rebuild the DOM whenever data changed. React automates that: you describe *what the UI should look like given the current data*, and React figures out the minimal DOM changes needed.

**When:** Any UI with meaningful interactivity or repeated structure (lists, forms, dashboards) benefits from React over hand-written DOM code.

---

## JSX

**What:** A syntax extension that lets you write HTML-like markup inside JavaScript.

**Why:** Keeps markup and the logic that drives it side-by-side, instead of split across HTML/JS files.

**When:** Every React component's return value.

**How:**
```jsx
function Greeting() {
  const name = 'Alex';
  return <h1>Hello, {name}!</h1>;  // {} embeds real JS expressions
}
```

**Rules that trip people up:**
- `class` → `className`, `for` → `htmlFor` (JSX names avoid JS reserved words)
- Every component must return **one** root element (or use a fragment `<>...</>` to group without adding an extra DOM node)
- Self-closing tags need the slash: `<img />`, not `<img>`

---

## Components

**What:** A JS function that returns JSX. The basic building block of a React app.

**Why:** Breaks UI into independent, reusable, testable pieces.

**When:** Any time a piece of UI is reused, or a section is complex enough to deserve its own name.

**How:**
```jsx
function TaskItem({ title, completed }) {
  return (
    <li>
      <span>{title}</span>
      {completed && <span> ✓</span>}
    </li>
  );
}

// used elsewhere:
<TaskItem title="Buy milk" completed={true} />
```

---

## Props

**What:** Data passed *into* a component from its parent — read-only.

**Why:** Lets a parent component configure a child without the child needing to know where the data came from.

**When:** Any time a component needs data or configuration from outside itself.

**How:**
```jsx
function TaskItem(props) {
  return <li>{props.title}</li>;
}
// or, destructured (much more common):
function TaskItem({ title }) {
  return <li>{title}</li>;
}
```

**Common mistake:** Trying to change a prop inside the child component (`props.title = 'new'`). Props are read-only — if a child needs to change something, the parent passes down a *function* (usually a state setter) as a prop instead.

---

## State (`useState`)

**What:** Data that belongs to a component and can change over time, triggering a re-render when it does.

**Why:** Props are read-only and come from outside; state is how a component manages its *own* changing data (an input's current text, whether a task list is loading, etc.).

**When:** Any value that changes in response to user interaction and should update the UI.

**How:**
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 0 is the initial value

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**Common mistake:** Mutating state directly (`tasks.push(newTask)`) instead of calling the setter with a new value (`setTasks([...tasks, newTask])`). React only re-renders when it detects a *new* reference — mutating the old array in place means React doesn't notice anything changed.

---

## `useEffect`

**What:** A hook for running code in response to a component rendering or specific values changing — typically for "side effects" like fetching data.

**Why:** Rendering (returning JSX) should be pure — no API calls, no timers, no manual DOM changes inside the render itself. `useEffect` is the sanctioned place to do those things.

**When:** Fetching data on mount, subscribing to something external, syncing with `localStorage`, setting up a timer.

**How:**
```jsx
import { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []); // empty array = run once, when the component first mounts

  return <ul>{tasks.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}
```

**The dependency array (the `[]` at the end) is the part that confuses everyone:**
- `[]` — run once, on mount only
- `[someValue]` — run on mount, and again whenever `someValue` changes
- no array at all — runs after *every* render (rarely what you want)

**Common mistake:** Omitting a value from the dependency array that the effect actually uses. React's linter will usually warn you — don't ignore that warning; it's almost always pointing at a real bug.

---

## Lists and `key`

**What:** Rendering an array of data as an array of elements, using `.map()`.

**Why:** This is how you turn an array of data into `<li>` elements (UI) — the direct React equivalent of a hand-written `render()` function.

**How:**
```jsx
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

**Why `key` matters:** React uses `key` to track which item is which across re-renders (so it knows "this is the same task, just re-order it" vs. "this is a brand new task"). Without a stable `key`, React can mix up which DOM element belongs to which data, causing subtle bugs — especially with input fields losing focus or showing wrong values.

**Common mistake:** Using the array index as `key` (`key={index}`) when the list can be reordered, filtered, or have items removed from the middle. Use a stable, unique ID from the data itself (`task.id`) instead.

---

## Conditional rendering

**What:** Showing different UI depending on a condition.

**How:**
```jsx
function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet — add one above!</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.completed ? '✓ ' : ''}{task.title}
        </li>
      ))}
    </ul>
  );
}
```

Common patterns: `condition && <Thing />` (render only if true), `condition ? <A /> : <B />` (render one or the other).

---

## Lifting state up

**What:** Moving state to the closest common parent of components that need to share it.

**Why:** Two sibling components can't directly share state — but their shared parent can hold it and pass it (and a way to change it) down to both via props.

**When:** As soon as two components need to read or modify the same data.

**How:**
```jsx
function App() {
  const [tasks, setTasks] = useState([]); // lives in the parent

  return (
    <div>
      <TaskForm onAddTask={(task) => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} />
    </div>
  );
}
```
`TaskForm` and `TaskList` don't talk to each other directly — they both go through `App`, which owns the state.
