# Loops

**Module:** Programming Fundamentals
**Prerequisites:** [`04-conditionals`](../04-conditionals)

## What is it?

A **loop** repeats a block of code multiple times, without you having to write that code out over
and over by hand. Instead of writing "print line 1, print line 2, print line 3..." a hundred times,
a loop lets you say "repeat this one instruction, a hundred times" — or "repeat this until some
condition becomes false."

## Why does it matter?

Repetition is everywhere in real programs: processing every item in a list, checking every row in
a spreadsheet, retrying a failed action a few times, running a game's logic every frame. Without
loops, every one of those tasks would require manually duplicating code for every single repetition
— completely unworkable the moment the number of repetitions isn't fixed or known in advance (like
"however many items happen to be in this list today").

## Mental Model

Think of a loop like a factory conveyor belt: the same set of instructions ("check the item, do
something to it, move on") gets applied to whatever comes down the belt, one item at a time, until
there's nothing left. You don't write separate instructions for the 1st, 2nd, and 50th item — you
write it once, and the loop handles applying it repeatedly.

## How does it work?

### The `for` loop — repeat a known number of times

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// prints: 0, 1, 2, 3, 4
```

A `for` loop has three parts, separated by semicolons, each with a specific job:

1. **`let i = 0`** — runs once, before the loop starts. Sets up a counter variable.
2. **`i < 5`** — checked *before every single repetition*. As long as this is `true`, the loop body
   runs. The instant it's `false`, the loop stops.
3. **`i++`** — runs *after every repetition*. Shorthand for `i = i + 1` — moves the counter forward.

The order these actually run in, for this example, is: set `i = 0` → check `i < 5` (true) → run
body (prints `0`) → run `i++` (`i` becomes `1`) → check `i < 5` (true) → run body (prints `1`) →
... and so on, until `i` becomes `5`, at which point `i < 5` is `false` and the loop stops —
without ever printing `5`.

### The `while` loop — repeat until a condition becomes false

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
```

This produces the exact same output as the `for` loop above — `while` is more flexible in a
specific way: it doesn't force you to have a counter built into its syntax. It's most useful when
you don't know in advance exactly how many repetitions you'll need — for example, "keep asking the
user for input until they type something valid," where the number of attempts isn't fixed ahead of
time.

**A critical danger with `while`:** if the condition never becomes `false`, the loop runs forever —
an **infinite loop**, which will freeze or crash your program. This is why every `while` loop needs
something inside it that eventually makes the condition false:

```javascript
// INFINITE LOOP — count is never changed, condition never becomes false
let count = 0;
while (count < 5) {
  console.log(count);
  // forgot count++ !
}
```

### Looping over collections — `for...of`

Once you have a list of things (covered properly in the next topic, but previewed here since it's
where loops get used constantly):

```javascript
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

`for...of` hands you each item directly, one at a time, without you needing to manually manage an
index/counter at all. This is the loop you'll reach for most often once you're working with real
data, since "do something to every item in this list" is an extremely common task, and this form
expresses that intent directly and readably.

### `break` and `continue` — controlling a loop from inside

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // exits the loop immediately, entirely
  }
  console.log(i);
}
// prints 0, 1, 2, 3, 4 — then stops
```

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // skips just this repetition, loop keeps going
  }
  console.log(i);
}
// prints 0, 1, 3, 4 — 2 is skipped, but the loop doesn't stop
```

- **`break`** — stop the loop entirely, right now, regardless of the loop's own condition.
- **`continue`** — skip the rest of *this* repetition only, and move on to the next one; the loop
  itself keeps running.

These are especially useful combined with a condition: "search through this list, and stop as soon
as you find a match" is a `break`; "process every item except the ones that don't apply" is often a
`continue`.

### Under the hood: why loops don't need a fixed number of repeats compiled in

Unlike manually copy-pasting a block of code five times, a loop's body exists in memory exactly
once — the computer simply jumps back to the top of that same block of instructions repeatedly,
checking the condition each time it's about to loop back. This is why a loop can run 5 times or
5 million times with the exact same amount of code — the *code* doesn't grow with the number of
repetitions, only the *time* it takes to run does.

### Nested loops

```javascript
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    console.log(`row ${row}, col ${col}`);
  }
}
```

A loop inside another loop — the inner loop completes *entirely* for every single repetition of the
outer loop. This is the standard pattern for anything grid-like (rows and columns, coordinates), but
it also means the total number of repetitions multiplies: a 3x3 nested loop runs the inner body 9
times total, not 6. Nested loops with large numbers on both levels can get slow surprisingly fast —
this connects directly to the complexity/Big O ideas you'll cover later in this module and in the
DSA module.

## Simple Example

```javascript
let total = 0;

for (let i = 1; i <= 5; i++) {
  total += i;
}

console.log(total); // 15
```

## Let's Break It Down

- `total` starts at `0`.
- The loop runs with `i` taking the values `1, 2, 3, 4, 5` in order (note `<=`, not `<` — this
  matters, since `<` would have stopped after `4`, giving `10` instead of `15`).
- Each repetition, `total += i` adds the current `i` onto the running total:
  `0 → 1 → 3 → 6 → 10 → 15`.
- After `i` becomes `6`, the condition `i <= 5` is `false`, the loop stops, and `total` holds the
  final sum of `1 + 2 + 3 + 4 + 5`.
- This exact pattern — a variable initialized before a loop, updated inside it, and read after it
  finishes — is called an **accumulator pattern**, and it's one of the most common loop shapes
  you'll write.

## Common Mistakes

- **Off-by-one errors** — using `<` when you meant `<=`, or starting a counter at `0` when you
  meant `1` (or vice versa). These are extremely common and worth deliberately double-checking:
  "what should the first and last values actually be?"
- **Forgetting to update the loop variable in a `while` loop**, causing an infinite loop that
  freezes your program.
- **Modifying a list you're currently looping over**, which can cause items to be skipped or
  processed twice, depending on how the list changes — a subtle bug that often only shows up with
  certain input sizes.
- **Using a `for` loop with a manual index when a `for...of` loop would be clearer**, once you're
  just trying to process every item in a list and don't actually need the index itself.

## When Should I Use It?

Use a `for` loop when you know the number of repetitions in advance, or need direct access to a
counter/index. Use `for...of` when processing every item in a collection and you don't need to
manage an index yourself. Use `while` when the number of repetitions depends on a condition that
isn't a simple counter (waiting for valid input, retrying until success). Use `break`/`continue`
to express "stop early" or "skip this one" clearly, rather than wrapping the rest of the loop body
in an extra `if`.

## Exercises

1. **(Recall)** What are the three parts of a `for` loop's parentheses, and what does each one do?
2. **(Understanding)** Explain why `while (true) { console.log("hi"); }` never stops on its own.
   What would need to change to fix it?
3. **(Application)** Write a loop that prints only the even numbers from 1 to 20.
4. **(Application)** Write a loop that adds up all numbers from 1 to 100 and prints the total.
5. **(Problem Solving)** This loop is supposed to print numbers 1 through 10, but it actually
   prints 0 through 9. Explain why, and show two different one-line fixes:
   ```javascript
   for (let i = 0; i < 10; i++) {
     console.log(i);
   }
   ```

## What Should I Learn Next?

Continue to [`06-functions`](../06-functions) — loops repeat a block of code in place; functions
let you package a block of code into something reusable and callable by name, from anywhere in
your program.
