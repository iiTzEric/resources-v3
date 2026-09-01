# Fetch & HTTP Requests

**Module:** JavaScript
**Prerequisites:** [`16-dom-and-events`](../16-dom-and-events)

## What is it?

The **Fetch API** (`fetch()`) is JavaScript's built-in way to make HTTP requests from the browser —
retrieving data from a server, or sending data to one. This topic ties together async/await, the
DOM, and the general HTTP/API concepts from Fundamentals into the specific, practical pattern you'll
use constantly.

## Why does it matter?

This is genuinely one of the most common real things JavaScript does — loading data from a server
and updating the page with it, or sending user-submitted data somewhere. Getting this pattern
correct (including proper error handling) is essential, and it's the exact mechanism you'll continue
using once you reach React and building your own backend.

## How does it work?

### A basic `GET` request

```javascript
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);
}
```

`fetch(url)` returns a Promise that resolves once the response *headers* arrive — notably, **not**
once the full body is available. That's why a second `await response.json()` is needed: parsing the
JSON body is itself a separate asynchronous step.

### Always check `response.ok`

```javascript
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const users = await response.json();
  return users;
}
```

`fetch` only rejects (throws) on genuine network failures (no connection at all) — a response with
status `404` or `500` still counts as a "successful" fetch from JavaScript's perspective, since a
response genuinely did come back. `response.ok` is `true` only for status codes in the 200-299
range; checking it explicitly is the correct way to detect an unsuccessful request.

### Sending data — a `POST` request

```javascript
async function createUser(name, email) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });
  return await response.json();
}
```

- **`method: "POST"`** — overrides the default `GET`.
- **`headers`** — tells the server what kind of data is in the request body.
- **`body: JSON.stringify(...)`** — the actual data, converted to a JSON string, since HTTP request
  bodies are just text (same underlying reason `JSON.stringify`/`JSON.parse` are needed for files
  and `localStorage`).

### Full error handling, combining everything from this module

```javascript
async function loadUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load users:", error.message);
    throw error;
  }
}
```

This combines: `async`/`await` for readable asynchronous flow, `try`/`catch` for error handling, and
an explicit `response.ok` check — genuinely the complete, correct pattern for a real fetch call, not
a simplified teaching version.

### CORS — a browser security restriction you'll encounter

Browsers block a webpage from one origin (domain + port) from freely making requests to a different
origin, unless that other server explicitly allows it (via specific response headers). This is
**CORS** (Cross-Origin Resource Sharing) — a genuine, common source of confusing errors the first
time you connect a frontend to your own backend, covered in full practical detail in the Backend
module.

## Simple Example

```javascript
async function searchUsers(query) {
  const response = await fetch(`https://api.example.com/users?search=${query}`);
  if (!response.ok) {
    throw new Error("Search failed");
  }
  const results = await response.json();
  return results;
}
```

## Let's Break It Down

- The URL includes the search term directly, appended as a query parameter (`?search=${query}`) —
  a standard way to pass extra information to a `GET` request.
- `response.ok` is checked before assuming the search succeeded, since a failed search request can
  still technically "arrive" as a response.
- Returning the parsed results (rather than logging them directly inside this function) lets
  whoever calls `searchUsers` decide what to actually do with the data — a more reusable, flexible
  design than hardcoding the response handling inside the fetch function itself.

## Common Mistakes

- **Assuming `fetch` throws on any unsuccessful request.** It only rejects on genuine network
  failures — explicit `response.ok` checking is required to catch `4xx`/`5xx` status codes.
- **Forgetting the second `await` for `.json()`**, and trying to use the raw `Response` object as if
  it were already the actual data.
- **Not setting the `Content-Type` header on a `POST` request**, which can cause the server to fail
  to parse the request body correctly.
- **Hardcoding a fetch URL that changes between development and production**, instead of using an
  environment variable (covered in the Backend module).

## When Should I Use It?

Use `fetch` for any request to a server from the browser. Always check `response.ok` explicitly.
Wrap fetch calls in `try`/`catch` for network-level failures, and handle non-`ok` responses
explicitly with your own thrown errors, giving calling code a consistent way to detect and respond
to failures either way.

## Exercises

1. **(Recall)** Why doesn't `fetch` automatically reject/throw for a `404` response?
2. **(Application)** Write an `async` function `deleteUser(id)` that sends a `DELETE` request to
   `https://api.example.com/users/${id}`, checks for success, and throws a clear error if it fails.
3. **(Problem Solving)** A fetch call to a working API URL fails in the browser console with a CORS
   error, but works fine when tested directly with `curl`. Explain why these two tools behave
   differently here.

## What Should I Learn Next?

Continue to [`18-browser-storage`](../18-browser-storage) — persisting data on the client side,
building on the `JSON.stringify`/`JSON.parse` pattern you've now used across files, APIs, and
storage alike.
