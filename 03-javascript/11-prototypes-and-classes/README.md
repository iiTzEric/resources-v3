# Prototypes & Classes

**Module:** JavaScript
**Prerequisites:** [`10-this-keyword`](../10-this-keyword)

## What is it?

**Prototypes** are JavaScript's actual, underlying mechanism for sharing behavior between objects —
every object has a hidden link to another object (its prototype), and can use that object's
properties/methods as if they were its own. The `class` keyword is modern, more readable **syntax
sugar** built on top of this same prototype mechanism — it doesn't replace it, it just makes it
easier to write and read.

## Why does it matter?

You already know `class` from earlier work — this topic explains what's genuinely happening
underneath, which clarifies otherwise-confusing behavior (like why methods are shared across every
instance without being duplicated) and connects JavaScript's OOP features to how the language
actually works, rather than treating `class` as an isolated, self-contained feature borrowed
unchanged from other languages.

## How does it work?

### Prototypes, without `class` — the raw mechanism

```javascript
const animalMethods = {
  describe() {
    return `I am a ${this.type}`;
  }
};

const dog = Object.create(animalMethods);
dog.type = "dog";

console.log(dog.describe()); // "I am a dog"
```

`Object.create(animalMethods)` creates a new object whose **prototype** is `animalMethods` — when
you call `dog.describe()`, JavaScript doesn't find `describe` directly on `dog`; it looks up the
prototype chain, finds `describe` on `animalMethods`, and calls it there, with `this` still
referring to `dog` (per the `this` rule: it's about how the method was called, `dog.describe()`, not
where the method itself lives).

### `class` — the same idea, cleaner syntax

```javascript
class Animal {
  constructor(type) {
    this.type = type;
  }
  describe() {
    return `I am a ${this.type}`;
  }
}

const dog = new Animal("dog");
console.log(dog.describe()); // "I am a dog"
```

Under the hood, `describe` doesn't get copied onto every single instance created from `Animal` —
it lives once, on `Animal.prototype`, and every instance (`dog`, and any other `new Animal(...)`)
shares that same one copy through the prototype chain, exactly like the raw `Object.create`
example above. This is genuinely efficient: creating a million `Animal` instances doesn't create a
million copies of `describe` — just a million small objects, all sharing one method definition.

### Inheritance — `extends` and the prototype chain

```javascript
class Dog extends Animal {
  bark() {
    return "Woof!";
  }
}

const rex = new Dog("dog");
console.log(rex.describe()); // "I am a dog" — inherited from Animal
console.log(rex.bark());      // "Woof!" — defined directly on Dog
```

`extends` links `Dog`'s prototype to `Animal`'s prototype — so an instance of `Dog` can use methods
defined on `Dog` directly, and also "fall back" to methods defined on `Animal` if `Dog` doesn't
have its own version. This chain (`rex` → `Dog.prototype` → `Animal.prototype`) is the **prototype
chain**, and it's genuinely how all property/method lookup works in JavaScript, `class` syntax or
not.

### Checking an object's prototype chain

```javascript
rex instanceof Dog;     // true
rex instanceof Animal;   // true — Dog inherits from Animal
```

## Simple Example

```javascript
class Shape {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `This is a ${this.name}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("circle");
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(5);
console.log(c.describe()); // "This is a circle"
console.log(c.area().toFixed(2)); // "78.54"
```

## Let's Break It Down

- `Circle extends Shape` sets up the prototype chain — `Circle` instances can use `describe()` even
  though it's only actually defined on `Shape`.
- `super("circle")` calls `Shape`'s constructor, correctly setting `this.name`, before `Circle`'s
  own constructor sets `this.radius`.
- `c.describe()` looks up `describe` — not found directly on `c` or `Circle.prototype`, found on
  `Shape.prototype` via the chain, and called with `this` still correctly referring to `c`.

## Common Mistakes

- **Treating `class` as fundamentally different from "regular" JavaScript objects**, rather than
  recognizing it as syntax built on the same prototype system used throughout the language.
- **Forgetting to call `super(...)`** in a subclass's constructor when the parent constructor sets
  up important state — this generally causes an error or missing initialization.
- **Assuming each instance has its own separate copy of every method** — methods live once on the
  prototype and are shared, not duplicated per instance.

## When Should I Use It?

Use `class` syntax for defining reusable object blueprints with shared behavior — it's the standard,
readable modern approach. Understanding prototypes directly becomes useful once you need to
diagnose unexpected behavior in inheritance, or read older JavaScript code that predates widespread
`class` adoption.

## Exercises

1. **(Recall)** What is the relationship between JavaScript's `class` syntax and prototypes?
2. **(Understanding)** Explain why creating 1,000 instances of a class doesn't create 1,000 separate
   copies of its methods.
3. **(Application)** Write a `Vehicle` class with a `describe()` method, and a `Car` class that
   extends it, adding its own `honk()` method. Create an instance and call both methods on it.

## What Should I Learn Next?

Continue to [`12-modules`](../12-modules) — ES Modules, the modern standard way to split JavaScript
across files, building on the general modules concept from Fundamentals.
