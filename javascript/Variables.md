## Variables: `let`, `const`, `var`

**What:** Ways to store a value under a name.

**Why:** You need somewhere to keep data (a task title, a count, a list) while your program runs.

**When:** Use `const` by default — always. Use `let` only when you know the value must change later. Never use `var` (old syntax, has confusing scoping rules `let`/`const` fixed).

**How:**
```js
const name = 'Alex';      // can't be reassigned
let score = 0;             // can be reassigned
score = score + 1;         // fine
name = 'Sam';               // ERROR — can't reassign a const
```

**Common mistake:** Thinking `const` means "the object can never change." It only means the *variable* can't be reassigned. You can still mutate an object or array stored in a `const`:
```js
const task = { title: 'Buy milk' };
task.title = 'Buy oat milk'; // totally fine — the object's contents changed, not the variable itself
```