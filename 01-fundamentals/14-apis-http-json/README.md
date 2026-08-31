# APIs, HTTP & JSON

**Module:** Programming Fundamentals
**Prerequisites:** [`13-modules-and-packages`](../13-modules-and-packages)

## What is it?

An **API** (Application Programming Interface) is a defined way for one program to ask another
program to do something or give it information. **HTTP** is the specific protocol (a set of agreed-
upon rules) that web-based APIs use to communicate, usually between a program running on your
computer/browser and a server somewhere else. **JSON** is the text format most commonly used to
package up the actual data being sent back and forth.

## Why does it matter?

Almost no modern application works entirely alone — a weather app needs real weather data from
somewhere; a shopping site needs to check real inventory; a mobile app needs to sync data across
devices. APIs are the mechanism that makes all inter-program communication possible, and HTTP/JSON
are the specific, standardized building blocks used almost universally on the web. This topic is
deliberately introduced here, at the fundamentals level, because it comes up in nearly every module
after this one.

## Mental Model

Think of an API like ordering food at a restaurant. You (the **client**) don't walk into the
kitchen and cook the food yourself — you tell the waiter (the **API**) what you want from a fixed
menu of options, the kitchen (the **server**) prepares it, and the waiter brings back a result.
Crucially, you don't need to know *how* the kitchen actually cooks the food — you only need to know
what you're allowed to order and what to expect back. That's the whole point of an API: it defines
a fixed, predictable way to ask for something, without exposing (or requiring you to understand)
everything happening behind the scenes.

## How does it work?

### The client/server relationship

- The **client** is whatever initiates a request — a browser, a mobile app, another server.
- The **server** is a program running somewhere else, waiting to receive requests and respond to
  them.
- A **request** goes from client to server, asking for something specific.
- A **response** comes back from server to client, containing the result (or an error).

This relationship is genuinely fundamental — it's the same shape whether you're calling a public
weather API, or (as you'll build in the Backend module) your own Express server responding to your
own React app's requests.

### HTTP — the rules of the conversation

HTTP defines a standard shape for requests and responses so any client can talk to any server,
regardless of what language or technology either side is built with. A few core pieces:

**HTTP methods** describe *what kind of action* a request represents:

- **`GET`** — "give me some data" — should not change anything on the server.
- **`POST`** — "here's some new data, please create/process something with it."
- **`PUT`/`PATCH`** — "update something that already exists."
- **`DELETE`** — "remove something."

**Status codes** tell you what happened, as a standardized number, included in every response:

- **`200`** — OK, success.
- **`201`** — Created (commonly returned after a successful `POST` that creates something new).
- **`400`** — Bad Request (the client sent something invalid).
- **`401`/`403`** — Unauthorized/Forbidden (not logged in, or not allowed to do this).
- **`404`** — Not Found.
- **`500`** — Internal Server Error (something went wrong on the server's side).

Recognizing these at a glance is genuinely useful — a `404` immediately tells you "the thing you
asked for doesn't exist at this address," which is a completely different problem to debug than a
`500`, which tells you "something broke on the server while handling this."

**Headers** carry extra metadata about a request or response — for example, a `Content-Type` header
telling the receiving side "the data in this request/response is JSON" (or an image, or plain
text, or something else).

### JSON — the shared data format

Since HTTP itself just moves raw text back and forth, there needs to be an agreed-upon way to
represent structured data (objects, arrays, numbers) as text. **JSON** (JavaScript Object Notation)
is that agreed-upon format, and despite the name, it's used across virtually every programming
language, not just JavaScript:

```json
{
  "name": "Alice",
  "age": 28,
  "hobbies": ["reading", "coding"]
}
```

This looks almost identical to a JavaScript object literal, which is not a coincidence — JSON's
syntax was directly based on it. The key practical detail: **JSON is just text**. A server doesn't
send you a "real" JavaScript object over the network — it sends the *text representation* of one,
and your program has to convert that text back into a usable object.

```javascript
const jsonText = '{"name": "Alice", "age": 28}';

const data = JSON.parse(jsonText); // text -> real object
console.log(data.name); // "Alice"

const backToText = JSON.stringify(data); // real object -> text
```

This is the exact same `JSON.parse`/`JSON.stringify` pair you may have already used with
`localStorage` or file I/O — the underlying need (converting between structured data and storable/
transmittable text) is identical whether you're saving to a file, saving to browser storage, or
sending data across a network.

### Putting it all together — a full request/response, described end to end

1. A client (say, a browser running some JavaScript) wants a list of users.
2. It sends an HTTP `GET` request to a specific URL (an **endpoint**), like
   `https://api.example.com/users`.
3. That request travels across the network to a server.
4. The server receives the request, does whatever work is needed (perhaps looking data up
   somewhere), and builds a response.
5. The server sends back an HTTP response: a status code (`200`, if successful), and a body
   containing the actual data, formatted as JSON text.
6. The client receives that response and parses the JSON text back into a usable array/object.

This entire flow is covered again, hands-on and in much more depth, in the JavaScript module's
Fetch topic and throughout the entire Backend module — this lesson's job is just to establish the
vocabulary and overall shape before you start actually building either side of it.

## Simple Example

A conceptual request/response pair, written out explicitly:

```
REQUEST
GET /users/1 HTTP/1.1
Host: api.example.com

RESPONSE
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

## Let's Break It Down

- The request line, `GET /users/1`, specifies both the **method** (`GET`, "give me data") and the
  **endpoint** (`/users/1`, specifically "user number 1").
- The response starts with `200 OK` — the status code confirming success — followed by a
  `Content-Type` header telling the client "what follows is JSON."
- The response **body** is the actual JSON data: a single object representing that specific user.
- If user `1` didn't exist, a well-designed API would instead respond with a `404` status and
  likely a small JSON body explaining the error, rather than pretending everything succeeded.

## Common Mistakes

- **Assuming a `GET` request can safely be used to change data.** By convention, `GET` requests
  should never modify anything on the server — this expectation is relied upon throughout the web
  (browsers, caches, and other tools all assume `GET` is "safe" to repeat without side effects).
- **Forgetting that JSON is just text, and needs explicit parsing.** Receiving a JSON response and
  trying to use it as if it were already a real object, without `JSON.parse`, leads to confusing
  errors.
- **Not checking the status code before assuming a request succeeded.** A response can technically
  "arrive" successfully over the network while still representing a failure (a `404` or `500`) —
  always check the status, don't assume every response means success.
- **Treating all status codes as either "worked" or "broke," instead of using them to understand
  the specific category of problem** — a `400` (bad request from the client) and a `500` (a genuine
  server-side problem) call for completely different debugging approaches.

## When Should I Use It?

Use `GET` for retrieving data without side effects, `POST` for creating something new, and
`PUT`/`PATCH`/`DELETE` for updating or removing existing data — following these conventions makes
your API predictable to anyone using it, including future you. Always design responses (and read
responses from APIs you consume) with status codes in mind, rather than only looking at the body of
the response.

## Exercises

1. **(Recall)** What do the status codes `200`, `404`, and `500` each generally indicate?
2. **(Understanding)** Explain, in your own words, why JSON needs to be "parsed" even though it
   looks just like a JavaScript object when you read it.
3. **(Application)** Using the restaurant analogy from this lesson, describe what a `GET` request, a
   `POST` request, and a `404` response would each correspond to in that scenario.
4. **(Problem Solving)** A request to an API returns a response with status `404` and an empty
   body. A developer assumes their code has a bug because "the request didn't return any data" —
   using what you learned about status codes, explain what's actually going on, and what the real
   next step should be (hint: it's not necessarily a code bug at all).

## What Should I Learn Next?

Continue to [`15-command-line-basics`](../15-command-line-basics) — you've now covered the core
programming concepts; the next two topics are about the practical tools (the terminal, and git) that
every professional developer uses daily, regardless of language or project.
