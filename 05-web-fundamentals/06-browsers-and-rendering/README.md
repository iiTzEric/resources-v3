# Browsers & Rendering

**Module:** Web Fundamentals
**Prerequisites:** [`05-http-in-depth`](../05-http-in-depth)

## What is it?

This topic covers how a browser turns the raw HTML/CSS/JS it receives into the visual page you
actually see — parsing, building internal trees, and painting pixels to the screen.

## Why does it matter?

This closes the loop on "how the web works" from earlier in this module, and explains real,
practical things: why JavaScript placement in a page matters, why some CSS changes are more
expensive than others, and what a framework like React is actually doing when it "renders."

## How does it work?

### Parsing HTML into the DOM

The browser reads the HTML response and builds the **DOM** (Document Object Model) — the tree
structure you've already manipulated directly with `document.querySelector` and friends. This
parsing happens top to bottom, incrementally, as the HTML arrives.

### Parsing CSS into the CSSOM

Similarly, CSS gets parsed into the **CSSOM** (CSS Object Model) — a tree representing all the
styling rules and how they apply.

### Combining into the render tree

The browser combines the DOM and CSSOM into a **render tree** — essentially, "here's what's
actually visible, and with what styles applied" (elements with `display: none`, for instance, are
excluded, since they're not rendered at all).

### Layout (reflow) and paint

- **Layout** (sometimes called reflow) calculates the exact size and position of every element on
  the page.
- **Paint** actually fills in pixels — colors, text, images, borders — based on that layout.

Some CSS changes (like `width`, adding/removing content) force layout to be recalculated, which is
more expensive than changes that only affect paint (like `color` or `background-color`) — this is
why some animations (like animating `transform`/`opacity`) are dramatically smoother than others
(like animating `width` directly), a genuinely practical performance consideration once building
real interfaces.

### Why `<script>` placement matters

```html
<body>
  ...
  <script src="script.js"></script>
</body>
```

Placing `<script>` near the end of `<body>` (rather than in `<head>`) ensures the browser has
already parsed all the HTML above it — and built the corresponding DOM — before your script runs
and potentially tries to select elements from it. A script in `<head>` trying to
`document.querySelector` an element defined later in the page would fail, since that element
doesn't exist in the DOM yet at that point in parsing.

### How this connects to React

React doesn't fundamentally change any of this underlying process — it still ultimately produces
real DOM elements that go through this same parse/layout/paint pipeline. What React changes is
*how efficiently* and *how often* it updates the DOM: instead of directly manipulating individual
elements every time data changes (as you did with vanilla JS), React calculates the minimal set of
actual DOM changes needed and applies just those, rather than re-building large chunks of the page
unnecessarily.

## Simple Example

A concrete trace of what happens loading a simple page:

```
1. Browser receives HTML, starts parsing it into the DOM incrementally
2. Encounters <link rel="stylesheet">, fetches and parses the CSS into the CSSOM
3. DOM + CSSOM combine into the render tree
4. Layout calculates every element's size/position
5. Paint fills in the actual pixels
6. Encounters <script> near the end of <body>, runs it -- DOM is already
   fully built at this point, so document.querySelector calls succeed
```

## Let's Break It Down

- Steps 1-5 happen largely automatically, driven by the browser itself parsing what it received.
- Step 6 is where your own JavaScript enters the picture — and its placement (end of `<body>`)
  ensures it runs only after the DOM it likely depends on already exists.
- This is exactly the reasoning behind the `<script>` placement convention you may have already
  followed without necessarily knowing the underlying justification.

## Common Mistakes

- **Placing `<script>` in `<head>` without deferring it**, causing it to run before the DOM it
  depends on has been parsed, leading to `null` selector results or errors.
- **Animating layout-triggering properties (`width`, `top`, `margin`) for smooth visual effects**,
  when animating `transform`/`opacity` instead is typically far more performant, since it can skip
  the more expensive layout recalculation step.
- **Assuming React "replaces" the browser's rendering pipeline** rather than working efficiently on
  top of the same underlying DOM/layout/paint process every page goes through.

## When Should I Use It?

This is background knowledge that pays off specifically when diagnosing performance issues, or
understanding why certain script-placement or CSS-animation choices matter in practice.

## Exercises

1. **(Recall)** What are the DOM and CSSOM, and how do they combine into the render tree?
2. **(Understanding)** Explain why placing `<script>` near the end of `<body>` is a common,
   deliberate convention.
3. **(Application)** Between animating an element's `width` versus its `transform: scale(...)` to
   achieve a similar visual growth effect, which is generally more performant, and why?

## What Should I Learn Next?

This completes the Web Fundamentals module. Continue to [`06-react`](../../06-react) — you now have
the full HTML/CSS/HTTP/browser foundation React is built on top of.
