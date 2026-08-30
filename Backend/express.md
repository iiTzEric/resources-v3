# Express

## What Express actually is

**What:** A minimal web framework for Node — handles HTTP routing, requests, and responses without you writing raw socket-handling code.

**Why:** Node has a built-in `http` module, but using it directly for a real API is tedious (manually parsing URLs, methods, request bodies). Express provides a clean, standard way to define routes and middleware.

**When:** Building any REST API or web server in Node — it's the de facto standard for this.

---

## Basic server setup

```js
import express from 'express';

const app = express();
app.use(express.json()); // parses JSON request bodies into req.body

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Common mistake:** Forgetting `app.use(express.json())`. Without it, `req.body` on POST/PATCH requests will be `undefined`, even if the client sent JSON correctly.

---

## Routing

**What:** Mapping an HTTP method + URL path to a handler function.

**Why:** A REST API is essentially a set of these mappings — `GET /api/tasks` means "list tasks," `POST /api/tasks` means "create one."

**How:**
```js
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask); // 201 = Created
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.status(204).send(); // 204 = No Content
});
```

`:id` in the path is a **route parameter** — accessible via `req.params.id`, always a string (hence `Number(...)`).

### Organizing routes into their own files (as your API grows)

```js
// routes/tasks.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });

export default router;

// server.js
import taskRoutes from './routes/tasks.js';
app.use('/api/tasks', taskRoutes); // all routes above are prefixed with /api/tasks
```

---

## Middleware

**What:** A function that runs *between* the request arriving and the final route handler — can inspect, modify, or reject the request, or just log something and pass it along.

**Why:** Common logic (auth checks, logging, parsing) shouldn't be repeated in every single route handler.

**How:**
```js
// A logging middleware
function logRequests(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next(); // MUST call this, or the request hangs forever
}

app.use(logRequests); // applies to every route

// An auth middleware — applied only to specific routes
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId; // attach data for later handlers to use
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/tasks', requireAuth, (req, res) => {
  // req.userId is available here, thanks to the middleware
});
```

**Common mistake:** Forgetting to call `next()` inside a middleware function — the request just hangs with no response, and no error is thrown to tell you why.

---

## Error handling

**What:** A special kind of middleware (four parameters instead of the usual three) that Express routes errors to.

**Why:** Centralizes error formatting instead of writing a `try/catch` with duplicate error-response logic in every route.

**How:**
```js
app.get('/api/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (error) {
    next(error); // passes the error to Express's error handler below
  }
});

// Must be defined LAST, after all other app.use()/routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
```

---

## REST API conventions worth following

| Method | Path | Meaning |
|---|---|---|
| GET | `/api/tasks` | list all |
| GET | `/api/tasks/:id` | get one |
| POST | `/api/tasks` | create |
| PATCH | `/api/tasks/:id` | partial update |
| PUT | `/api/tasks/:id` | full replace (less common in practice) |
| DELETE | `/api/tasks/:id` | delete |

Status codes worth knowing: `200` OK, `201` Created, `204` No Content (success, nothing to return), `400` Bad Request (client sent something invalid), `401` Unauthorized (no/invalid auth), `404` Not Found, `500` Server Error.
