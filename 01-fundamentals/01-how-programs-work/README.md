# How Programs Work

**Module:** Programming Fundamentals
**Prerequisites:** None — this is the very first topic.

## What is it?

A program is a list of instructions that tells a computer exactly what to do, step by step. When
you write code, you're not directly controlling the computer's hardware — you're writing
instructions in a language a human can read, which then get turned into something the computer's
processor can actually execute.

## Why does it matter?

Almost every confusing bug or "why doesn't this do what I expect" moment traces back to a gap in
this mental model — not knowing what the computer is *actually* doing with your code, versus what
you *assume* it's doing. Before learning any specific language, it's worth having a rough, honest
picture of what happens between "I typed some code" and "something happened on my screen."

## How does it work?

### The computer only understands one thing: instructions in binary

At the very bottom, a computer's processor (the CPU) only understands extremely simple
instructions, represented as binary — sequences of `0`s and `1`s. Something like "add these two
numbers" or "move this value from here to there." That's it. No loops as you know them, no
functions, no objects — just tiny, mechanical steps, millions of them per second.

Nobody writes real software in raw binary. Instead, we write code in a **programming language** —
something designed to be readable by humans — and then something else translates that human-
readable code into the binary instructions the CPU actually runs.

### Two ways that translation happens: compiling and interpreting

- **Compiled languages** (like C, C++, Rust) translate your entire program into machine code
  *before* you run it, producing a standalone file the computer can execute directly. Think of it
  like translating an entire book into another language before handing it to the reader — all the
  work happens upfront, in one pass.
- **Interpreted languages** (like Python, and — in its original form — JavaScript) translate and
  run your code line by line, *as it runs*, using another program (the interpreter) to do the
  translating on the fly. Think of it like a live interpreter at a conference, translating a
  speech sentence by sentence as the speaker talks, rather than translating the whole speech in
  advance.

In practice, this line is blurrier than it sounds — modern JavaScript engines (like V8, which
powers Chrome and Node.js) use a mix of both, compiling frequently-run code into fast machine code
while still interpreting on the fly. You don't need to master these internals to write JS or
Python — but knowing this distinction exists explains a lot: why compiled languages tend to run
faster (the translation work is already done), and why interpreted languages tend to be more
flexible and quicker to experiment with (no separate "build" step before you can run something).

### What "running a program" actually means

When you run a program, here's the rough sequence:

1. Your code (a text file, like `script.js` or `app.py`) gets read.
2. It gets translated (compiled or interpreted) into instructions the CPU can execute.
3. The CPU executes those instructions, one at a time, incredibly fast.
4. Along the way, the program can read input (a keyboard, a file, a network request), and produce
   output (text on a screen, a file being saved, data sent over the network).

Everything you'll build — a website, a script, a mobile app — is this same basic loop, just at a
much larger and more organized scale.

## Simple Example

Here's a tiny, plain-language "program" — not real code yet, just the idea of instructions:

```
1. Ask the user for their name.
2. Store whatever they type.
3. Print "Hello, " followed by their name.
```

In actual JavaScript, that same idea looks like this:

```javascript
const name = "Alice"; // pretend this came from user input
console.log("Hello, " + name);
```

## Let's Break It Down

- `const name = "Alice";` — this is an **instruction**: "store the text `Alice` under the label
  `name`." Nothing happens visually yet — this step just prepares data for later.
- `console.log("Hello, " + name);` — this is another instruction: "combine the text `Hello, ` with
  whatever is stored in `name`, and display the result."
- These two lines run **in order, top to bottom** — the second line only works correctly because
  the first line already ran and `name` already has a value by the time it's needed. This ordering
  matters constantly in real programs: a variable has to exist *before* you use it.
- Underneath, the JavaScript engine translates each of these lines into lower-level instructions,
  which eventually become the binary instructions your CPU executes. You never see this happening
  — but it's happening, every single time this code runs.

## Common Mistakes

- **Assuming code runs "all at once" instead of step by step.** Beginners sometimes expect a
  program to somehow know about something defined later in the file. In reality, most code runs
  strictly top to bottom, in order — if something isn't defined yet when a line needs it, that line
  fails.
- **Confusing "writing code" with "running code."** Writing a file full of instructions does
  nothing on its own — a program only does something once it's actually executed (run through an
  interpreter, or compiled and launched).
- **Ignoring what the computer actually has available.** Every program runs inside some
  environment — a browser, a terminal, an operating system — and only has access to what that
  environment allows. A script running in Node.js can read files on your computer; the exact same
  JavaScript running inside a browser tab generally cannot, because browsers deliberately restrict
  that for safety. The *language* is the same; what's *possible* depends on where it's running.

## Exercises

1. **(Recall)** In your own words, what's the difference between a compiled language and an
   interpreted language?
2. **(Understanding)** Why can't a CPU directly run the JavaScript or Python code you write,
   character for character?
3. **(Application)** Write out, in plain English numbered steps (not code), the instructions for a
   program that asks for two numbers and prints their sum. Be precise about the order.
4. **(Problem Solving)** A friend says: "I don't understand why my program crashed — the variable
   `total` is used on line 3, but it's actually created on line 10, further down in the file." Explain
   to them, using what you learned in this lesson, why that's the problem.

## What Should I Learn Next?

Continue to [`02-variables-and-data-types`](../02-variables-and-data-types) — now that you know
code is a sequence of instructions run in order, the next question is: what kinds of *data* can
those instructions actually work with?
