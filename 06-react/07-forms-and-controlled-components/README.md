# Forms & Controlled Components

**Module:** React
**Prerequisites:** [`06-lists-and-keys`](../06-lists-and-keys)

## What is it?

A **controlled component** is a form input whose value is driven entirely by React state, rather
than the DOM holding the value itself. Instead of reaching into the DOM to read `.value` when
needed (the vanilla JS approach), state holds the current value at all times, and the input simply
displays it.

## Why does it matter?

This lets other parts of your UI react instantly to what's being typed — live search, real-time
validation, character counts — since the current value always lives in state, accessible anywhere,
rather than trapped inside the DOM until you go looking for it.

## How does it work?

### A controlled text input

```jsx
function NameForm() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

- **`value={name}`** — the input always displays whatever `name` currently is.
- **`onChange`** — fires on every keystroke; `e.target.value` is the current text (identical to
  vanilla JS's `event.target.value`).
- **`setName(e.target.value)`** — immediately updates state on every keystroke, and React
  re-renders the input to display that new state value.

This creates a tight loop: type → `onChange` fires → state updates → re-render → input displays the
new state — functionally invisible to the user (it feels like normal typing), but structurally,
React is "controlling" the input's displayed value at every moment.

### Handling a full form with multiple inputs

```jsx
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

`onSubmit` on the `<form>` itself (not the button), and `e.preventDefault()`, work exactly as they
did with vanilla JS form handling — React's synthetic event system mirrors the native DOM event
API closely here.

### Checkboxes and other input types

```jsx
const [agreed, setAgreed] = useState(false);

<input
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

Checkboxes use `checked` (a boolean) rather than `value`, and `e.target.checked` rather than
`e.target.value` — otherwise, the same controlled pattern applies.

### Managing multiple fields with one state object

```jsx
function SignupForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </form>
  );
}
```

`[e.target.name]: e.target.value` uses a **computed property name** (square brackets around a
dynamic key in an object literal) — matching whichever input actually changed, based on its `name`
attribute, while spreading (`...formData`) preserves every other field untouched. This is a
genuinely common pattern once a form has several fields, avoiding a separate `useState` call for
every single input.

## Simple Example

```jsx
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>You typed: {searchTerm}</p>
    </div>
  );
}
```

## Let's Break It Down

- A single controlled input, with `value` and `onChange` both tied to the same `searchTerm` state.
- The `<p>` below reflects `searchTerm` live, on every keystroke, since both it and the input are
  driven by the exact same underlying state — demonstrating the "one source of truth, multiple
  places reflecting it" idea directly.

## Common Mistakes

- **Setting `value` without an `onChange` handler**, which makes the input appear "frozen" — since
  nothing ever updates the state driving its displayed value, React overrides whatever was typed
  with the unchanged state on every render.
- **Forgetting `e.preventDefault()` on form submission**, causing an unwanted full-page reload.
- **Mutating the state object directly** in a multi-field form (`formData.name = ...` instead of
  spreading into a new object) — this won't trigger a re-render and risks the same mutation issues
  covered in the JavaScript Memory Basics/Objects topics.

## When Should I Use It?

Use controlled components as the default approach for form inputs in React — it enables live
validation, conditional UI based on current input, and keeps a single, clear source of truth for
form data.

## Exercises

1. **(Recall)** What two props make an `<input>` "controlled" in React?
2. **(Application)** Build a form with `name` and `message` fields using a single state object,
   updating both via one shared `handleChange` function.
3. **(Problem Solving)** An input has `value={text}` but no `onChange` handler, and the user reports
   they "can't type anything" into it. Explain precisely why.

## What Should I Learn Next?

Continue to [`08-useeffect-and-side-effects`](../08-useeffect-and-side-effects) — handling things
outside React's normal render flow, like fetching data.
