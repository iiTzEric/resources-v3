# JavaScript in the Browser

JavaScript adds behavior to HTML. It can read the document, respond to events, keep application state, and call an API.

## Modules

Use modules to split code by responsibility. A module has its own scope and can explicitly export what other files may use.

```js
// format.js
export function formatTask(task) {
  return task.completed ? `${task.title} (done)` : task.title;
}

// app.js
import { formatTask } from "./format.js";
```

Load the entry module with `<script type="module" src="./app.js"></script>`. Module paths need a file extension in the browser.

## DOM and events

```js
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#title");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(titleInput.value.trim());
});
```

`querySelector` finds an element. An event listener runs a function when something happens. `preventDefault()` stops a form from navigating away so the application can validate and submit the data itself.

## Async requests

`fetch()` returns a Promise. A Promise represents a result that may arrive later. Check `response.ok` before trusting the response as success; `fetch` does not reject just because the server returns 400 or 500.

```js
async function loadTasks() {
  const response = await fetch("http://localhost:3000/api/tasks");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

Use `try/catch/finally` around asynchronous UI work so loading state is cleared on both success and failure.

## Common mistakes

- Updating `innerHTML` with untrusted user content can create XSS. Prefer `textContent` for plain text.
- Starting duplicate requests from repeated clicks. Disable the submit button while a request is pending.
- Forgetting to handle empty, loading, and error states.
- Treating frontend validation as security. The backend must validate again.
