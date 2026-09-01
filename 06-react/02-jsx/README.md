# JSX

**Module:** React
**Prerequisites:** [`01-mental-model`](../01-mental-model)

## What is it?

JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript. Despite
looking like HTML, it's not a string and not real HTML — it's JavaScript syntax that compiles into
regular function calls that create UI elements.

## Why does it matter?

Understanding that JSX is "just JavaScript" (compiled) rather than a separate templating language
demystifies its rules — why `{}` drops back into real JS, why certain HTML attributes are renamed,
and why a component must return one single element.

## How does it work?

### Embedding JavaScript expressions with `{}`

```jsx
const name = "Alice";
const element = <h1>Hello, {name}!</h1>;
```

Curly braces `{}` inside JSX drop back into ordinary JavaScript — any valid expression works:
variables, function calls, arithmetic, ternaries.

### `className`, not `class`

```jsx
<div className="card">...</div>
```

`class` is a reserved word in JavaScript (used for actual classes) — JSX uses `className` instead,
which compiles to the real HTML `class` attribute.

### A component must return one root element

```jsx
// INVALID — two sibling elements with nothing wrapping them
function Broken() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}
```

```jsx
// VALID — wrapped in a single parent
function Fixed() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}
```

If you don't want an extra wrapping `<div>` in the actual rendered HTML, use a **Fragment**:

```jsx
function Fixed() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```

`<>...</>` is shorthand for `<React.Fragment>...</React.Fragment>` — groups elements for JSX's
"one root" rule without adding an actual extra element to the rendered page.

### Self-closing tags are required

```jsx
<img src="photo.jpg" />  // note the required trailing slash
<br />
```

Unlike HTML, where some tags can be left unclosed, JSX requires every element to be explicitly
closed, including ones with no children.

### Conditional and list rendering preview

```jsx
{isLoggedIn ? <p>Welcome back</p> : <p>Please log in</p>}
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

Since `{}` is just JavaScript, ternaries and `.map()` work directly inside JSX — these get their own
dedicated topics shortly, introduced here just to show they're not special JSX features, just
ordinary JS expressions.

## Simple Example

```jsx
function Card({ title, price }) {
  const formattedPrice = `$${price.toFixed(2)}`;
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{formattedPrice}</p>
    </div>
  );
}
```

## Let's Break It Down

- `{title}` and `{formattedPrice}` both drop back into JS to insert dynamic values — `title` comes
  directly from props (covered next), `formattedPrice` is computed just above using ordinary
  JavaScript.
- `className="card"` compiles to a real `class="card"` attribute in the rendered HTML.
- The whole component returns a single `<div>`, satisfying JSX's one-root-element rule.

## Common Mistakes

- **Using `class` instead of `className`** out of HTML habit.
- **Returning multiple sibling elements with no wrapper**, forgetting the one-root-element rule (or
  forgetting Fragments exist as a way to satisfy it without an extra real element).
- **Forgetting to self-close tags** like `<img>` or `<input>`.
- **Writing plain text conditionals or loops directly**, forgetting they need to be wrapped in
  `{}` to be treated as JavaScript rather than literal text.

## When Should I Use It?

JSX is how you write essentially all React component output — there isn't really an alternative
worth reaching for once you're using React, though it's useful to remember it's shorthand for
plain function calls under the hood, not magic.

## Exercises

1. **(Recall)** Why does JSX use `className` instead of `class`?
2. **(Application)** Fix this invalid JSX: `return (<h1>Hi</h1><p>Bye</p>);`
3. **(Problem Solving)** A component returns a `<img>` tag without a trailing slash and React
   throws a syntax error. Explain the rule being violated.

## What Should I Learn Next?

Continue to [`03-components-and-props`](../03-components-and-props) — building reusable
components and passing data into them.
