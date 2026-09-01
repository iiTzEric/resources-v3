# HTTP In Depth

**Module:** Web Fundamentals
**Prerequisites:** [`04-css-layout`](../04-css-layout)

## What is it?

This topic expands on Fundamentals' introduction to HTTP with more precise, practical detail on
methods, status codes, and headers — the exact vocabulary you'll use constantly once building real
APIs in the Backend module.

## Why does it matter?

A precise understanding of HTTP is what lets you design sensible APIs and correctly diagnose
problems (a `401` calls for different action than a `500`) rather than treating every failure
identically.

## How does it work?

### HTTP methods, precisely

- **`GET`** — retrieve data; should never modify server state; safe to repeat/cache.
- **`POST`** — create something new, or trigger a non-idempotent action.
- **`PUT`** — replace an existing resource entirely.
- **`PATCH`** — update part of an existing resource.
- **`DELETE`** — remove a resource.

**Idempotency** is a useful concept here: an idempotent operation produces the same end result no
matter how many times it's repeated. `GET`, `PUT`, and `DELETE` are conventionally idempotent
(deleting something already deleted, or setting something to the same value twice, changes
nothing further); `POST` generally is not (submitting the same "create a new order" request twice
typically creates two orders).

### Status code categories

- **1xx** — informational (rarely seen directly in everyday work).
- **2xx** — success (`200` OK, `201` Created, `204` No Content).
- **3xx** — redirection (`301` Moved Permanently, `304` Not Modified).
- **4xx** — client error — the request itself was invalid (`400` Bad Request, `401` Unauthorized,
  `403` Forbidden, `404` Not Found, `409` Conflict).
- **5xx** — server error — something broke on the server's side (`500` Internal Server Error, `503`
  Service Unavailable).

Recognizing the *category* (4xx vs 5xx) immediately tells you where to look first: a 4xx means
something about the request itself needs fixing (on the client side); a 5xx means the problem is on
the server, regardless of how correct the request was.

### Headers — metadata carried with every request/response

```
Content-Type: application/json
Authorization: Bearer <token>
Cache-Control: no-cache
```

- **`Content-Type`** tells the receiving side what format the body is in (JSON, HTML, an image).
- **`Authorization`** carries credentials proving who's making the request — covered in depth in the
  Backend module's Authentication topic.
- **`Cache-Control`** influences whether/how responses can be cached and reused.

### The request/response anatomy, precisely

```
GET /users/5 HTTP/1.1
Host: api.example.com
Authorization: Bearer abc123

---

HTTP/1.1 200 OK
Content-Type: application/json

{"id": 5, "name": "Alice"}
```

The request line specifies the method and path; headers follow; an optional body comes after (not
present here, since `GET` requests typically don't have one). The response starts with a status
line, then its own headers, then its body.

## Simple Example

A realistic API interaction sequence:

```
1. POST /login    -> 200 OK, returns an auth token
2. GET /profile with Authorization header -> 200 OK, returns profile data
3. GET /profile with no/invalid token -> 401 Unauthorized
4. GET /users/9999 (doesn't exist) -> 404 Not Found
5. POST /orders with malformed data -> 400 Bad Request
```

## Let's Break It Down

- Each scenario maps to a distinct status code category, communicating precisely what kind of
  outcome occurred without needing to inspect the response body to know the basic shape of what
  happened.
- Scenario 3 and 4 are both "the thing you asked for isn't available," but for different reasons —
  `401` means "you're not properly authenticated," `404` means "this resource genuinely doesn't
  exist" — a well-designed API distinguishes these deliberately, since the appropriate client
  response differs (log in again, versus stop looking for something that isn't there).

## Common Mistakes

- **Returning `200` for everything, including actual failures**, forcing clients to parse the
  response body just to determine success/failure — status codes exist precisely to avoid this.
- **Confusing `401` and `403`** — `401` means "we don't know who you are" (not authenticated);
  `403` means "we know who you are, and you're not allowed to do this" (not authorized).
- **Treating every non-2xx response identically**, missing the useful distinction between client
  errors (fix the request) and server errors (the problem isn't yours to fix at the request level).

## When Should I Use It?

Use this vocabulary precisely when designing your own APIs (in the Backend module) and when
debugging any HTTP-based issue — the status code and method involved are usually the fastest path to
understanding what actually went wrong.

## Exercises

1. **(Recall)** What's the difference between a 4xx and a 5xx status code, in terms of where the
   problem lies?
2. **(Understanding)** Explain the practical difference between `401` and `403`.
3. **(Application)** For each scenario, name the appropriate HTTP method: creating a new comment;
   fully replacing a user's profile; changing just a user's email; deleting a post; fetching a list
   of products.

## What Should I Learn Next?

Continue to [`06-browsers-and-rendering`](../06-browsers-and-rendering) — how a browser actually
turns the HTML/CSS/JS from an HTTP response into pixels on screen.
