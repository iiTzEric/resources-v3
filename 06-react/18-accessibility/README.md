# Accessibility

**Module:** React
**Prerequisites:** [`17-performance`](../17-performance)

## What is it?

Accessibility (often abbreviated "a11y") means building applications usable by everyone, including
people using screen readers, keyboard-only navigation, or other assistive technology. Most of this
builds directly on the semantic HTML and form practices from the Web Fundamentals module — React
doesn't fundamentally change these requirements, since JSX still ultimately produces real HTML.

## Why does it matter?

Accessibility isn't a niche add-on feature — it directly determines whether a meaningful portion of
real users can actually use your application at all. It's also frequently a legal requirement for
many organizations, and it consistently correlates with generally better, clearer UI design even
for users who don't rely on assistive technology.

## How does it work?

### Semantic JSX — the foundation carries over directly

```jsx
function Nav() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}
```

Using real semantic elements (`<nav>`, `<button>`, `<main>`) in JSX, exactly as covered in the Web
Fundamentals HTML topic, is the single most impactful accessibility practice — a `<div
onClick={...}>` styled to look like a button is not actually a button to a screen reader or
keyboard user; a real `<button>` is.

### Labels on form inputs

```jsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

Note: **`htmlFor`**, not `for` — `for` is a reserved word conflict in JSX for the same reason
`class` becomes `className` (though less commonly known). Functionally identical purpose to plain
HTML's `for`/`id` matching.

### `alt` text on images

```jsx
<img src={product.image} alt={product.name} />
```

Dynamic `alt` text, driven by actual data, is just as important in React as static `alt` text in
plain HTML — never omit it, and avoid vague, unhelpful values like `alt="image"`.

### Keyboard accessibility for custom interactive elements

```jsx
// Problematic — not natively keyboard-accessible
<div onClick={handleClick}>Click me</div>

// Better — a real button, naturally keyboard-accessible
<button onClick={handleClick}>Click me</button>
```

A real `<button>` is automatically focusable via keyboard (Tab key) and activatable via Enter/Space
— a styled `<div>` with an `onClick` gets none of this for free, and would require significant extra
work (`tabIndex`, keyboard event handlers, ARIA attributes) to replicate what a real `<button>`
already provides. **Prefer real interactive elements over styled generic ones whenever the
underlying interaction matches.**

### ARIA attributes — for when semantic HTML genuinely isn't enough

```jsx
<button aria-label="Close modal" onClick={onClose}>×</button>
```

`aria-label` provides an accessible name when the visible content (here, just a "×" symbol) doesn't
convey meaning on its own to a screen reader. ARIA attributes are a genuine, useful tool — but
they supplement semantic HTML, not replace it; reaching for real semantic elements first is always
preferable to using ARIA to patch over a non-semantic element.

### Managing focus after route changes or modal opens

```jsx
useEffect(() => {
  headingRef.current?.focus();
}, []);
```

For keyboard/screen-reader users, focus should generally move to relevant new content after a
significant UI change (navigating to a new page, opening a modal) — otherwise, focus can remain
stuck somewhere no longer relevant, disorienting non-visual users in a way sighted users wouldn't
even notice.

## Simple Example

```jsx
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query); }}>
      <label htmlFor="search">Search products</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

## Let's Break It Down

- The `<label>` is properly linked to the `<input>` via `htmlFor`/`id` — a screen reader
  announces "Search products" when the input receives focus.
- A real `<button type="submit">` is used, naturally keyboard-accessible, rather than a styled
  `<div>` with a click handler.
- The `<form>`'s `onSubmit` (rather than only handling the button's `onClick`) means pressing
  Enter while focused in the input also correctly triggers the search — a keyboard-friendly
  behavior that's easy to overlook if only the button click is handled.

## Common Mistakes

- **Using styled `<div>`s or `<span>`s for interactive elements** instead of real `<button>`s or
  `<a>`s, losing built-in keyboard accessibility.
- **Omitting or writing unhelpful `alt` text** on meaningful images.
- **Forgetting `htmlFor`/`id` matching on form labels**, even though it looks visually identical
  without it.
- **Managing focus only for mouse users**, forgetting that after major UI changes, keyboard/screen-
  reader users benefit from focus being deliberately moved somewhere relevant.

## When Should I Use It?

Apply accessible practices by default, in every component — real semantic elements, proper labels,
meaningful `alt` text — rather than treating accessibility as a separate pass done only at the end
of a project (or skipped entirely).

## Exercises

1. **(Recall)** Why is a real `<button>` generally preferable to a styled `<div>` with an
   `onClick` handler?
2. **(Application)** Add proper labels and accessible attributes to a login form with email and
   password fields.
3. **(Problem Solving)** A modal's close button is just an `×` character inside a `<button>` with no
   other text. Explain the accessibility gap and how `aria-label` would address it.

## What Should I Learn Next?

Continue to [`19-project-structure`](../19-project-structure) — organizing a real, growing React
application's files and folders sensibly.
