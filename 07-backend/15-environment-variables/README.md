# Environment Variables & Secrets

**Module:** Backend Development
**Prerequisites:** [`14-security`](../14-security)

## What is it?

**Environment variables** are configuration values (database credentials, API keys, secret keys)
provided to your application from *outside* your source code — set on the machine/server running
it, rather than hardcoded directly into files that get committed to git.

## Why does it matter?

You've already learned why committing secrets to git is dangerous (from the Git module — deleting a
secret in a later commit doesn't remove it from history). Environment variables are the standard,
correct mechanism for keeping real secrets out of your codebase entirely, while still making them
available to your running application.

## How does it work?

### The problem: hardcoded secrets

```javascript
// DANGEROUS — this secret is now permanently in your git history
mongoose.connect("mongodb+srv://user:realpassword123@cluster.mongodb.net/mydb");
```

### The fix: environment variables

```javascript
mongoose.connect(process.env.MONGO_URI);
```

`process.env` is Node's built-in object holding all environment variables currently set for the
running process. `process.env.MONGO_URI` reads a value that's provided externally, not hardcoded
anywhere in your source files.

### Setting environment variables locally with `.env` files

```
# .env
MONGO_URI=mongodb+srv://user:realpassword123@cluster.mongodb.net/mydb
JWT_SECRET=some-long-random-string
PORT=3000
```

```javascript
require("dotenv").config(); // loads .env into process.env, at the very top of your entry file

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
```

The `dotenv` package reads your `.env` file and populates `process.env` with its contents — this
`.env` file itself must **never be committed to git** (add it to `.gitignore` immediately, as one
of the very first things when setting up a project).

### `.env.example` — documenting required variables without exposing real values

```
# .env.example (this file IS safe to commit)
MONGO_URI=
JWT_SECRET=
PORT=3000
```

A common, genuinely useful convention: commit a `.env.example` file listing which environment
variables a project needs, with placeholder or empty values — so anyone (including future you,
cloning the project fresh) knows exactly what to configure, without ever exposing real secret
values in the repository.

### In production — environment variables are set differently

Real hosting platforms (Heroku, Render, AWS, and others) provide their own interface for setting
environment variables directly on the server, rather than uploading a `.env` file — the application
code (`process.env.MONGO_URI`) works identically either way, since it's simply reading whatever the
environment provides, regardless of how those values were actually set.

### Different values for different environments

```
# .env.development
MONGO_URI=mongodb://localhost:27017/myapp-dev

# .env.production (set via hosting platform, not a committed file)
MONGO_URI=mongodb+srv://.../myapp-prod
```

A common, deliberate pattern: development and production use different database connections,
different API keys — environment variables make it easy to configure each environment
appropriately without changing any actual code.

## Simple Example

```javascript
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000);
```

## Let's Break It Down

- `require("dotenv").config()` runs first, loading `.env`'s contents into `process.env` before
  anything else tries to use them.
- Both the database connection string and the port are read from environment variables, rather than
  hardcoded — this same code would work correctly with entirely different values in production,
  with zero code changes needed.
- `process.env.PORT || 3000` provides a sensible fallback if `PORT` isn't set at all — genuinely
  useful for local development, where you might not bother setting every single variable.

## Common Mistakes

- **Committing a real `.env` file to git**, exposing actual secrets in the repository's history.
- **Hardcoding secrets directly in source code** "temporarily," which often ends up committed
  before being properly moved to environment variables.
- **Forgetting to add `.env` to `.gitignore`** at the very start of a project, before the first
  commit that might accidentally include it.
- **Not providing a `.env.example`**, leaving teammates (or future you) to guess which environment
  variables a project actually requires.

## When Should I Use It?

Use environment variables for any value that's either secret (credentials, API keys) or genuinely
different between environments (development vs. production database URLs) — essentially every real
backend project, from the very start.

## Exercises

1. **(Recall)** Why should a `.env` file never be committed to git, while a `.env.example` file is
   fine to commit?
2. **(Application)** Convert this hardcoded connection string into using an environment variable,
   including the `.env` file entry: `mongoose.connect("mongodb://localhost:27017/mydb");`
3. **(Problem Solving)** A teammate clones your project, runs it, and it crashes immediately with
   `MONGO_URI is undefined`. What did they most likely forget to set up, given a `.env.example`
   file exists in the repository?

## What Should I Learn Next?

Continue to [`16-api-architecture`](../16-api-architecture) — designing APIs that scale
gracefully: versioning, pagination, filtering, and searching.
