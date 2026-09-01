# HTML: Structure & Semantics

**Module:** Web Fundamentals
**Prerequisites:** [`01-how-the-web-works`](../01-how-the-web-works)

## What is it?

HTML (HyperText Markup Language) is a markup language — it describes the *structure and meaning* of
content on a page, not its appearance (that's CSS's job, next topic). Every piece of content is
wrapped in **elements** made of tags that describe what that content *is*.

## Why does it matter?

HTML is the actual foundation every web page is built on, including every React app you'll build —
JSX ultimately produces real HTML elements in the browser. Getting structure and semantics right
affects accessibility, SEO, and how maintainable a page is, well beyond just "does it look right."

## How does it work?

### The basic skeleton every page needs

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <p>Visible content goes here</p>
  </body>
</html>
```

`<!DOCTYPE html>` declares a modern HTML document. `<head>` holds metadata (not shown on the page
itself); `<body>` holds everything actually visible.

### Core content elements

```html
<h1>Main Title</h1>
<h2>A Section</h2>
<p>A paragraph of text.</p>
<a href="https://example.com">A link</a>
<img src="photo.jpg" alt="A description of the photo">
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

`alt` on images matters for accessibility (screen readers) and as fallback text if an image fails
to load — never skip it. Heading levels (`h1`-`h6`) should reflect actual document structure, not
just desired visual size.

### Semantic tags — structure that carries meaning

```html
<header>
  <h1>Site Title</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2026</p>
</footer>
```

Unlike a generic `<div>`, these tags (`header`, `nav`, `main`, `article`, `section`, `aside`,
`footer`) tell a browser, a screen reader, and a search engine *what role* this content plays —
`<nav>` is unambiguously navigation, `<main>` is unambiguously the primary content. This matters
concretely: screen readers let users jump directly to `<nav>` or `<main>`, and search engines weigh
`<article>`/`<main>` content more meaningfully than an undifferentiated pile of `<div>`s.

### `<div>`/`<span>` — the meaning-free containers

```html
<div class="card">...</div>
<span class="highlight">...</span>
```

These exist purely as generic containers for styling/layout purposes — reach for a semantic tag
whenever one genuinely fits the content's actual role; use `div`/`span` only when there's no
meaningful semantic tag that applies.

### Forms — structured input

```html
<form action="/submit" method="post">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Submit</button>
</form>
```

`<label for="...">` matched to an input's `id` is an accessibility requirement, not a nice-to-have —
it lets clicking the label focus the input, and lets screen readers announce it correctly.

## Simple Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Blog</title>
  </head>
  <body>
    <header>
      <h1>My Blog</h1>
    </header>
    <main>
      <article>
        <h2>First Post</h2>
        <p>Welcome to my blog.</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2026 My Blog</p>
    </footer>
  </body>
</html>
```

## Let's Break It Down

- The overall skeleton is fixed and standard — every real page follows this same basic shape.
- `header`/`main`/`footer` divide the page into meaningful, named regions rather than an
  undifferentiated stack of generic containers.
- `article` wraps a genuinely self-contained piece of content — this specific post could
  theoretically stand alone (e.g., in an RSS feed), which is exactly the semantic signal `article`
  is meant to carry.

## Common Mistakes

- **Building an entire page out of `<div>`s** with no semantic structure — functional, but worse
  for accessibility, SEO, and readability of your own code.
- **Skipping heading levels** for purely visual reasons (using `h1` for something that's really a
  sub-point, just because it "looks right") — use CSS to control appearance, and headings to reflect
  actual document structure.
- **Omitting `alt` text on images**, or **omitting `<label>` on form inputs** — both are genuine
  accessibility failures, not just style preferences.

## When Should I Use It?

Always start with the most specific, meaningful tag that fits the content — reach for `div`/`span`
only when no semantic tag genuinely applies. This becomes second nature quickly and pays off
throughout everything built on top of HTML, including React's JSX.

## Exercises

1. **(Recall)** What's the practical difference between `<div>` and `<section>`?
2. **(Application)** Structure a simple product page using semantic HTML: a header with navigation,
   a main area with the product details, and a footer.
3. **(Problem Solving)** A page uses `<div class="nav">` instead of `<nav>` throughout. What are two
   concrete, real downsides of this choice?

## What Should I Learn Next?

Continue to [`03-css-fundamentals`](../03-css-fundamentals) — HTML structures content; CSS controls
how it actually looks.
