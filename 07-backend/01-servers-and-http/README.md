# Servers & HTTP

**Module:** Backend Development
**Prerequisites:** [`03-javascript`](../../03-javascript), [`05-web-fundamentals`](../../05-web-fundamentals)

## What is it?

A **server** is a program that listens for incoming requests and sends back responses — the "other
half" of every `fetch()` call you've made throughout this curriculum. This topic builds your first
real server using **Node.js** and **Express**, the JS backend framework you'll use throughout this
module.

## Why does it matter?

Everything you've learned about HTTP, JSON, and client/server communication has, until now, been
from the *client* side — consuming APIs someone else built. This is where you build the other side
yourself, which is essential for understanding what actually happens behind any API you use.

## How does it work?

### Node.js — running JavaScript outside the browser

Node lets JavaScript run as a standalone program — no browser, no `document`/`window`. The
language is identical to what you already know; the *environment* it runs in is different (no DOM,
but access to the file system, networking, and more that browsers deliberately restrict).

### Express — a framework for building servers

```bash
npm init -y
npm install express
```

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

- **`app.get(path, handler)`** — "when a `GET` request arrives for this path, run this function."
- **`req`** (request) — information about the incoming request.
- **`res`** (response) — your tool for sending something back.
- **`app.listen(port, ...)`** — starts the server, listening on the specified port.

### Returning JSON

```javascript
app.get("/users", (req, res) => {
  const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Ben" }];
  res.json(users);
});
```

`res.json(...)` sends data back formatted as JSON — exactly the shape your `fetch` calls have
expected from every API you've consumed so far.

### The request/response direction, concretely

Recall the direction established in the Fundamentals APIs lesson: the **client** (a browser, or
`curl`) sends a request; the **server** receives it and sends a response. Running your own Express
server means you're now the one writing the code that *receives* requests and *responds* — the
exact other side of the relationship you've only interacted with as a consumer until now.

### Node doesn't hot-reload — a genuine, practical gotcha

Editing `server.js` while the server is already running has no effect until you manually restart it
(`Ctrl+C`, then `node server.js` again) — unlike a tool like Vite for React, which watches files
and reloads automatically. A tool called `nodemon` can be installed to auto-restart Node servers on
file changes, closing this gap.

## Simple Example

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## Let's Break It Down

- Two routes are defined: `/` returns plain text, `/health` returns JSON — demonstrating that
  `res.send()` and `res.json()` serve different purposes depending on what the client expects.
- `app.listen(3000, ...)` is what actually starts the server — without this line, the routes are
  defined but nothing is ever listening for real requests.
- Visiting `http://localhost:3000/health` in a browser (a `GET` request, since that's all a browser
  address bar can send) would display the raw JSON `{"status":"ok"}`.

## Common Mistakes

- **Forgetting `app.listen(...)`** — the server never actually starts, even though routes are
  correctly defined.
- **Editing server code and expecting changes to apply without restarting** — Node doesn't
  auto-reload by default.
- **Confusing `res.send()` and `res.json()`** — both can technically send data, but `res.json()`
  correctly sets the `Content-Type` header to indicate JSON, which matters for how clients parse
  the response.

## When Should I Use It?

Use Express (or a similar framework) whenever building a backend API in JavaScript — it's the
standard, widely-used choice, and everything in the rest of this module builds directly on it.

## Exercises

1. **(Recall)** What do `req` and `res` each represent in an Express route handler?
2. **(Application)** Write a server with a `GET /time` route that responds with the current date and
   time as JSON.
3. **(Problem Solving)** You edit a route's response text, save the file, refresh your browser, and
   still see the old response. Explain the most likely cause and the fix.

## What Should I Learn Next?

Continue to [`02-request-response-cycle`](../02-request-response-cycle) — tracing a request through
a backend in full detail, end to end.
