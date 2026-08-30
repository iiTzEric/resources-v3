# Docker

## What Docker actually is

**What:** A tool for packaging an application and everything it needs to run (code, runtime, dependencies, system libraries) into a single portable unit called a **container**.

**Why:** "It works on my machine" is a real, common problem — different OS versions, missing dependencies, different Node versions. Docker eliminates this by packaging the exact environment your app needs, so it runs identically anywhere Docker is installed.

**When:** Deploying apps consistently, running multiple services together (frontend, backend, database) without installing each one directly on your machine, and matching your local dev environment to production.

---

## Key vocabulary (this trips people up early)

- **Image** — a blueprint/template (like a class) — a snapshot of your app + its environment, built from a Dockerfile
- **Container** — a running instance of an image (like an object created from a class) — you can run many containers from one image
- **Dockerfile** — a text file with instructions for building an image
- **Registry** (e.g. Docker Hub, AWS ECR) — where images are stored and shared

---

## Writing a Dockerfile

**What:** Step-by-step instructions Docker follows to build your image.

**How (a Node/Express backend):**
```dockerfile
# Start from an existing image with Node already installed
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (see "layer caching" below)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Document which port the app listens on
EXPOSE 3000

# The command that runs when the container starts
CMD ["node", "server.js"]
```

**Why the order matters (layer caching):** Docker caches each instruction as a "layer." If you copy *all* your code before running `npm install`, then any code change invalidates the cache and forces a full reinstall of dependencies every build — even if `package.json` didn't change. Copying `package*.json` and installing first means that layer only rebuilds when dependencies actually change.

---

## Building and running

```bash
docker build -t taskflow-backend .      # build an image, tag it "taskflow-backend"
docker run -p 3000:3000 taskflow-backend  # run it, map container port 3000 to host port 3000
docker ps                                # list running containers
docker stop <container-id>               # stop one
```

`-p 3000:3000` means `hostPort:containerPort` — the app inside the container thinks it's on port 3000, and you access it at `localhost:3000` on your actual machine because of that mapping.

---

## `docker-compose` — running multiple containers together

**What:** A YAML file describing multiple services (containers) and how they connect — instead of running several long `docker run` commands by hand.

**Why:** A typical full-stack app needs a frontend, backend, and database running simultaneously, able to talk to each other. Compose defines all of it in one file and starts everything with one command.

**How:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/taskflow   # "mongo" = the service name below, used as hostname
      - JWT_SECRET=dev-secret
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  mongo:
    image: mongo:7             # pulled directly from Docker Hub, no custom Dockerfile needed
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db     # persists data across container restarts

volumes:
  mongo-data:
```

```bash
docker-compose up          # build (if needed) and start everything
docker-compose up -d        # same, but detached (runs in background)
docker-compose down          # stop and remove containers
docker-compose logs backend   # view logs for one service
```

**The key insight:** inside `docker-compose.yml`, services can reach each other **by service name** as if it were a hostname (`mongo`, `backend`) — not `localhost`. This is the single most common beginner confusion: `localhost` inside a container refers to *that container*, not your machine or other containers.

---

## Volumes

**What:** A way to persist data outside a container's lifecycle, or to sync files between your machine and a container.

**Why:** Containers are meant to be disposable — stop and remove one, and everything inside it (including database data) is gone by default. Volumes solve that.

**When:** Any stateful service (a database) needs a volume, or you want live-reload during development by mounting your local code into the container.

---

## Common mistakes

- **Using `localhost` between services** instead of the service name from `docker-compose.yml`.
- **Forgetting `.dockerignore`** — without one, `COPY . .` copies `node_modules` and `.git` into the image, making it huge and slow to build. Create a `.dockerignore` just like `.gitignore`:
  ```
  node_modules
  .git
  .env
  ```
- **Not rebuilding after a Dockerfile change** — `docker-compose up` alone won't pick up Dockerfile changes; use `docker-compose up --build`.