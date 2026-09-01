# CSS Layout (Flexbox & Grid)

**Module:** Web Fundamentals
**Prerequisites:** [`03-css-fundamentals`](../03-css-fundamentals)

## What is it?

**Flexbox** arranges items along a single dimension (a row or a column). **Grid** arranges items
across two dimensions (rows and columns together). Both replace older, more awkward layout
techniques, and together they cover the large majority of real-world layout needs.

## Why does it matter?

Almost every non-trivial layout — navigation bars, card grids, page structure — needs one of these
two tools. Knowing which one fits a given problem, and the core properties of each, is essential
practical CSS skill.

## How does it work?

### Flexbox — one dimension

```css
.nav {
  display: flex;
  justify-content: center;  /* alignment along the main axis */
  align-items: center;        /* alignment along the cross axis */
  gap: 20px;                    /* space between items */
}
```

`display: flex` makes direct children line up in a row by default. `justify-content` controls
alignment along the main axis (horizontal, by default); `align-items` controls the cross axis
(vertical, by default). `flex-direction: column` flips which axis is "main."

```css
.card {
  flex: 1;  /* grow to share available space equally with siblings */
}
```

### Grid — two dimensions

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
```

`grid-template-columns` explicitly defines columns. The `repeat(auto-fit, minmax(200px, 1fr))`
pattern is genuinely one of the most useful snippets in CSS: it creates as many columns as
comfortably fit, each at least 200px wide, growing to fill extra space — producing a fully
responsive grid with zero media queries needed.

### Choosing between them

Ask: am I arranging items in a single row/column (Flexbox), or genuinely across both rows and
columns at once (Grid)? A navigation bar is Flexbox; a photo gallery or dashboard layout is often
Grid.

### Responsive design — media queries

```css
.nav {
  flex-direction: column; /* stacked by default, mobile-first */
}

@media (min-width: 600px) {
  .nav {
    flex-direction: row; /* side by side once there's room */
  }
}
```

`@media (min-width: ...)` applies its rules only above a given viewport width — the mobile-first
approach (writing simple, small-screen styles as the default, then adding complexity for larger
screens) is generally preferred over the reverse.

## Simple Example

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}
```

## Let's Break It Down

- `.card-container` uses Grid, since cards need to arrange in both rows and columns as the
  container's width changes — the `auto-fit`/`minmax` pattern makes this responsive automatically.
- `.nav` uses Flexbox, since nav links only need to arrange in a single row (or column, on small
  screens) — a one-dimensional layout problem.

## Common Mistakes

- **Reaching for Grid when Flexbox alone would do**, adding unnecessary complexity for a simple
  single-row/column layout.
- **Forgetting `gap`**, resulting in elements sitting flush against each other with no breathing
  room.
- **Writing desktop-first media queries** (`max-width`) as a default habit instead of considering
  mobile-first (`min-width`), which better matches how most real traffic and devices work today.

## When Should I Use It?

Use Flexbox for one-dimensional layouts (navs, button groups, card rows). Use Grid for genuinely
two-dimensional layouts (page structure, photo grids, dashboards). Combine both freely within one
page — they aren't mutually exclusive.

## Exercises

1. **(Recall)** What's the core difference between what Flexbox and Grid are each designed for?
2. **(Application)** Write CSS for a responsive 3-column card grid that collapses to 1 column on
   narrow screens, using the `auto-fit`/`minmax` pattern.
3. **(Problem Solving)** A grid of cards looks correct on desktop but overlaps awkwardly on mobile.
   What CSS Grid property, and what value, would most directly fix this without a media query?

## What Should I Learn Next?

Continue to [`05-http-in-depth`](../05-http-in-depth) — a deeper look at HTTP methods, status codes,
and headers, beyond the introduction from Fundamentals.
