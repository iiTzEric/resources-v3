# Browser Storage

**Module:** JavaScript
**Prerequisites:** [`17-fetch-and-http-requests`](../17-fetch-and-http-requests)

## What is it?

Browser storage lets JavaScript persist data on the user's own device, surviving page reloads (and,
depending on the type, even closing the browser entirely) — without needing a server or database at
all. The two main mechanisms are `localStorage` and `sessionStorage`.

## Why does it matter?

Not everything needs a full backend and database — user preferences, a shopping cart before
checkout, form drafts, or a simple favorites list can often be stored directly in the browser. This
is exactly the pattern used earlier for a favorites feature, and understanding it well (including
its real limitations) helps you judge when it's sufficient versus when real backend persistence is
actually needed.

## How does it work?

### `localStorage` — persists indefinitely

```javascript
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme"); // "dark"
localStorage.removeItem("theme");
localStorage.clear(); // removes everything
```

Data in `localStorage` survives page reloads, browser restarts, and even the computer restarting —
it stays until explicitly removed (by your code, or the user clearing their browser data).

### `sessionStorage` — persists only for the current tab session

```javascript
sessionStorage.setItem("draftMessage", "Hello...");
```

Identical API to `localStorage`, but data is cleared automatically once the tab/window is closed —
useful for genuinely temporary data that shouldn't outlive the current session (a multi-step form's
in-progress state, for instance).

### The critical limitation: only strings

```javascript
const favorites = ["Alice", "Ben"];
localStorage.setItem("favorites", favorites); // silently converts to "Alice,Ben" — likely NOT what you want
```

Both storage APIs only store strings — attempting to store an array or object directly converts it
to a string in a way that's almost never actually useful (silently, with no error). The correct
approach:

```javascript
localStorage.setItem("favorites", JSON.stringify(favorites));

const saved = localStorage.getItem("favorites");
const favorites = JSON.parse(saved); // back to a real array
```

This is the exact same `JSON.stringify`/`JSON.parse` pair used for files and for API request
bodies — the underlying reason is identical: storage/transmission only understands text, so
structured data must be explicitly converted at that boundary.

### Handling the "nothing saved yet" case

```javascript
const saved = localStorage.getItem("favorites");
const favorites = saved ? JSON.parse(saved) : [];
```

`getItem` returns `null` if the key was never set — attempting `JSON.parse(null)` would actually
return `null` rather than throwing, but explicitly falling back to a sensible default (`[]` here)
is clearer and safer than relying on that specific behavior.

### Real limitations worth knowing

- **Size limits** — typically around 5-10MB total per origin, varying by browser. Not suitable for
  large amounts of data.
- **Synchronous API** — `localStorage` operations block the current code until they complete
  (usually negligible, but worth knowing, especially for very large values).
- **Not secure for sensitive data** — anything in `localStorage` is fully readable by any
  JavaScript running on that page (including, in a worst case, injected malicious scripts) — never
  store passwords or sensitive tokens here without understanding the real security tradeoffs,
  covered properly in the Backend module's Security and Authentication topics.
- **Per-origin, not per-user across devices** — data doesn't sync between different browsers or
  devices; it's tied to that specific browser on that specific device.

## Simple Example

```javascript
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
}

let favorites = loadFavorites(); // restores data from a previous visit, if any
favorites.push("Carla");
saveFavorites(favorites);
```

## Let's Break It Down

- `loadFavorites` runs once, on startup, checking for previously saved data and falling back to an
  empty array if there's genuinely nothing saved yet.
- After adding a new favorite, `saveFavorites` is called explicitly — `localStorage` doesn't
  auto-save; every meaningful change must be deliberately persisted.
- If the page is refreshed after this runs, `loadFavorites()` would correctly restore `["Carla"]` (or
  more, if this had run before) — this is precisely the persistence behavior a plain in-memory
  array could never provide on its own.

## Common Mistakes

- **Storing an object/array without `JSON.stringify`**, and being confused by the resulting garbled
  string when reading it back.
- **Forgetting to handle the "key doesn't exist yet" case**, causing an error the very first time a
  user visits with nothing saved.
- **Storing sensitive data** (passwords, auth tokens) without understanding the real security
  implications of client-side storage being fully readable by any script on the page.
- **Relying on `localStorage` for data that genuinely needs to sync across devices or be backed
  up centrally** — that requires real server-side persistence, not client-side storage.

## When Should I Use It?

Use `localStorage` for genuinely client-only data that should persist across visits on the same
device — preferences, simple favorites lists, draft content. Use `sessionStorage` for data that
should only last the current tab session. Reach for real backend/database persistence (covered in
later modules) once data needs to be shared across devices, backed up, or kept secure from
client-side access.

## Exercises

1. **(Recall)** What's the key practical difference between `localStorage` and `sessionStorage`?
2. **(Application)** Write functions `saveTheme(theme)` and `loadTheme()` using `localStorage`,
   with `loadTheme()` defaulting to `"light"` if nothing has been saved yet.
3. **(Problem Solving)** A developer stores a shopping cart array directly with
   `localStorage.setItem("cart", cartItems)` (without `JSON.stringify`), and later reading it back
   with `JSON.parse` throws an error. Explain exactly why, and provide the fix.

## What Should I Learn Next?

This completes the JavaScript module. Continue to [`05-web-fundamentals`](../../05-web-fundamentals)
to build the HTML/CSS/HTTP foundation React sits on top of, or to
[`04-python`](../../04-python) for a parallel-track second language.
