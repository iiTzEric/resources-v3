# CSS Fundamentals

**Module:** Web Fundamentals
**Prerequisites:** [`02-html-structure-and-semantics`](../02-html-structure-and-semantics)

## What is it?

CSS (Cascading Style Sheets) controls how HTML looks — colors, spacing, fonts, sizing. If HTML is
structure, CSS is appearance, kept deliberately separate.

## Why does it matter?

Nearly every visual aspect of a real website or app comes from CSS. The **box model** specifically
is the single most important mental model in CSS — a huge share of layout confusion traces back to
misunderstanding it.

## How does it work?

### Connecting CSS to HTML

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

External stylesheets, linked this way, keep structure (HTML) and appearance (CSS) cleanly
separated — the standard, correct approach for anything beyond a quick test.

### Selectors — targeting elements

```css
p { color: blue; }                 /* every <p> */
.highlight { background: yellow; }   /* class="highlight" */
#main-title { font-size: 32px; }      /* id="main-title", unique */
h1, h2, h3 { font-family: sans-serif; } /* multiple tags, one rule */
main p { color: gray; }                /* a <p> specifically inside <main> */
```

Default to classes for anything reusable; use IDs sparingly, for genuinely unique, one-off
elements.

### The box model — every element is a rectangle

```
margin (outside space) > border > padding (inside space) > content
```

```css
.card {
  width: 300px;
  padding: 16px;      /* space between content and border */
  border: 1px solid black;
  margin: 20px;         /* space between this box and its neighbors */
}
```

Nearly every unexpected layout result traces back to misunderstanding how these four layers stack
and interact — internalizing this model pays off immediately and repeatedly.

### `box-sizing` — a genuinely important, easy-to-miss setting

```css
* {
  box-sizing: border-box;
}
```

By default, `width`/`height` only apply to the *content* box — padding and border get added on top,
making the element's actual rendered size larger than the `width` you set. `box-sizing:
border-box` changes this so `width`/`height` include padding and border, making sizing far more
predictable. Setting this globally (as shown, using the `*` universal selector) is extremely common
practice in real projects.

### Common properties

```css
.example {
  color: #333;
  background-color: #f0f0f0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
}
```

## Simple Example

```css
* {
  box-sizing: border-box;
}

.card {
  width: 250px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
}

.card h3 {
  color: #333;
  margin-bottom: 8px;
}
```

## Let's Break It Down

- `box-sizing: border-box` on every element ensures `.card`'s `width: 250px` is its actual final
  rendered width, including its padding and border — without this, the true rendered width would be
  larger than 250px.
- `.card h3` targets `<h3>` elements specifically *inside* elements with class `card` — a
  descendant selector, scoping the styling precisely rather than affecting every `<h3>` on the page.

## Common Mistakes

- **Not setting `box-sizing: border-box`**, and being confused why an element's rendered size
  doesn't match its declared `width`.
- **Overusing IDs for styling** where a class would be more reusable and appropriate.
- **Forgetting the box model's layering**, leading to unexpected spacing that's actually margin or
  padding stacking in ways not accounted for.

## When Should I Use It?

Use classes as your default styling mechanism. Set `box-sizing: border-box` globally near the start
of any real project. Reach for the box model explicitly whenever spacing/sizing doesn't look right —
it's almost always the right diagnostic starting point.

## Exercises

1. **(Recall)** List the four layers of the box model, from innermost to outermost.
2. **(Understanding)** Explain what `box-sizing: border-box` changes about how `width` is
   calculated, and why that's usually more predictable.
3. **(Application)** Style a `.button` class with padding, a background color, rounded corners, and
   white bold text.

## What Should I Learn Next?

Continue to [`04-css-layout`](../04-css-layout) — Flexbox and Grid, the modern tools for arranging
multiple elements relative to each other.
