# How The Web Works

**Module:** Web Fundamentals
**Prerequisites:** [`01-fundamentals`](../../01-fundamentals), basic JavaScript

## What is it?

This topic traces the complete journey of what actually happens between typing a URL into a
browser and seeing a rendered page — DNS lookups, servers, and how all the pieces from the
Fundamentals APIs/HTTP lesson fit into one concrete, real flow.

## Why does it matter?

You've learned HTTP, client/server relationships, and APIs conceptually. This topic makes it
concrete and complete, filling in the piece that happens *before* any of that — how a browser even
finds the right server to talk to in the first place.

## How does it work?

### The full journey, step by step

1. **You type `www.example.com` into your browser** and press enter.
2. **DNS lookup** — `www.example.com` is a human-friendly name, but computers actually communicate
   using numeric IP addresses (like `93.184.216.34`). **DNS** (Domain Name System) is essentially the
   internet's phone book — your browser asks a DNS server "what IP address does this domain name
   correspond to?" and gets an answer back.
3. **Establishing a connection** — your browser opens a connection to the server at that IP address,
   typically using **TCP** (a reliable, ordered way of sending data) and, for secure sites, **TLS**
   (the encryption layer behind `https://`, as opposed to unencrypted `http://`).
4. **Sending the HTTP request** — your browser sends an HTTP `GET` request (from the Fundamentals
   APIs/HTTP lesson) to that server, asking for the specific page.
5. **The server processes the request** — this might mean simply returning a stored HTML file, or
   (for a dynamic site) running backend code, possibly querying a database, and building the HTML
   response on the fly — this is exactly the request/response cycle you'll build yourself in the
   Backend module.
6. **The response travels back** — HTML, CSS, and JavaScript files (or references to them) come back
   to your browser as the HTTP response body.
7. **The browser renders the page** — parsing the HTML, applying CSS, and running any JavaScript,
   covered in detail in this module's Browsers & Rendering topic.

### Why `https://` matters

`https://` (versus plain `http://`) means the connection is encrypted — data traveling between your
browser and the server can't be easily read or tampered with by anyone intercepting it along the
way. Modern browsers actively warn users about, or restrict features on, plain `http://` sites,
since sending data (like a password) over an unencrypted connection is a genuine security risk.

### Domains, subdomains, and ports

```
https://api.example.com:443/users
```

- `example.com` — the core **domain**.
- `api.` — a **subdomain**, often used to separate different services (an API versus a main
  website) under the same overall domain.
- `443` — the **port**, effectively a specific "channel" on the server (443 is the standard default
  for `https`, so it's usually omitted in URLs you type).

### Why this matters for the CORS behavior you've already encountered

Recall from the JavaScript Fetch topic: CORS restricts requests between different **origins** — an
origin is specifically the combination of protocol (`http`/`https`), domain, and port together.
`localhost:3000` and `localhost:5173` are different origins purely because of the different port,
exactly the scenario that caused the CORS error you debugged earlier in your own project work.

## Simple Example

Tracing a real request conceptually:

```
You type: https://jsonplaceholder.typicode.com/users

1. DNS: "jsonplaceholder.typicode.com" -> some IP address
2. Browser connects to that IP over HTTPS (encrypted)
3. Browser sends: GET /users HTTP/1.1
4. Server processes the request, builds a JSON response
5. Response travels back: 200 OK, with the JSON body
6. Browser (or your JS fetch() call) receives and uses the data
```

## Let's Break It Down

- This is genuinely the same flow underlying every single `fetch()` call you've made throughout
  this curriculum — the DNS/connection steps happen automatically, invisibly, every time, before
  your actual HTTP request and response ever occur.
- The "server processes the request" step is deliberately vague here because it varies completely
  depending on what's on the other end — a static file, or (as you'll build yourself) an Express
  route running real logic and querying a database.

## Common Mistakes

- **Assuming a URL directly "is" the server**, rather than understanding it as a human-readable
  address that gets translated (via DNS) to an actual network location.
- **Not distinguishing `http://` from `https://`**, and the real security implications of sending
  data unencrypted.
- **Forgetting that port differences create different origins**, causing confusion when
  troubleshooting CORS issues later.

## When Should I Use It?

This is foundational background knowledge rather than something you "apply" directly day to day —
but it becomes genuinely useful whenever debugging network issues, understanding why a request goes
to the wrong place, or reasoning about security and CORS.

## Exercises

1. **(Recall)** What does DNS actually do, in plain language?
2. **(Understanding)** Explain why `http://localhost:3000` and `http://localhost:5173` count as
   different origins for CORS purposes, even though both are technically "localhost."
3. **(Application)** Break down the URL `https://shop.example.com:8080/products` into its protocol,
   subdomain, domain, port, and path.

## What Should I Learn Next?

Continue to [`02-html-structure-and-semantics`](../02-html-structure-and-semantics) — now knowing
how a browser receives a page, the next topics build the actual content and structure it renders.
