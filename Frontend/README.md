# Frontend Guide

A frontend is the part of the application that runs in the browser. It displays state, collects input, calls the backend API, and shows loading, success, and error states.

## Learning path

1. Learn [HTML and CSS](./html-css.md) for structure, accessibility, and responsive layout.
2. Learn [JavaScript in the browser](./javascript-browser.md) for modules, events, and asynchronous work.
3. Understand [HTTP and frontend architecture](./http-and-architecture.md).
4. Use [api-client.js](./api-client.js) as the one place that talks to the backend.
5. Build a screen that has loading, empty, success, and error states.
6. Add authentication by sending the JWT in an `Authorization: Bearer <token>` header.

## React next step

Read [React basics](./react-basics.md) after the browser fundamentals. Components render state, event handlers request changes, and the backend remains responsible for authorization. Move the API and state logic into components or custom hooks only after the plain request flow is clear.

## API example

```js
import { api } from "./api-client.js";

async function loadTasks() {
  const state = document.querySelector("#state");
  state.textContent = "Loading...";

  try {
    const result = await api.get("/api/tasks?limit=20");
    state.textContent =
      result.data.length === 0
        ? "No tasks yet."
        : `${result.data.length} tasks loaded.`;
  } catch (error) {
    state.textContent = error.message;
  }
}
```

The interface should not assume every request succeeds. Show a useful message for failures, disable duplicate submissions while a request is pending, and refresh the visible state after a successful mutation.

## Authentication storage

The simplest teaching example stores the token in memory. If a page reload should preserve a session, use a carefully designed session strategy. `localStorage` is easy to use but is readable by JavaScript, so an XSS bug can expose its tokens. HttpOnly, Secure, SameSite cookies reduce that risk but require CSRF protection and server cookie configuration.

Never put `JWT_SECRET`, database URLs, or other server-only values in frontend environment variables.
