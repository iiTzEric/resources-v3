# Command Line Basics

**Module:** Programming Fundamentals
**Prerequisites:** [`14-apis-http-json`](../14-apis-http-json)

## What is it?

The **command line** (also called a terminal, console, or shell) is a text-based way of interacting
with your computer — instead of clicking icons and menus, you type commands and read text output.
It's the primary tool professional developers use to run programs, manage files, install packages,
and use tools like git.

## Why does it matter?

Nearly everything in this curriculum from here forward assumes comfort with the command line:
running `node server.js`, `npm install`, `git commit`, `python script.py` — all of these are typed
into a terminal. It looks intimidating at first purely because it lacks the visual cues a graphical
interface gives you, but the actual set of commands you'll use day to day is genuinely small and
learnable quickly.

## Mental Model

Think of a graphical file explorer (Finder, File Explorer) as reading a map with pictures, and the
command line as giving someone precise, typed-out directions instead. Both get you to the same
place — the command line is simply faster and more powerful once you know the vocabulary, because
you can express exactly what you want directly, rather than clicking through several visual steps
each time.

## How does it work?

### Navigating the file system

```bash
pwd          # "print working directory" - shows where you currently are
ls           # list files/folders in the current directory (dir on Windows)
cd Documents # "change directory" - move into a folder called Documents
cd ..        # move UP one level, to the parent folder
cd ~         # jump to your home directory
```

Every terminal session has a **current working directory** — the folder you're "standing in" right
now. Nearly every command that deals with files operates relative to this location unless you
specify a different path explicitly. This is genuinely the single most important concept to keep
track of when starting out — a huge fraction of early command-line confusion comes from not
realizing which folder you're currently "in."

### Working with files and folders

```bash
mkdir my-project     # create a new folder
touch notes.txt       # create a new, empty file
rm notes.txt           # delete a file (permanently — no trash/recycle bin!)
rm -r my-project        # delete a folder and everything inside it
cp notes.txt backup.txt  # copy a file
mv notes.txt archive/    # move (or rename) a file
```

**`rm` deletes permanently** — there's no undo, no recycle bin, unlike deleting a file through a
graphical interface. This is worth internalizing early and treating with real caution, especially
combined with `-r` (recursive, meaning "and everything inside this folder too").

### Running programs

```bash
node server.js     # run a JavaScript file with Node.js
python script.py    # run a Python file
npm run dev          # run a script defined in package.json
```

This is the same pattern you've already used throughout this curriculum — the command line is
simply *how* those commands actually get typed and executed.

### Paths — absolute versus relative

```bash
cd Documents/my-project      # relative — starting from wherever you currently are
cd /Users/alice/Documents/my-project  # absolute — the full, unambiguous path from the very top
```

A **relative path** describes a location *relative to* your current working directory — it only
makes sense in that specific context, and will point somewhere completely different if run from a
different starting folder. An **absolute path** describes a location unambiguously, starting from
the very root of the file system, regardless of where you currently are. Both are useful; relative
paths are more common day-to-day (since you're usually already "near" what you want), but absolute
paths remove any doubt about exactly what's being referenced.

### Flags — modifying a command's behavior

```bash
ls -la    # list files, "-l" for detailed (long) format, "-a" to include hidden files
rm -rf my-project  # remove, recursively, forcefully (no confirmation prompts)
```

**Flags** (usually starting with `-` or `--`) modify what a command does. `-rf` combined together
is worth calling out specifically since it's genuinely dangerous if misused: it deletes a folder and
everything inside it, recursively, without asking for confirmation at any point — a classic example
of a command that's easy to type correctly but catastrophic to run against the wrong folder by
mistake. Always double check *which* folder you're about to run this against before pressing enter.

### Chaining and combining commands

```bash
mkdir my-app && cd my-app
```

`&&` runs the second command only if the first one succeeds — a small but genuinely useful pattern
for combining related steps into one line, rather than running them one at a time and separately
checking each succeeded.

## Simple Example

```bash
mkdir my-scripts
cd my-scripts
touch hello.js
```

Then, using a text editor (or `echo` directly from the terminal) to put content in that file, and
finally:

```bash
node hello.js
```

## Let's Break It Down

- `mkdir my-scripts` creates a new, empty folder.
- `cd my-scripts` moves your current working directory *into* that new folder — every subsequent
  command in this sequence now operates relative to `my-scripts`, not wherever you started.
- `touch hello.js` creates a new, empty file inside the current directory — which is now
  `my-scripts`, because of the `cd` that ran just before it.
- `node hello.js` runs that file with Node.js — this only works correctly because you're currently
  standing "inside" `my-scripts`; running the exact same command from a different folder would fail
  with a "file not found" error, since `hello.js` (a relative reference) wouldn't exist relative to
  wherever you actually are.

## Common Mistakes

- **Running a command from the wrong directory**, and getting a "file not found" or "no such file
  or directory" error, without realizing the actual cause is simply being in the wrong place. `pwd`
  and `ls` are your two best tools for immediately re-orienting yourself.
- **Using `rm -rf` carelessly.** Always be certain of your current directory and the exact target
  before running any destructive, recursive command — there's no undo.
- **Confusing relative and absolute paths**, especially when copy-pasting a command from
  documentation or a tutorial written with a different starting folder in mind.
- **Not realizing flags can be combined** (`-la` is the same as `-l -a`), leading to unnecessarily
  verbose or confused-looking commands when a shorter, combined version would work identically.

## When Should I Use It?

Use the command line for anything involving running programs, installing packages, or using tools
like git — this is simply the expected, standard interface for these tasks in professional software
development. A graphical file explorer remains perfectly fine for everyday personal file browsing;
the command line becomes essential specifically once you're doing development work.

## Exercises

1. **(Recall)** What does `pwd` do, and why is knowing your current working directory important
   before running most other commands?
2. **(Understanding)** Explain the difference between a relative path and an absolute path, with an
   example of each.
3. **(Application)** Write the sequence of commands to: create a folder called `practice`, move
   into it, create a file called `app.js` inside it, and then list the contents of the folder to
   confirm the file exists.
4. **(Problem Solving)** Running `node app.js` gives the error `Cannot find module '/Users/you/
   app.js'`, but you're fairly sure the file exists somewhere on your computer. Using what you
   learned in this lesson, what are the first two commands you'd run to investigate, and what would
   each one tell you?

## What Should I Learn Next?

Continue to [`16-git-and-github-intro`](../16-git-and-github-intro) — with the command line
comfortable, you're ready for the tool nearly every professional developer uses daily to track and
share changes to their code: git.
