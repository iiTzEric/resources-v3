# Node.js

## What Node actually is

**What:** A runtime that lets you run JavaScript outside the browser — on a server, in a terminal, anywhere.

**Why:** JS was originally browser-only. Node uses the same V8 engine Chrome uses, but adds APIs for file systems, networking, and servers — the pieces a browser sandbox intentionally blocks.

**When:** Any time you need JS to do something a browser can't: run a server, read/write files, talk directly to a database.

---

## `npm` and `package.json`

**What:** `npm` (Node Package Manager) installs and manages third-party libraries. `package.json` is your project's manifest — its name, dependencies, and scripts.

**Why:** You rarely build everything from scratch — Express, Mongoose, etc. are all npm packages.

**How:**
```bash
npm init -y             # creates a starter package.json
npm install express      # installs express, adds it to package.json "dependencies"
npm install --save-dev nodemon  # a "devDependency" — only needed during development
npm run dev              # runs whatever script is named "dev" in package.json
```

```json
// package.json
{
  "name": "taskflow-backend",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Common mistake:** Committing `node_modules/` to Git. It's huge, machine-specific, and fully reproducible from `package.json` — always `.gitignore` it, and have teammates run `npm install` instead.

---

## CommonJS vs. ES Modules

**What:** Two different syntaxes for importing/exporting code in Node: `require`/`module.exports` (CommonJS, the original Node style) vs. `import`/`export` (ES Modules, the modern standard shared with browser JS).

**Why this matters:** Most tutorials mix both, which is confusing until you know they're two systems, not one.

**How:**
```js
// CommonJS (default in Node unless configured otherwise)
const express = require('express');
module.exports = router;

// ES Modules (requires "type": "module" in package.json)
import express from 'express';
export default router;
```

**When:** For new projects, ES Modules (`import`/`export`) is the more modern, consistent choice — set `"type": "module"` in `package.json`. But you'll see plenty of `require` in older tutorials and existing codebases; you need to recognize both even if you write only one.

---

## The file system module

**What:** Node's built-in `fs` module for reading/writing files.

**Why:** Occasionally useful directly (logging, config files, one-off scripts), though most app data persistence is better handled by a real database like MongoDB rather than raw files.

**How:**
```js
import fs from 'fs/promises'; // the promise-based version — prefer this over callbacks

const data = await fs.readFile('tasks.json', 'utf-8');
const tasks = JSON.parse(data);

await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
```

---

## Async patterns in Node

**What:** Same `Promise`/`async`/`await` concepts as browser JS (see the JavaScript doc) — but in Node, you'll hit them constantly: every database query, every file read, every HTTP request is async.

**Why:** Node is built around non-blocking I/O — it doesn't sit and wait for a slow database query; it moves on and comes back when the result is ready. This is *why* Node is efficient at handling many simultaneous requests.

**How (in an Express route, foreshadowing the Express doc):**
```js
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // a Mongoose query — returns a Promise
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});
```

**Common mistake:** Forgetting `try/catch` around `await` calls in a route handler. An unhandled rejected promise in an async route can crash the server or hang the request — always wrap it.

---

## Environment variables

**What:** Configuration values (database URLs, API keys, secrets) kept outside your code, injected at runtime.

**Why:** You never want secrets (like a database password) committed to Git. Also lets the same code run differently in development vs. production without changes.

**How:**
```bash
npm install dotenv
```
```js
// .env (never commit this file — add it to .gitignore)
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=some-long-random-string

// server.js
import 'dotenv/config';
const mongoUri = process.env.MONGO_URI;
```

**Common mistake:** Committing `.env` to Git. Add it to `.gitignore` on day one of every project — before you even create the file.
