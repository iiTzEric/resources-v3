## Functions

**What:** A reusable, named block of code.

**Why:** So you don't repeat logic. Also how you organize a program into understandable pieces.

**When:** Any time you do the same thing more than once, or want to name a piece of logic to make it self-documenting.

**How:** Three common syntaxes you'll see interchangeably:
```js
// function declaration
function add(a, b) {
  return a + b;
}

// arrow function (most common in modern code)
const add = (a, b) => {
  return a + b;
};

// arrow function, implicit return (short version)
const add = (a, b) => a + b;
```

**Common mistake:** Forgetting `return`. A function without `return` gives back `undefined`:
```js
function add(a, b) {
  a + b; // no return — this line does nothing useful
}
console.log(add(2, 3)); // undefined, not 5
```

---