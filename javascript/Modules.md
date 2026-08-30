## Modules (`import`/`export`)

**What:** Splitting code across multiple files and sharing pieces between them.

**Why:** One giant file becomes unmanageable fast. Modules let you organize by responsibility.

**When:** As soon as a file gets long, or logic is reusable across files (which is immediately, in React).

**How:**
```js
// mathUtils.js
export function add(a, b) {
  return a + b;
}
export const PI = 3.14159;

// app.js
import { add, PI } from './mathUtils.js';
console.log(add(2, 3));
```

Default export (one main thing per file — this is the pattern React components use):
```js
// TaskItem.jsx
export default function TaskItem() { /* ... */ }

// App.jsx
import TaskItem from './TaskItem.jsx';
```