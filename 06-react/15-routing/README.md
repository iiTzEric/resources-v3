# Routing (React Router)

**Module:** React
**Prerequisites:** [`14-data-fetching-patterns`](../14-data-fetching-patterns)

## What is it?

**React Router** lets a React app have multiple "pages" — different views at different URLs —
without a full page reload each time. It intercepts navigation and swaps which component renders,
rather than letting the browser reload the entire page from the server.

## Why does it matter?

Every real app beyond a single view needs navigation — a home page, a detail page, a settings page.
Without React Router (or something like it), you'd be limited to a single-view application, or
forced back into full page reloads that discard all of React's in-memory state on every navigation.

## How does it work?

### Setup

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- **`<BrowserRouter>`** — wraps the whole app once, enabling routing.
- **`<Routes>`** — looks at the current URL and renders the one matching `<Route>`.
- **`<Route path="..." element={...} />`** — maps a URL path to a component.

### Navigating without a reload — `<Link>`

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

Using a plain `<a href="...">` here would cause a full page reload, defeating the purpose — `<Link>`
intercepts the click and swaps the rendered component instantly instead.

### Dynamic routes — one template for many pages

```jsx
<Route path="/products/:id" element={<ProductDetail />} />
```

`:id` is a URL parameter matching any value in that position — `/products/1`, `/products/42` all
match this single route.

```jsx
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  // fetch and display the product matching this id
}
```

`useParams()` reads the current URL's dynamic segments, giving them back as an object.

### Programmatic navigation

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleLogin() {
    // ... perform login ...
    navigate("/dashboard");
  }
}
```

`useNavigate()` returns a function to navigate imperatively — useful after an action completes
(like a successful login), rather than requiring the user to click a `<Link>`.

### Nested routes and layouts (a brief look)

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

Nested `<Route>`s let a shared layout (`DashboardLayout`, containing a sidebar or nav) wrap several
related pages, using an `<Outlet />` inside `DashboardLayout` to indicate where the matched child
route's content should render.

## Simple Example

```jsx
function AnimeList() {
  const anime = [{ id: 1, title: "Naruto" }, { id: 2, title: "One Piece" }];
  return (
    <ul>
      {anime.map(a => (
        <li key={a.id}><Link to={`/anime/${a.id}`}>{a.title}</Link></li>
      ))}
    </ul>
  );
}

function AnimeDetail() {
  const { id } = useParams();
  return <h1>Anime #{id}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Let's Break It Down

- Each list item links to `/anime/${a.id}` — a template literal building the dynamic URL for that
  specific item, mirroring the same pattern used to build `data-id` attributes back in vanilla JS.
- The `/anime/:id` route matches any of those specific URLs, and `useParams()` inside
  `AnimeDetail` reads back exactly which `id` was navigated to.
- Clicking a title swaps to `AnimeDetail` instantly, with no full page reload — React's own state
  elsewhere in the app (if any persisted across this navigation) remains intact.

## Common Mistakes

- **Using a plain `<a href="...">` instead of `<Link>`**, causing an unwanted full page reload.
- **Mismatched paths between `<Link to="...">` and the registered `<Route path="...">`** — this
  fails silently (the click does nothing) rather than throwing a visible error, making it a
  genuinely tricky bug to spot without careful checking.
- **Forgetting to wrap the whole app in `<BrowserRouter>`** — using `<Link>`, `<Routes>`, or
  `useParams()` outside of it will not work.

## When Should I Use It?

Use React Router for any application with more than one distinct view/page. Use dynamic routes
(`:id`) for detail pages representing one of many similar items, rather than a separate hardcoded
route for each one.

## Exercises

1. **(Recall)** What's the practical difference between using `<Link>` and a plain `<a>` tag for
   in-app navigation?
2. **(Application)** Set up routes for a `/products` list page and a `/products/:id` detail page,
   with the list linking correctly to each detail page.
3. **(Problem Solving)** A `<Link to="/user/5">` doesn't navigate anywhere when clicked, with no
   console error. What's the most likely mismatch to check first?

## What Should I Learn Next?

Continue to [`16-error-handling`](../16-error-handling) — handling errors gracefully within a
React component tree, including across routed pages.
