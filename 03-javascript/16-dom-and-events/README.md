# The DOM & Events

**Module:** JavaScript
**Prerequisites:** [`15-event-loop-call-stack-tasks`](../15-event-loop-call-stack-tasks)

## What is it?

The **DOM** (Document Object Model) is how JavaScript "sees" an HTML page — as a tree of objects it
can read and modify live, after the page has loaded. **Events** are how JavaScript reacts to things
happening on the page: clicks, typing, page loads.

## Why does it matter?

Before any framework, this is the actual mechanism behind every interactive webpage — clicking a
button, filling a form, seeing content update without a page reload. Understanding it directly
(rather than only through a framework like React) explains what a framework is actually doing
underneath, and remains useful anytime you're not using one.

## How does it work?

### Selecting elements

```javascript
const button = document.querySelector("button");
const allItems = document.querySelectorAll(".item"); // returns a NodeList of ALL matches
```

`querySelector` takes any CSS-style selector and returns the *first* matching element.
`querySelectorAll` returns *every* matching element, as a NodeList (array-like, and usable with
`.forEach()`, though not every array method works directly on it without converting it first).

### Modifying content and style

```javascript
const heading = document.querySelector("h1");
heading.textContent = "New Title";     // plain text, safest option
heading.innerHTML = "<em>New</em> Title"; // parses and inserts real HTML — riskier, see below
heading.style.color = "blue";
heading.classList.add("highlighted");
heading.classList.remove("hidden");
heading.classList.toggle("active");     // adds if absent, removes if present
```

`textContent` is generally the safer default for inserting text, since it never interprets its
input as HTML — `innerHTML`, if ever used with untrusted, user-provided text, can enable a real
security vulnerability (script injection), covered properly in the Backend module's Security topic.

### Listening for events

```javascript
button.addEventListener("click", function(event) {
  console.log("Clicked!", event.target);
});
```

`addEventListener` is a higher-order function (from the earlier topic) — it stores the callback and
runs it whenever the specified event actually occurs. `event` (often named `e`) carries information
about what happened, including `event.target` — the exact element that triggered the event.

### Event delegation — one listener for many elements

```javascript
const list = document.querySelector("#itemList");

list.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest(".item").remove();
  }
});
```

Rather than attaching a separate listener to every single button (especially ones created
dynamically after the page loads), attaching **one** listener to a shared parent and checking
`event.target` is more efficient and automatically works even for elements added later — since the
listener is on the parent, which never gets destroyed, rather than on individual children that might
be created and destroyed repeatedly.

### Preventing default behavior

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // stops the default page reload/navigation
  // ... custom handling instead ...
});
```

Many elements have built-in default behaviors (forms reload the page on submit, links navigate on
click) — `event.preventDefault()` stops that default behavior so your own JavaScript can take over
instead.

### Event bubbling — events travel upward through the DOM tree

```html
<div id="outer">
  <button id="inner">Click</button>
</div>
```

```javascript
document.querySelector("#outer").addEventListener("click", () => console.log("outer"));
document.querySelector("#inner").addEventListener("click", () => console.log("inner"));

// clicking the button logs: "inner", then "outer"
```

Clicking `#inner` triggers its own listener first, then the event "bubbles" upward, also triggering
listeners on its ancestors. This bubbling behavior is exactly what makes event delegation (above)
work at all — a click on a deeply nested child element still reaches a listener attached to a
distant parent.

## Simple Example

```javascript
const list = document.querySelector("#todoList");

document.querySelector("#addBtn").addEventListener("click", function() {
  const input = document.querySelector("#todoInput");
  const li = document.createElement("li");
  li.textContent = input.value;
  list.appendChild(li);
  input.value = "";
});
```

## Let's Break It Down

- Clicking the add button reads the current input value, creates a brand-new `<li>` element
  entirely in JavaScript (`document.createElement`), sets its text, and appends it into the list —
  this is manual DOM manipulation of exactly the kind React automates for you, based on state
  changes.
- Clearing `input.value` afterward resets the text field for the next entry.
- This pattern — read input, create/modify elements, update the DOM directly — is precisely the
  imperative style you moved away from once you adopted React's declarative approach; seeing it
  explicitly here should make that contrast concrete.

## Common Mistakes

- **Using `innerHTML` with untrusted or user-provided content**, risking script injection — prefer
  `textContent` unless you specifically need to insert real HTML markup, and never with unsanitized
  user input.
- **Attaching a separate listener to every item in a dynamic list**, instead of using event
  delegation on a stable parent — missing listeners on elements added after the page initially
  loaded is a common resulting bug.
- **Forgetting `event.preventDefault()`** on a form submit handler, causing an unwanted page reload
  alongside (or instead of) custom JavaScript handling.

## When Should I Use It?

Use direct DOM manipulation for simple pages without a framework, or to understand what frameworks
like React automate for you. Use event delegation whenever dealing with lists of similar,
potentially dynamically-created elements, rather than attaching individual listeners to each one.

## Exercises

1. **(Recall)** What's the difference between `textContent` and `innerHTML`, and why is one
   generally safer for untrusted input?
2. **(Understanding)** Explain why event delegation continues to work correctly even for elements
   added to the page after the listener was originally set up.
3. **(Application)** Write JavaScript that adds a click listener to a `<ul id="list">` using event
   delegation, removing any `<li>` whose text is clicked directly.

## What Should I Learn Next?

Continue to [`17-fetch-and-http-requests`](../17-fetch-and-http-requests) — combining everything
from async/await with the DOM: making real network requests and updating the page with the results.
