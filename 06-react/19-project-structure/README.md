# Project Structure

**Module:** React
**Prerequisites:** [`18-accessibility`](../18-accessibility)

## What is it?

This topic covers how to organize a growing React application's files and folders — a standard,
widely-recognized structure that keeps a codebase navigable as it grows well beyond a single
`App.jsx`.

## Why does it matter?

A sensible file structure makes it obvious where new code belongs and where existing code lives —
genuinely important once a project has dozens or hundreds of components, hooks, and utilities.
Retrofitting structure onto a disorganized project later is far more painful than starting with a
sensible layout.

## How does it work?

### A standard, common layout

```
src/
  components/
    UserCard.jsx
    Navbar.jsx
  pages/
    Home.jsx
    Login.jsx
    Profile.jsx
  hooks/
    useFetch.js
    useLocalStorage.js
  context/
    AuthContext.jsx
  api/
    userApi.js
  App.jsx
  main.jsx
```

- **`components/`** — small, reusable pieces used *within* pages (a card, a button, a nav bar) —
  not tied to any specific route.
- **`pages/`** — full, route-level components, each corresponding to a distinct URL/view (matches
  directly to your React Router setup).
- **`hooks/`** — your custom hooks, reusable across multiple components/pages.
- **`context/`** — your Context providers, kept separate from ordinary components since they play a
  structurally different role.
- **`api/`** — centralized functions wrapping `fetch` calls to your backend, rather than writing
  `fetch(...)` directly inside every component that needs data.

### Why centralize API calls in their own folder

```javascript
// api/userApi.js
export async function getUsers() {
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
}
```

```jsx
// components/UserList.jsx
import { getUsers } from "../api/userApi";

function UserList() {
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  // ...
}
```

If your backend's base URL changes, or every request needs an added auth header later, you change
it in **one place** (`api/userApi.js`) instead of hunting down every component with an inline
`fetch` call.

### `components/` versus `pages/` — the key distinction

A **page** is tied to a specific route — a whole screen a user navigates to directly (`/login`,
`/profile`). A **component** is a smaller, reusable piece used *within* one or more pages (a
product card, a navigation bar). This separation keeps route-level structure obvious at a glance,
while smaller reusable pieces don't get lost mixed in among full pages.

### Scaling further — feature-based organization

For genuinely large applications, some teams organize by *feature* rather than by *type*:

```
src/
  features/
    auth/
      LoginForm.jsx
      useAuth.js
      authApi.js
    products/
      ProductList.jsx
      ProductCard.jsx
      productApi.js
```

This groups everything related to one feature together, rather than splitting related files across
separate `components/`, `hooks/`, and `api/` folders. Neither approach is universally "correct" —
the type-based structure shown first is a simpler, very approachable default; feature-based
organization tends to pay off once an application is large enough that type-based folders
themselves become unwieldy.

## Simple Example

A realistic small project layout:

```
src/
  components/
    ProductCard.jsx
  pages/
    Home.jsx
    ProductDetail.jsx
  hooks/
    useFetch.js
  api/
    productApi.js
  App.jsx
```

## Let's Break It Down

- `Home.jsx` and `ProductDetail.jsx` in `pages/` correspond directly to routes registered in
  `App.jsx`'s React Router setup.
- `ProductCard.jsx` in `components/` is a smaller piece reused inside `Home.jsx` (perhaps rendering
  a list of them).
- `useFetch.js` and `productApi.js` are shared utilities — the hook and API-calling logic —
  usable from either page without duplication.

## Common Mistakes

- **Putting everything in one flat folder**, or all inside a single giant `App.jsx`, making it hard
  to locate anything as the project grows.
- **Mixing route-level pages and small reusable components in the same folder** without any
  distinction, losing the at-a-glance clarity of knowing what's a "screen" versus a "piece."
- **Writing `fetch` calls directly inside many components**, instead of centralizing them,
  duplicating logic and making future changes (auth headers, base URL changes) tedious and
  error-prone.

## When Should I Use It?

Adopt a sensible folder structure from the very start of a real project — even a small one —
rather than retrofitting it once things feel disorganized. The type-based structure shown here
(`components/`, `pages/`, `hooks/`, `context/`, `api/`) is a solid, widely-recognized default for
most projects up to a substantial size.

## Exercises

1. **(Recall)** What's the key distinction between something that belongs in `pages/` versus
   `components/`?
2. **(Application)** Sketch a folder structure for a small blog application with a home page, a
   post detail page, a `PostCard` component, and API calls for fetching posts.
3. **(Problem Solving)** A project has grown to 40 components, all in one flat `components/`
   folder, with no separation between page-level and reusable pieces. Describe how you'd
   reorganize it.

## What Should I Learn Next?

This completes the React module. Continue to [`07-backend`](../../07-backend) — building the
server side that a React frontend like this connects to.
