# Type Coercion

**Module:** JavaScript
**Prerequisites:** [`01-variables-and-types`](../01-variables-and-types)

## What is it?

**Type coercion** is JavaScript automatically converting a value from one type to another,
implicitly, without you explicitly asking it to. This happens constantly, often invisibly, and is
responsible for a large fraction of JavaScript's reputation for "weird" or "surprising" behavior.

## Why does it matter?

Understanding coercion isn't optional trivia — it directly explains real, common bugs: comparisons
that don't behave as expected, string concatenation showing up where you expected math, conditions
evaluating in surprising ways. Once you understand the actual rules (rather than treating it as
unpredictable magic), this behavior becomes fully explainable and avoidable.

## How does it work?

### The `+` operator's split personality

```javascript
5 + 5     // 10 — both numbers, adds
"5" + 5   // "55" — one is a string, so + treats both as strings and concatenates
5 + "5"   // "55" — order doesn't matter here, same result
5 + true  // 6 — true coerces to 1 in numeric context
5 + null   // 5 — null coerces to 0
5 + undefined // NaN — undefined coerces to NaN in numeric context
```

The rule: if *either* operand of `+` is a string, JavaScript converts the other operand to a string
too, and concatenates. Otherwise, it tries to convert both to numbers and add. This single rule
explains all of the above — it's not random, it's just a rule worth actually knowing rather than
guessing at.

### Other arithmetic operators always coerce toward numbers

```javascript
"5" - 2   // 3 — "-" only makes sense numerically, so "5" becomes 5
"5" * "2" // 10
"5" / "5"  // 1
```

Unlike `+`, the other arithmetic operators (`-`, `*`, `/`) don't have a "string" interpretation at
all — so JavaScript always tries to convert both sides to numbers, regardless of their original
type.

### `==` versus `===` — the most consequential coercion difference

```javascript
"5" == 5    // true — == converts types to compare
"5" === 5   // false — === checks type AND value, no conversion

0 == false   // true
0 === false  // false

null == undefined  // true  (a special-cased rule)
null === undefined // false
```

`==` (loose equality) attempts to convert one or both operands so they can be meaningfully compared,
following its own specific, sometimes surprising rules. `===` (strict equality) never converts
anything — if the types differ, it's simply `false`, no exceptions. This is exactly why the
practical guidance from the Fundamentals Operators lesson holds: **default to `===`**, since it
removes an entire category of surprising, coercion-based bugs at the comparison level.

### Truthy and falsy — coercion in conditions

Recall from Fundamentals: any value used as a condition gets coerced to `true` or `false`. The
complete, exact list of **falsy** values in JavaScript is worth memorizing precisely, since it's a
small, fixed list:

```
false, 0, -0, 0n, "", null, undefined, NaN
```

**Every other value is truthy** — including `"0"` (a non-empty string!), `[]` (an empty array), and
`{}` (an empty object) — these last two surprise people constantly, since they might intuitively
seem "empty" or "falsy," but JavaScript treats any object or array, even an empty one, as truthy.

```javascript
if ([]) {
  console.log("this runs!"); // yes, it does — [] is truthy
}
```

### Explicit conversion — doing it on purpose, instead of relying on implicit rules

```javascript
Number("42")     // 42
String(42)        // "42"
Boolean(0)         // false
Boolean("hello")    // true

parseInt("42px")     // 42 — parses leading numeric characters, ignores the rest
parseFloat("3.14m")   // 3.14
```

Explicit conversion functions (`Number(...)`, `String(...)`, `Boolean(...)`) make your intent clear
and avoid relying on implicit coercion rules that a reader would have to know by heart to follow.
`parseInt`/`parseFloat` specifically handle strings that start with a number but contain other
characters afterward — useful for things like extracting `42` out of `"42px"` from CSS values, but
worth being deliberate about, since it silently ignores anything after the parseable portion.

### `NaN` — "Not a Number," and its own weird behavior

```javascript
Number("hello") // NaN
NaN === NaN      // false! NaN is never equal to anything, including itself
```

`NaN` represents "this was supposed to be a number, but the conversion failed." Its most surprising
property is that it's never equal to anything, even itself — checking for `NaN` requires a
dedicated function:

```javascript
Number.isNaN(NaN)      // true — the correct way to check
isNaN("hello")          // true, but isNaN() coerces its argument first, less precise
```

## Simple Example

```javascript
const cartCount = "3"; // came from a form input, so it's a string
const price = 9.99;

console.log(cartCount + price);          // "39.99" — string concatenation, not multiplication!
console.log(Number(cartCount) * price);   // 29.97 — correct, after explicit conversion
```

## Let's Break It Down

- `cartCount` is `"3"`, a string — a very realistic scenario, since values from form inputs, URL
  parameters, and many APIs commonly arrive as strings even when they represent numbers.
- `cartCount + price` triggers `+`'s string-concatenation behavior, since one operand is a string —
  producing the nonsensical `"39.99"` instead of a calculated total.
- Explicitly converting with `Number(cartCount)` first ensures the multiplication happens
  numerically, producing the correct result, `29.97`.
- This exact scenario — numeric-looking data arriving as a string from user input or an API — is a
  genuinely common, real source of this specific bug in production code, not just a contrived
  teaching example.

## Common Mistakes

- **Assuming a value is a number just because it "looks like" one**, without checking its actual
  type — especially data from form inputs, URL parameters, or JSON, all of which commonly represent
  numbers as strings.
- **Using `==` where `===` was intended**, allowing unexpected type conversions to make two
  genuinely different values compare as equal.
- **Forgetting that `[]` and `{}` are truthy**, and writing a condition intended to check "is this
  empty" that doesn't actually do that.
- **Comparing against `NaN` with `===`**, which will always be `false` — use `Number.isNaN(...)`
  instead.

## When Should I Use It?

Rely on explicit conversion (`Number(...)`, `String(...)`) whenever you need a value in a specific
type, rather than trusting implicit coercion to do the right thing — this makes your intent clear
and avoids the more surprising corners of JavaScript's coercion rules. Use `===` by default for
comparisons, and be deliberate and specific when checking for "empty" values (checking array
`.length === 0`, or string `=== ""`, rather than relying on truthy/falsy alone when precision
matters).

## Exercises

1. **(Recall)** What determines whether `+` performs addition or string concatenation?
2. **(Understanding)** Explain why `[] == false` is `true` in JavaScript, even though `[]` itself is
   truthy when used directly in a condition. (Hint: `==` and direct truthy/falsy evaluation follow
   different rules — this is a genuinely tricky, well-known JavaScript quirk worth researching if the
   answer isn't obvious.)
3. **(Application)** Predict the output of each of these before running them, then verify:
   `"10" - 5`, `"10" + 5`, `"10" == 10`, `"10" === 10`, `Boolean("")`, `Boolean("false")`.
4. **(Problem Solving)** A form calculates a total price by adding up several input values directly
   (`input1.value + input2.value`), and the result displayed is something like `"1020"` glued
   together instead of `30`. Diagnose the cause precisely, and write the corrected line.

## What Should I Learn Next?

Continue to [`03-operators`](../03-operators) — this topic covered how types convert during
operations; the next covers JavaScript-specific operator behaviors and syntax not already covered
in Fundamentals.
