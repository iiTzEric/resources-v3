# Design Patterns

**Module:** Software Engineering Practices
**Prerequisites:** [`03-dry-kiss-solid`](../03-dry-kiss-solid)

## What is it?

A **design pattern** is a named, reusable solution to a recurring software design problem — a
shared vocabulary for a well-understood approach, rather than a specific piece of code you copy
directly.

## Why does it matter?

You've already used several patterns throughout this curriculum without necessarily naming them —
recognizing and naming them helps you communicate design decisions precisely with other engineers,
and recognize when a familiar problem has a well-established, proven solution.

## How does it work?

### Patterns you've already used, now named

**Factory pattern** — a function that creates and returns objects, hiding the creation details:

```javascript
function createUser(name, role = "member") {
  return { name, role, createdAt: new Date() };
}
```

**Observer pattern** — objects "subscribing" to be notified of events — this is exactly what
`addEventListener` implements:

```javascript
button.addEventListener("click", handleClick); // button "notifies" handleClick when clicked
```

**Module pattern** — encapsulating related code and exposing only a deliberate public interface —
exactly what your `module.exports`/ES Modules work has been doing all along.

**Singleton pattern** — ensuring only one instance of something exists, often used for a single,
shared database connection:

```javascript
let dbConnection = null;
function getConnection() {
  if (!dbConnection) {
    dbConnection = createConnection();
  }
  return dbConnection; // always returns the same, single instance
}
```

### A pattern genuinely worth knowing by name: Dependency Injection

```javascript
// Without dependency injection - tightly coupled to a specific implementation
function sendWelcomeEmail(user) {
  const emailService = new SendGridEmailService(); // hardcoded dependency
  emailService.send(user.email, "Welcome!");
}

// With dependency injection - the dependency is passed in, not hardcoded
function sendWelcomeEmail(user, emailService) {
  emailService.send(user.email, "Welcome!");
}
```

Passing dependencies in (rather than creating them internally) makes code more testable (you can
pass in a fake/mock email service during testing) and more flexible (swapping email providers
doesn't require changing `sendWelcomeEmail`'s internals) — directly connecting to the Dependency
Inversion principle from the previous topic.

### The honest, important caveat

Design patterns solve problems that arose repeatedly in a specific context (often, classic
object-oriented languages) — not every pattern applies equally well to JavaScript/React's more
functional style, and forcing a named pattern onto a problem that doesn't actually need that
particular structure adds unnecessary complexity. **Recognize patterns when they naturally fit;
don't force a problem into a pattern just because the pattern has a name.**

## Simple Example

```javascript
// Observer pattern, implemented directly, without a framework
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }
  emit(event, data) {
    (this.listeners[event] || []).forEach(callback => callback(data));
  }
}

const emitter = new EventEmitter();
emitter.on("userCreated", (user) => console.log(`Welcome, ${user.name}`));
emitter.emit("userCreated", { name: "Alice" });
```

## Let's Break It Down

- `on` registers a callback for a specific named event — directly parallel to
  `addEventListener("click", callback)`.
- `emit` triggers all registered callbacks for that event — directly parallel to a real click
  actually happening and the browser calling your registered listener.
- This is a hand-built version of the exact same Observer pattern underlying DOM events, Node's
  own `EventEmitter` class, and many real-time/pub-sub systems — recognizing the pattern here
  clarifies that DOM events aren't a special, isolated mechanism, but an application of a
  general, well-known design pattern.

## Common Mistakes

- **Forcing a named design pattern onto a problem that doesn't genuinely need that structure**,
  adding complexity for the sake of "using a pattern."
- **Not recognizing a pattern you're already using**, missing the opportunity to communicate your
  design clearly using shared, precise vocabulary with other engineers.
- **Treating patterns as rigid templates to copy exactly**, rather than adaptable ideas to apply
  thoughtfully to your specific situation.

## When Should I Use It?

Recognize and apply a pattern when it genuinely fits a recurring problem you're facing —
dependency injection for testability, factories for consistent object creation, observers for
event-driven code. Avoid reaching for a named pattern purely to seem more "sophisticated" when a
simpler, direct solution would serve just as well.

## Exercises

1. **(Recall)** What problem does dependency injection solve, and why does it improve testability?
2. **(Understanding)** Explain why `addEventListener` is an example of the Observer pattern.
3. **(Application)** Identify which pattern (if any) fits this scenario: a function that creates
   database connection objects, ensuring the exact same connection object is reused across the
   entire application rather than creating a new one each time.

## What Should I Learn Next?

Continue to [`05-architecture-and-layered-design`](../05-architecture-and-layered-design) —
applying these principles at the scale of an entire application's structure.
