# The `this` Keyword

**Module:** JavaScript
**Prerequisites:** [`09-higher-order-functions-and-callbacks`](../09-higher-order-functions-and-callbacks)

## What is it?

`this` is a special keyword that refers to "whatever object the current function is being called
on" — but critically, **what `this` refers to is determined by how a function is called, not where
it's defined.** This single fact explains almost every confusing `this`-related bug.

## Why does it matter?

`this` is one of the most commonly misunderstood parts of JavaScript, precisely because its value
isn't fixed the way a normal variable's would be — it changes based on the call site. Getting a firm
grip on the actual rule (not a workaround, the real rule) will resolve a huge share of confusing
bugs before they even happen.

## How does it work?

### `this` inside a regular method — refers to the object it was called on

```javascript
const user = {
  name: "Alice",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

user.greet(); // "Hi, I'm Alice" — this refers to `user`, because that's what greet was called on
```

### The same function, called differently, gives a different `this`

```javascript
const greetFn = user.greet;
greetFn(); // "Hi, I'm undefined" (or an error in strict mode)
```

This is the crucial, often-surprising part: `greetFn` holds the *exact same function*, but calling
it as a standalone function (not attached to `user`) means `this` no longer refers to `user` at all
— it's determined entirely by *how* the function is invoked, not by where it was originally defined
or which object it "came from."

### Losing `this` in a callback — a very common real bug

```javascript
const user = {
  name: "Alice",
  delayedGreet() {
    setTimeout(function() {
      console.log(`Hi, I'm ${this.name}`); // "Hi, I'm undefined"
    }, 1000);
  }
};
```

Inside the regular `function() {}` passed to `setTimeout`, `this` no longer refers to `user` —
`setTimeout` calls that function on its own terms, not as `user.something()`, so the "called on"
rule no longer connects it to `user`.

### Arrow functions fix this by not having their own `this`

```javascript
const user = {
  name: "Alice",
  delayedGreet() {
    setTimeout(() => {
      console.log(`Hi, I'm ${this.name}`); // "Hi, I'm Alice" — works correctly
    }, 1000);
  }
};
```

Arrow functions deliberately don't create their own `this` — they use whatever `this` was in the
surrounding (lexical) scope at the moment they were defined. Since the arrow function here is
defined directly inside `delayedGreet` (where `this` correctly refers to `user`), it inherits that
same correct `this`, regardless of how `setTimeout` itself calls it. **This is exactly why arrow
functions are the standard, default choice for callbacks in modern JavaScript.**

### `this` in a plain function call (not a method) — refers to `undefined` (or the global object)

```javascript
function standalone() {
  console.log(this);
}

standalone(); // undefined, in strict mode / modules; the global object otherwise
```

A function called with no object before the dot (`user.greet()`) has no "context" to set `this`
to.

## Simple Example

```javascript
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  }
};

counter.increment(); // 1 — this refers to counter

const brokenIncrement = counter.increment;
brokenIncrement(); // errors — this is not counter anymore
```

## Let's Break It Down

- `counter.increment()` works correctly because it's called *as a method on* `counter` — `this`
  inside `increment` refers to `counter`.
- Assigning `counter.increment` to `brokenIncrement` and calling it standalone loses that
  connection entirely — the function body is identical, but the call site no longer provides an
  object for `this` to refer to.
- This exact scenario is common when passing a method as a callback (e.g.
  `button.addEventListener("click", counter.increment)`) — the method gets "detached" from its
  object, and `this` breaks inside it.

## Common Mistakes

- **Passing an object's method as a callback directly**, losing its connection to `this`. A common
  fix is wrapping it: `() => counter.increment()`.
- **Using a regular `function() {}` inside a method when an arrow function was needed**, especially
  in callbacks like `setTimeout`, `.map()`, or event listeners, where the surrounding method's
  `this` was expected to carry through.
- **Assuming `this` refers to "where the function is written," rather than "how the function was
  called."** This single misunderstanding underlies most `this`-related confusion.

## When Should I Use It?

Use arrow functions for callbacks, especially inside methods, when you want `this` to remain
whatever it was in the surrounding context. Use regular functions/methods when you specifically want
`this` to reflect whatever object the function is called on at the call site — which is exactly how
object methods are meant to work.

## Exercises

1. **(Recall)** What actually determines the value of `this` inside a regular function — where
   it's defined, or how it's called?
2. **(Application)** This method loses `this` when used as a callback. Rewrite the inner function as
   an arrow function to fix it:
   ```javascript
   const timer = {
     seconds: 0,
     start() {
       setInterval(function() {
         this.seconds++;
         console.log(this.seconds);
       }, 1000);
     }
   };
   ```
3. **(Problem Solving)** Explain precisely why `const greet = user.greet; greet();` behaves
   differently from `user.greet();`, even though `greet` holds the exact same function.

## What Should I Learn Next?

Continue to [`11-prototypes-and-classes`](../11-prototypes-and-classes) — `this` is central to how
JavaScript's class and object-oriented features actually work underneath.
