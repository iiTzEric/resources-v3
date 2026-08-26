# React Basics

React is a JavaScript library for building interfaces from components. A component receives data, returns UI, and re-renders when its state changes.

## Setup

```bash
npm create vite@latest task-frontend -- --template react
cd task-frontend
npm install
npm run dev
```

Use the official Vite setup for a new React project. React is optional here; the API, HTTP, accessibility, and security principles are the same as the vanilla browser guide.

## Components and props

```jsx
import { useState } from 'react'

function TaskItem({ task, onToggle }) {
  return (
    <li>
      <span>{task.title}</span>
      <button type="button" onClick={() => onToggle(task.id)}>
        {task.completed ? "Completed" : "Complete"}
      </button>
    </li>
  );
}
```

A component is a reusable function. Props are read-only values supplied by its parent. Pass a callback when the child needs to request a change; do not mutate props.

## State and lists

```jsx
import { useState } from 'react'

function TaskList({ tasks, onToggle }) {
  const [filter, setFilter] = useState("all");
  const visibleTasks = tasks.filter(
    (task) => filter === "all" || (filter === "open" && !task.completed),
  );

  return (
    <ul>
      {visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}
```

State belongs in the closest common parent that needs to read or change it. Use a stable ID for `key`, not an array index when items can be reordered or removed.

## Loading API data

```jsx
import { useEffect, useState } from 'react'
import { api } from './api-client'

function TasksPage() {
  const [state, setState] = useState({
    status: "loading",
    data: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    api
      .get("/api/tasks?limit=20")
      .then((result) => {
        if (!cancelled)
          setState({ status: "success", data: result.data, error: null });
      })
      .catch((error) => {
        if (!cancelled)
          setState({ status: "error", data: [], error: error.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return <p>Loading tasks...</p>;
  if (state.status === "error") return <p role="alert">{state.error}</p>;
  if (state.data.length === 0) return <p>No tasks yet.</p>;
  return <TaskList tasks={state.data} />;
}
```

`useState` stores UI state. `useEffect` runs synchronization work such as an API request after rendering. The cleanup flag prevents an old request from updating a screen that is no longer active.

## Forms

Keep controlled input values in state when the UI needs to validate or display them. On submit, prevent the browser navigation, validate for quick feedback, call the API client, and show a pending state. The backend must repeat validation and authorization.

Avoid adding `useMemo` or `useCallback` automatically. Add memoization only after measuring a real performance problem or when a library requires stable identity.
