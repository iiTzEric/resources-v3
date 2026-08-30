## Destructuring and spread/rest

**What:** Shorthand for pulling values out of objects/arrays, or combining them.

**Why:** Massively reduces boilerplate. You'll see it in nearly every React and Node file.

**When:** Whenever you're extracting specific fields from an object, or building a new object/array from an existing one.

**How:**
```js
// Destructuring an object
const task = { id: 1, title: 'Buy milk', completed: false };
const { title, completed } = task;
console.log(title); // 'Buy milk'

// Destructuring in a function parameter — extremely common in React
function TaskItem({ title, completed }) {
  // instead of: function TaskItem(props) { props.title ... }
}

// Spread — expand an array/object into a new one
const moreTasks = [...tasks, newTask];       // array
const updatedTask = { ...task, completed: true }; // object

// Rest — collect remaining items
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]
```

---