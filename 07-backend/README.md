# Backend Development

**Prerequisites:** 03-javascript, 05-web-fundamentals

Building the server side of an application: APIs, data validation, authentication, and how frontend and backend actually communicate.

## Topics In This Module

- [`01-servers-and-http/`](./01-servers-and-http) — **Servers & HTTP**: What a server is, and handling requests/responses with Node + Express.
- [`02-request-response-cycle/`](./02-request-response-cycle) — **The Request/Response Cycle**: Tracing a request from client to server and back, end to end.
- [`03-rest-apis/`](./03-rest-apis) — **REST APIs**: REST conventions, resources, and designing predictable endpoints.
- [`04-routing-controllers-services/`](./04-routing-controllers-services) — **Routing, Controllers & Services**: Structuring a backend: separating routes, logic, and data access.
- [`05-middleware/`](./05-middleware) — **Middleware**: Code that runs between request and response: logging, parsing, auth checks.
- [`06-validation/`](./06-validation) — **Input Validation**: Never trusting client input, and validating data before it touches your logic.
- [`07-error-handling/`](./07-error-handling) — **Error Handling**: Centralized error handling, meaningful status codes, and not leaking internals.
- [`08-authentication/`](./08-authentication) — **Authentication**: Proving who a user is: email/password flows and OAuth (e.g. Google sign-in).
- [`09-authorization/`](./09-authorization) — **Authorization**: What an authenticated user is allowed to do; roles and permissions.
- [`10-sessions-cookies-jwt/`](./10-sessions-cookies-jwt) — **Sessions, Cookies & JWT**: Different ways to track logged-in state, and their tradeoffs.
- [`11-password-hashing/`](./11-password-hashing) — **Password Hashing**: Why passwords are never stored in plain text, and how bcrypt/hashing works.
- [`12-file-uploads/`](./12-file-uploads) — **File Uploads**: Handling files sent from the client and where/how to store them.
- [`13-logging/`](./13-logging) — **Logging**: Recording what happened for debugging and monitoring, without over-logging.
- [`14-security/`](./14-security) — **Security Fundamentals**: Common vulnerabilities (injection, XSS, CSRF) and baseline defenses.
- [`15-environment-variables/`](./15-environment-variables) — **Environment Variables & Secrets**: Keeping credentials out of source code and out of git.
- [`16-api-architecture/`](./16-api-architecture) — **API Architecture**: Versioning, pagination, filtering, searching, and designing APIs that scale.

> Each topic folder contains a `README.md` lesson. Work through them in order — later topics assume earlier ones.