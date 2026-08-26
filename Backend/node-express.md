# Node.js and Express

## What they do

Node.js runs JavaScript outside the browser. Express is a small web framework for Node.js that turns HTTP requests into routes and middleware calls.

A request normally flows through JSON parsing, authentication or validation middleware, a route handler, and finally the error handler if something fails.

## Setup

From the repository root:

```bash
cd Backend
npm install
cp .env.example .env
```

Choose one database track, fill in its environment variables, and start its server:

```bash
npm run start:mongo
# or
npm run start:postgres
```

## Minimal Express app

```js
const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(process.env.PORT || 3000);
```

`express.json()` is required before routes that read JSON request bodies. Error middleware has four parameters, including `next`, so Express recognizes it as an error handler. Register it after routes.

## Environment variables

Never commit `.env`. Use `.env.example` as a list of required names, and validate secrets when the application starts. Keep database credentials and JWT secrets on the server; a browser bundle must never receive them.

## CORS

If the browser frontend runs at a different origin, enable CORS for that exact origin. CORS lets the browser make an allowed cross-origin request; it does not authenticate a user.

```js
const cors = require("cors");
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
```

Install it with `npm install cors`. Avoid `origin: '*'` when using cookies or other credentials.

## Common mistakes

- Registering error middleware before routes means route errors may bypass it.
- Trusting `userId` from a request body lets a user create data for another user. Take ownership from the verified token.
- Returning database errors directly can reveal schema details. Map known errors and use a generic message for unexpected failures.
