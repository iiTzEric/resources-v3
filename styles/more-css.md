# CSS Fundamentals

CSS from the very beginning.
Everything you need to style any website.

---

## 1. What is CSS?

CSS (Cascading Style Sheets) controls how HTML
elements look on the screen.

```
HTML → structure (what is on the page)
CSS  → style    (how it looks)
JS   → behavior (what it does)
```

---

## 2. How to Add CSS

```html
<!-- 1. External stylesheet — best practice -->
<link rel="stylesheet" href="styles.css">

<!-- 2. Internal style tag -->
<style>
  h1 { color: red; }
</style>

<!-- 3. Inline style — avoid for most cases -->
<h1 style="color: red;">Hello</h1>
```

---

## 3. Selectors

How you target HTML elements to style them.

```css
/* Element selector */
h1 { color: red; }
p  { font-size: 16px; }

/* Class selector — most common */
.card { background: white; }
.btn  { padding: 8px 16px; }

/* ID selector — use sparingly */
#header { height: 60px; }

/* Multiple selectors */
h1, h2, h3 { font-family: sans-serif; }

/* Descendant — p inside .card */
.card p { color: gray; }

/* Direct child — only direct children */
.nav > a { color: white; }

/* Adjacent sibling — h2 right after h1 */
h1 + h2 { margin-top: 0; }

/* Attribute selector */
input[type="email"] { border: 1px solid blue; }
a[href^="https"] { color: green; }  /* starts with */
a[href$=".pdf"]  { color: red; }    /* ends with */

/* Pseudo-class — element state */
a:hover     { color: blue; }
a:visited   { color: purple; }
input:focus { outline: 2px solid blue; }
li:first-child { font-weight: bold; }
li:last-child  { border: none; }
li:nth-child(2) { color: red; }
li:nth-child(odd)  { background: #f0f0f0; }
li:nth-child(even) { background: white; }
p:not(.special) { color: gray; }

/* Pseudo-element — part of element */
p::first-line   { font-weight: bold; }
p::first-letter { font-size: 2em; }
.btn::before    { content: '→ '; }
.btn::after     { content: ' ←'; }
input::placeholder { color: #999; }
```

---

## 4. The Cascade & Specificity

CSS stands for **Cascading** Style Sheets.
When multiple rules target the same element,
specificity determines which one wins.

```
Specificity order (lowest to highest):
1. Element selector     h1          (0, 0, 1)
2. Class selector       .card       (0, 1, 0)
3. ID selector          #header     (1, 0, 0)
4. Inline style         style=""    (1, 0, 0, 0)
5. !important           — avoid     (overrides all)
```

```css
h1 { color: red; }          /* specificity: 0,0,1 */
.title { color: blue; }     /* specificity: 0,1,0 — wins */
#main { color: green; }     /* specificity: 1,0,0 — wins */

/* When same specificity — last one wins */
p { color: red; }
p { color: blue; }  /* blue wins — defined last */
```

---

## 5. The Box Model

Every HTML element is a rectangular box.

```
┌─────────────────────────────┐
│           MARGIN            │  space outside border
│  ┌───────────────────────┐  │
│  │        BORDER         │  │  the border
│  │  ┌─────────────────┐  │  │
│  │  │     PADDING     │  │  │  space inside border
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  actual content
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
.box {
  /* Content */
  width: 200px;
  height: 100px;

  /* Padding — inside the border */
  padding: 16px;                    /* all sides */
  padding: 16px 24px;               /* top/bottom left/right */
  padding: 10px 20px 30px 40px;     /* top right bottom left */
  padding-top: 10px;
  padding-right: 20px;

  /* Border */
  border: 1px solid #ccc;
  border-radius: 8px;               /* rounded corners */
  border-top: 2px solid blue;

  /* Margin — outside the border */
  margin: 16px;
  margin: 0 auto;                   /* center horizontally */
  margin-top: 24px;

  /* Box sizing — include padding in width */
  box-sizing: border-box;           /* always add this */
}

/* Add to every project */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

---

## 6. Display

Controls how elements are laid out.

```css
/* Block — takes full width, stacks vertically */
display: block;
/* Examples: div, p, h1, section, article */

/* Inline — takes only needed width, flows with text */
display: inline;
/* Examples: span, a, strong, em */
/* Cannot set width/height on inline elements */

/* Inline-block — inline but can set width/height */
display: inline-block;

/* None — hides element completely */
display: none;

/* Flex — flexible layout (most useful) */
display: flex;

/* Grid — grid layout */
display: grid;
```

---

## 7. Flexbox

The most useful layout tool.
Makes alignment and distribution easy.

```css
/* Apply to the PARENT (container) */
.container {
  display: flex;

  /* Direction */
  flex-direction: row;            /* → default */
  flex-direction: column;         /* ↓ */
  flex-direction: row-reverse;    /* ← */
  flex-direction: column-reverse; /* ↑ */

  /* Wrap */
  flex-wrap: nowrap;    /* default — no wrapping */
  flex-wrap: wrap;      /* wrap to next line */

  /* Align on main axis (horizontal if row) */
  justify-content: flex-start;    /* → items at start */
  justify-content: flex-end;      /* → items at end */
  justify-content: center;        /* → items centered */
  justify-content: space-between; /* → equal space between */
  justify-content: space-around;  /* → equal space around */
  justify-content: space-evenly;  /* → perfectly equal space */

  /* Align on cross axis (vertical if row) */
  align-items: stretch;     /* default — fill height */
  align-items: flex-start;  /* items at top */
  align-items: flex-end;    /* items at bottom */
  align-items: center;      /* items centered vertically */
  align-items: baseline;    /* align text baselines */

  /* Gap between items */
  gap: 16px;
  gap: 16px 24px;  /* row-gap column-gap */
}

/* Apply to the CHILDREN (items) */
.item {
  /* Grow to fill available space */
  flex-grow: 0;    /* default — don't grow */
  flex-grow: 1;    /* grow to fill space */

  /* Shrink when container is small */
  flex-shrink: 1;  /* default — can shrink */
  flex-shrink: 0;  /* don't shrink */

  /* Base size before growing/shrinking */
  flex-basis: auto;  /* default */
  flex-basis: 200px;

  /* Shorthand */
  flex: 1;           /* flex: 1 1 0 */
  flex: 0 0 200px;   /* fixed 200px */

  /* Override parent alignment for this item */
  align-self: center;

  /* Order */
  order: 0;   /* default */
  order: -1;  /* move to start */
  order: 1;   /* move to end */
}
```

**Common patterns:**
```css
/* Center anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Space between — nav links */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Equal columns */
.columns {
  display: flex;
  gap: 24px;
}
.columns > * {
  flex: 1;
}

/* Sidebar + content */
.layout {
  display: flex;
}
.sidebar { width: 250px; }
.content { flex: 1; }
```

---

## 8. Grid

For two-dimensional layouts — rows AND columns.

```css
/* Apply to the PARENT */
.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 200px 200px;  /* 3 fixed cols */
  grid-template-columns: 1fr 1fr 1fr;        /* 3 equal cols */
  grid-template-columns: repeat(3, 1fr);     /* same */
  grid-template-columns: 200px 1fr;          /* sidebar + content */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* responsive */

  /* Define rows */
  grid-template-rows: 60px 1fr 60px;  /* header main footer */
  grid-auto-rows: 200px;              /* auto rows height */

  /* Gap */
  gap: 24px;
  row-gap: 16px;
  column-gap: 24px;

  /* Align all items */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}

/* Apply to CHILDREN */
.item {
  /* Span multiple columns */
  grid-column: span 2;     /* take up 2 columns */
  grid-column: 1 / 3;      /* from line 1 to line 3 */
  grid-column: 1 / -1;     /* full width */

  /* Span multiple rows */
  grid-row: span 2;
  grid-row: 1 / 3;
}
```

**Common patterns:**
```css
/* Responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Classic page layout */
.page {
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

/* 12-column grid */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
```

---

## 9. Positioning

```css
/* Static — default, normal flow */
position: static;

/* Relative — offset from normal position */
position: relative;
top: 10px;    /* move down 10px */
left: 20px;   /* move right 20px */

/* Absolute — removed from flow, positioned
   relative to nearest positioned ancestor */
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;

/* Fixed — stays in place when scrolling */
position: fixed;
top: 0;
left: 0;
width: 100%;

/* Sticky — relative until scroll threshold */
position: sticky;
top: 0;     /* sticks when reaches top of viewport */

/* Z-index — stack order (higher = on top) */
z-index: 1;
z-index: 100;
z-index: -1;  /* behind everything */
```

**Common patterns:**
```css
/* Sticky navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Badge on top of card */
.card { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* Full screen overlay */
.overlay {
  position: fixed;
  inset: 0;  /* shorthand for top/right/bottom/left: 0 */
  background: rgba(0,0,0,0.5);
  z-index: 200;
}
```

---

## 10. Typography

```css
/* Font */
font-family: 'Inter', sans-serif;
font-family: 'Georgia', serif;
font-family: 'Courier New', monospace;

/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

/* Size */
font-size: 16px;    /* pixels */
font-size: 1rem;    /* relative to root (usually 16px) */
font-size: 1.5em;   /* relative to parent */
font-size: 2vw;     /* relative to viewport width */

/* Weight */
font-weight: 400;   /* normal */
font-weight: 600;   /* semi-bold */
font-weight: 700;   /* bold */
font-weight: 800;   /* extra-bold */

/* Style */
font-style: normal;
font-style: italic;

/* Line height */
line-height: 1;     /* no extra space */
line-height: 1.5;   /* comfortable reading */
line-height: 2;     /* double spaced */

/* Letter spacing */
letter-spacing: -1px;   /* tight — headings */
letter-spacing: 1px;    /* loose — labels, caps */

/* Text alignment */
text-align: left;
text-align: center;
text-align: right;
text-align: justify;

/* Text decoration */
text-decoration: none;        /* remove underline from links */
text-decoration: underline;
text-decoration: line-through;

/* Text transform */
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;

/* Overflow */
white-space: nowrap;          /* prevent line break */
overflow: hidden;
text-overflow: ellipsis;      /* show ... when overflow */

/* Clamp text to n lines */
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
```

---

## 11. Colors & Backgrounds

```css
/* Color formats */
color: red;                    /* named */
color: #ff0000;                /* hex */
color: #f00;                   /* short hex */
color: rgb(255, 0, 0);         /* rgb */
color: rgba(255, 0, 0, 0.5);   /* rgb + alpha */
color: hsl(0, 100%, 50%);      /* hue saturation lightness */
color: hsla(0, 100%, 50%, 0.5);

/* Background */
background-color: #f0f0f0;
background-color: transparent;

/* Background image */
background-image: url('image.jpg');
background-size: cover;        /* fill, may crop */
background-size: contain;      /* fit, may have gaps */
background-position: center;
background-repeat: no-repeat;

/* Shorthand */
background: url('img.jpg') center/cover no-repeat;

/* Gradient */
background: linear-gradient(to right, #000, #fff);
background: linear-gradient(135deg, #667eea, #764ba2);
background: radial-gradient(circle, #fff, #000);

/* Opacity */
opacity: 0;      /* invisible */
opacity: 0.5;    /* 50% transparent */
opacity: 1;      /* fully visible */
```

---

## 12. Spacing

```css
/* Margin — space outside element */
margin: 16px;              /* all sides */
margin: 16px 24px;         /* top/bottom left/right */
margin: 10px 20px 30px 40px; /* top right bottom left */
margin: 0 auto;            /* center block element */
margin-top: 24px;

/* Padding — space inside element */
padding: 16px;
padding: 12px 24px;        /* common for buttons */

/* Common spacing scale */
4px   — tiny gap
8px   — small gap
12px  — compact
16px  — default
24px  — comfortable
32px  — spacious
48px  — section gap
64px  — large section
96px  — hero section
```

---

## 13. Responsive Design

Making your site work on all screen sizes.

```css
/* Mobile first — start with mobile styles
   then add larger screen overrides */

/* Base styles — mobile */
.card {
  padding: 16px;
  font-size: 14px;
}

/* Tablet — 640px and up */
@media (min-width: 640px) {
  .card {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop — 1024px and up */
@media (min-width: 1024px) {
  .card {
    padding: 32px;
  }
}

/* Common breakpoints */
/* 640px  — sm — large phones */
/* 768px  — md — tablets */
/* 1024px — lg — laptops */
/* 1280px — xl — desktops */
/* 1536px — 2xl — large screens */

/* Other media queries */
@media (max-width: 640px) { }      /* max width */
@media (orientation: landscape) {} /* landscape mode */
@media (prefers-color-scheme: dark) {} /* dark mode */
@media print { }                   /* print styles */
```

**Responsive units:**
```css
/* Relative units — prefer these */
%    — percentage of parent
rem  — relative to root font size (16px default)
em   — relative to parent font size
vw   — viewport width (1vw = 1% of screen width)
vh   — viewport height
vmin — smaller of vw/vh
vmax — larger of vw/vh

/* Modern responsive typography */
font-size: clamp(1rem, 2.5vw, 2rem);
/* min: 1rem, preferred: 2.5vw, max: 2rem */
```

---

## 14. CSS Variables

```css
/* Define in :root — available everywhere */
:root {
  --color-bg: #0a0a0a;
  --color-text: #f0f0f0;
  --color-accent: #c8f135;
  --color-muted: #777777;
  --radius: 12px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
}

/* Use anywhere */
.card {
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius);
  padding: var(--spacing-md);
}

/* Override in a specific scope */
.dark-section {
  --color-bg: #000;
  --color-text: #fff;
}

/* With fallback */
color: var(--color-accent, #c8f135);

/* Change with JavaScript */
document.documentElement.style.setProperty('--color-accent', '#ff0000')
```

---

## 15. Transitions & Animations

```css
/* Transition — smooth change between states */
.btn {
  background: blue;
  transition: background 0.3s ease;
  /* property duration timing-function */
}

.btn:hover {
  background: darkblue;  /* smoothly transitions */
}

/* Transition multiple properties */
.card {
  transition: transform 0.2s ease,
              box-shadow 0.2s ease,
              opacity 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* Timing functions */
ease         /* slow → fast → slow (default) */
ease-in      /* slow → fast */
ease-out     /* fast → slow */
ease-in-out  /* slow → fast → slow (smoother) */
linear       /* constant speed */
cubic-bezier(0.4, 0, 0.2, 1)  /* custom */

/* Keyframe animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.3s ease;
  /* name duration timing */
}

/* Animation properties */
animation-name: fadeIn;
animation-duration: 0.3s;
animation-timing-function: ease;
animation-delay: 0.1s;
animation-iteration-count: infinite;  /* or a number */
animation-direction: alternate;
animation-fill-mode: forwards;        /* keep end state */

/* Skeleton loading animation */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #1a1a1a 25%,
    #2a2a2a 50%,
    #1a1a1a 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Transform — move, scale, rotate */
transform: translateX(10px);     /* move right */
transform: translateY(-10px);    /* move up */
transform: translate(10px, -10px); /* move both */
transform: scale(1.1);           /* 10% bigger */
transform: rotate(45deg);        /* rotate */
transform: skew(10deg);          /* skew */

/* Multiple transforms */
transform: translateY(-4px) scale(1.02);
```

---

## 16. Common Patterns

```css
/* Center everything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Truncate text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Clamp to 2 lines */
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* Full screen overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Remove default list styles */
ul, ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Remove default button styles */
button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

/* Remove default link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Aspect ratio box */
.video-wrapper {
  aspect-ratio: 16 / 9;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #1a1a1a; }
::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 3px;
}
```