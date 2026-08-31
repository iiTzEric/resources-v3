# Input, Output & Files

**Module:** Programming Fundamentals
**Prerequisites:** [`11-memory-basics`](../11-memory-basics)

## What is it?

**Input** is data a program receives from outside itself — from a person typing, a file on disk, or
another program. **Output** is data a program sends back out — text on a screen, a saved file, data
sent across a network. **Files** are a specific, extremely common form of both: named, persistent
storage on disk that a program can read from and write to.

## Why does it matter?

Everything you've written so far in this module has lived entirely in memory, and vanished the
instant the program finished running — every variable, every array, gone. Almost no real program
works that way. A note-taking app needs to save your notes after you close it. A game needs to load
level data from somewhere. Understanding input/output — often shortened to **I/O** — is what
connects a program to the outside world and to data that outlives a single run.

## Mental Model

Think of a program without any I/O like a person locked in a soundproof room with no windows: they
can think and calculate all they want internally, but nothing they do has any effect on, or
awareness of, anything outside that room. Input is a way for information to get *into* the room;
output is a way for something to get *out*. Every genuinely useful program needs at least one of
these — otherwise, nothing it does is ever visible or relevant to anyone.

## How does it work?

### The simplest output you already know

```javascript
console.log("Hello!");
```

`console.log` is output — sending text out of your program, to be displayed somewhere (a browser's
developer console, or a terminal, depending on where the code runs). You've used this constantly
throughout this module without necessarily naming it as "output."

### Reading input — in a browser versus in a terminal

Input looks different depending on where your program is running:

```javascript
// In a browser, from an HTML form input
const name = document.querySelector("#nameInput").value;
```

```javascript
// In Node.js, from the terminal (using the built-in readline module)
const readline = require("readline");
// ... setup to prompt and read a line typed by the user
```

The exact mechanism differs by environment, but the underlying idea is identical: your program
pauses to receive some information from outside itself, then continues, now holding that
information as data it can use — exactly like any other variable.

### Files — persistent storage on disk

Unlike a variable in memory, a **file** continues to exist after your program stops running. In
Node.js:

```javascript
const fs = require("fs");

// Writing to a file
fs.writeFileSync("notes.txt", "Buy groceries");

// Reading from a file
const content = fs.readFileSync("notes.txt", "utf-8");
console.log(content); // "Buy groceries"
```

- **`fs`** ("file system") is a built-in Node.js module giving you functions to interact with files
  on disk.
- **`writeFileSync`** creates (or overwrites) a file with the given content.
- **`readFileSync`** reads a file's content back as a string, given you specify the encoding
  (`"utf-8"`, meaning "interpret these bytes as standard text").
- The **`Sync`** in both names means "wait here until this finishes before continuing" — file
  operations take real time (reading/writing to disk is much slower than working with data already
  in memory), and there are also **asynchronous** versions of these functions that don't block your
  program while waiting. Async operations get a full, proper treatment in the JavaScript module —
  for now, just be aware both styles exist.

### Why files matter even though you've been using `localStorage` and databases

If you've worked with browser `localStorage` or a database before, you've actually already used a
form of persistent storage — they solve the same fundamental problem files do (data surviving after
the program stops), just through different, more specialized mechanisms suited to their environment
(a browser, or a full database server). Files are the most basic, general-purpose version of this
same idea: something written to disk, still there the next time a program looks for it.

### Structured data in files — JSON

Files often store more than plain text — structured data, like a whole array of objects:

```javascript
const fs = require("fs");

const users = [
  { name: "Alice", age: 28 },
  { name: "Ben", age: 34 }
];

fs.writeFileSync("users.json", JSON.stringify(users));

const raw = fs.readFileSync("users.json", "utf-8");
const loadedUsers = JSON.parse(raw);

console.log(loadedUsers[0].name); // "Alice"
```

This should look familiar if you've used `localStorage` before — `JSON.stringify` converts real
data into a text format that can be saved, and `JSON.parse` converts it back. Files, `localStorage`,
and databases all share this same underlying need: since disk/network storage generally only
understands plain text (or raw bytes), structured data has to be converted to and from a storable
text format at the boundary. JSON gets its own proper topic later in this module
([`14-apis-http-json`](../14-apis-http-json)) since it's also central to how programs communicate
over networks, not just how they save files.

## Simple Example

```javascript
const fs = require("fs");

function saveScore(score) {
  fs.writeFileSync("highscore.txt", String(score));
}

function loadScore() {
  if (!fs.existsSync("highscore.txt")) {
    return 0;
  }
  const content = fs.readFileSync("highscore.txt", "utf-8");
  return Number(content);
}

saveScore(150);
console.log(loadScore()); // 150, even in a completely separate run of the program
```

## Let's Break It Down

- `saveScore` converts the number to a string (files store text) and writes it to `highscore.txt`.
- `loadScore` first checks whether the file even exists yet (`fs.existsSync`) — an important guard,
  since trying to read a file that isn't there would throw an error, exactly the kind of thing
  covered in the Error Handling lesson.
- If the file exists, its text content gets read back and converted from a string back into a
  number with `Number(...)`.
- Crucially: if you ran `saveScore(150)` in one run of the program, closed it entirely, and ran
  `loadScore()` days later in a brand-new run, it would still correctly return `150` — because the
  data lives on disk, not just in memory, which vanishes the instant a program stops.

## Common Mistakes

- **Forgetting that file operations can fail** — the file might not exist, you might lack
  permission to read/write it, the disk might be full. Wrapping file operations in `try`/`catch`
  (from the Error Handling lesson) is often genuinely necessary, not optional caution.
- **Confusing in-memory data with saved data.** Changing a variable in your running program does
  nothing to a file on disk unless you explicitly write that change out.
- **Forgetting to convert data to/from text when saving structured information**, and being
  surprised when reading a file back gives you a plain string instead of the array/object you
  expected — `JSON.stringify`/`JSON.parse` (or the language's equivalent) are what bridge that gap.

## When Should I Use It?

Reach for file I/O (or its equivalents, like `localStorage` or a database) any time data needs to
survive beyond a single run of your program — user data, settings, saved progress, logs. For data
that's only needed transiently while the program runs, ordinary in-memory variables are simpler and
faster; there's no need to persist something to disk if it never needs to outlive the current
execution.

## Exercises

1. **(Recall)** What is the practical difference between data stored in a variable and data stored
   in a file, in terms of what happens when the program stops running?
2. **(Understanding)** Why does saving an array or object to a file require converting it to a
   string first (e.g. with `JSON.stringify`), rather than writing it directly?
3. **(Application)** Write a function `appendLog(message)` that adds a new line to a file called
   `log.txt` every time it's called, without erasing what was already there. (Hint: look up
   `fs.appendFileSync`, similar in spirit to `writeFileSync`.)
4. **(Problem Solving)** A program crashes with an error when it tries to read `settings.json` on
   its very first run, because the file doesn't exist yet. Using what you learned in this lesson and
   the previous one on error handling, describe two different valid ways to handle this situation
   gracefully.

## What Should I Learn Next?

Continue to [`13-modules-and-packages`](../13-modules-and-packages) — as programs grow past a
single file (which real programs quickly do), you need a way to split code across multiple files
and reuse code other people have already written.
