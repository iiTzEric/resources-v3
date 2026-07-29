# Styles (CSS)

## The box model

**What:** Every element is a box made of content, padding, border, and margin, from inside out.

**Why:** Explains almost every "why is this element bigger/further away than I expected" confusion.

**How:**
```css
.card {
  width: 200px;
  padding: 16px;    /* space inside the border */
  border: 1px solid #ccc;
  margin: 8px;        /* space outside the border */
  box-sizing: border-box; /* width includes padding+border, not just content — set this globally */
}
```
**Common mistake:** Not setting `box-sizing: border-box` globally (`* { box-sizing: border-box; }`), then being confused why adding padding makes an element wider than its declared `width`.

---

## Flexbox — for one-dimensional layout (a row or a column)

**What:** A layout system for arranging items along a single axis.

**When:** Navbars, button groups, centering something, evenly spacing a row of cards.

**How:**
```css
.container {
  display: flex;
  justify-content: space-between; /* main-axis alignment */
  align-items: center;              /* cross-axis alignment */
  gap: 12px;                          /* spacing between items, no manual margins needed */
}
```
`flex-direction: column` switches the main axis from horizontal to vertical — `justify-content` then controls vertical alignment instead.

---

## Grid — for two-dimensional layout (rows *and* columns)

**What:** A layout system for arranging items into an actual grid.

**When:** Page layouts, image galleries, dashboards — anything genuinely two-dimensional. If you only need a single row or column, Flexbox is usually simpler.

**How:**
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal-width columns */
  gap: 16px;
}
```

**Common mistake:** Reaching for Grid when Flexbox would do (or vice versa) — the rule of thumb: one dimension → Flexbox, two dimensions → Grid.

---

## Responsive design (media queries)

**What:** CSS rules that only apply under certain conditions — most commonly, screen width.

**Why:** One layout rarely works well on both a phone and a desktop monitor.

**How:**
```css
.container {
  display: grid;
  grid-template-columns: 1fr; /* single column by default (mobile-first) */
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr; /* two columns on larger screens */
  }
}
```
**Mobile-first** (start with the smallest screen's styles, add complexity for larger screens via `min-width` queries) is generally the more maintainable approach vs. designing desktop-first and trying to cram it down.

---

## CSS specificity (why a style "isn't working")

**What:** The rules that decide which CSS rule wins when multiple rules target the same element.

**Rough ranking, low to high specificity:**
1. Element selectors (`div`, `p`)
2. Class selectors (`.card`)
3. ID selectors (`#header`)
4. Inline styles (`style="..."`)
5. `!important` (overrides everything — avoid it; it makes future overrides painful)

**Common mistake:** Reaching for `!important` to fix a style that "isn't applying," instead of figuring out what more-specific rule is actually winning. `!important` should be a last resort, not a first fix.

---

## Common utility patterns worth memorizing

```css
/* Center anything, both axes */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Truncate text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Visually hide but keep accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}
```