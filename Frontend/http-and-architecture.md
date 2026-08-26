# Frontend and API Architecture

A full-stack feature crosses a boundary:

`user action -> frontend state -> HTTP request -> backend route -> database -> JSON response -> frontend state`

Keep each responsibility clear. The browser renders and collects input. The backend authenticates, authorizes, validates, and owns database access.

## HTTP essentials

- `GET` reads data.
- `POST` creates data.
- `PATCH` partially updates data; `PUT` commonly replaces a resource.
- `DELETE` removes data.
- `2xx` means success, `4xx` means the request is invalid or unauthenticated, and `5xx` means the server failed.
- Headers carry metadata such as `Content-Type` and `Authorization`.
- A JSON body carries structured request or response data.

## Feature workflow

1. Render a loading state.
2. Validate obvious input in the browser for quick feedback.
3. Send the request through `api-client.js`.
4. Disable duplicate actions while it is pending.
5. Show an empty, success, or error state based on the response.
6. Refresh or update local state after a successful mutation.

The backend repeats validation because browser code can be bypassed.

## Authentication

After login, send the returned token in `Authorization: Bearer <token>`. The example client keeps the token in memory, which avoids persistent token storage but loses the session on reload. `localStorage` survives reloads but is readable by JavaScript; HttpOnly, Secure, SameSite cookies reduce token exposure but require CSRF protection and matching server configuration.

Never expose database URLs or JWT signing secrets to browser code. A frontend environment variable is public once bundled.

## CORS

When frontend and backend use different origins, the backend must allow the specific frontend origin. CORS is a browser policy; it is not authentication or authorization. Do not solve it with `Access-Control-Allow-Origin: *` when credentials are involved.
