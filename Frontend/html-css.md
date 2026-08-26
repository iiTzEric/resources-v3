# HTML and CSS

HTML gives a page meaning and structure. CSS controls its presentation and responsive layout.

## Semantic HTML

Choose elements by meaning: `header`, `nav`, `main`, `section`, `form`, `label`, `button`, and `footer`. Semantic elements improve keyboard navigation, screen-reader output, and maintainability.

```html
<form id="task-form">
  <label for="title">Task title</label>
  <input id="title" name="title" required maxlength="200" />
  <button type="submit">Add task</button>
</form>
```

A `label` must identify its input. A button inside a form submits by default, so set `type="button"` for buttons that should not submit.

## Layout

Use Flexbox for one-dimensional layouts and Grid for rows and columns.

```css
.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

The `minmax` rule lets cards fit different screen widths without hard-coding a desktop-only layout.

## Responsive and accessible styling

```css
:root {
  color-scheme: light;
  font-family: system-ui, sans-serif;
}

button:focus-visible,
input:focus-visible {
  outline: 3px solid #2457d6;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

Do not use color alone to communicate status. Keep text labels or accessible names, maintain readable contrast, and test the layout on a narrow viewport.
