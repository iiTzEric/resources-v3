# Components & Props

**Module:** React
**Prerequisites:** [`02-jsx`](../02-jsx)

## What is it?

A **component** is a reusable, self-contained piece of UI, written as a JavaScript function
returning JSX. **Props** ("properties") are how data flows into a component from whatever renders
it — analogous to function parameters.

## Why does it matter?

Components are the basic building block of every React application — breaking a UI into small,
focused, reusable pieces is how React apps stay manageable as they grow, mirroring the same
"separation of concerns" principle you've already seen with functions.

## How does it work?

### Defining and using a component

```jsx
function Greeting() {
  return <h1>Hello!</h1>;
}

function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
    </div>
  );
}
```

Components are used like custom HTML tags (`<Greeting />`), and can be reused as many times as
needed, each instance independent of the others.

### Props — passing data in

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Ben" />
    </div>
  );
}
```

Props are passed like HTML attributes, and received as an object parameter — destructured
directly, using the same destructuring syntax you already know from JavaScript. Each `<Greeting
name="..." />` instance receives its own independent `name` value.

### Props are read-only

A component should never modify its own props directly — props flow one direction, from parent to
child. If a component needs to change something over time, that's what **state** (covered next) is
for, not mutating props.

### Passing multiple props, including functions

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  function handleClick() {
    console.log("Clicked!");
  }
  return <Button label="Click me" onClick={handleClick} />;
}
```

Props aren't limited to simple values — functions can be passed as props too, letting a child
component (`Button`) trigger behavior defined by its parent (`App`), without `Button` needing to
know what that behavior actually does.

### Default prop values

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}
```

Using the same default-parameter syntax from JavaScript, directly in the destructuring pattern.

## Simple Example

```jsx
function ProductCard({ name, price, onAddToCart }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

function App() {
  function handleAdd() {
    console.log("Added to cart!");
  }
  return <ProductCard name="Widget" price={9.99} onAddToCart={handleAdd} />;
}
```

## Let's Break It Down

- `ProductCard` receives three props: `name`, `price`, and `onAddToCart` — a function.
- It doesn't know or care what `onAddToCart` actually does — it just calls it when the button is
  clicked, letting `App` (or whatever renders `ProductCard`) define the real behavior.
- This separation — `ProductCard` handles display, `App` handles behavior — is exactly the kind of
  clean component boundary you'll aim for throughout real React applications.

## Common Mistakes

- **Trying to modify a prop directly inside the component that receives it** — props are read-only;
  changes should flow from state in a parent component, passed back down as updated props.
- **Forgetting to destructure props**, and repeatedly writing `props.name`, `props.price`
  throughout instead of the cleaner destructured form.
- **Passing too many unrelated props to one component**, a sign it might be doing too much and
  could be split into smaller, more focused components.

## When Should I Use It?

Break UI into components whenever a piece of markup is reused, or represents a clearly separable
piece of the interface — even if used only once, a well-named component can make a large page far
more readable than one giant returned JSX block.

## Exercises

1. **(Recall)** What's the relationship between props and function parameters?
2. **(Application)** Write a `UserCard` component accepting `name` and `email` props, and use it
   twice in an `App` component with different data.
3. **(Problem Solving)** A component tries to do `props.name = "New Name"` inside its own body to
   change what it displays, and this doesn't work as intended. Explain why, and what the correct
   approach would be.

## What Should I Learn Next?

Continue to [`04-state-and-events`](../04-state-and-events) — giving a component its own memory
that can change over time, using `useState`.
