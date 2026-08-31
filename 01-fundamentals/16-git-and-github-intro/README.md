# Git & GitHub (Intro)

**Module:** Programming Fundamentals
**Prerequisites:** [`15-command-line-basics`](../15-command-line-basics)

## What is it?

**Git** is a version control system — a tool that tracks changes to your files over time, letting
you save checkpoints and go back to any previous one if something breaks. **GitHub** is a website
that hosts git repositories online, making it possible to back up your code and collaborate with
other people. This is an introductory pass — the full depth (branching, merging, collaboration
workflows, pull requests) lives in its own dedicated module,
[`02-git-and-version-control`](../../02-git-and-version-control).

## Why does it matter?

Without version control, "saving your work" usually means either constantly overwriting the same
file (losing any ability to go back) or manually copying folders like `project-v2-FINAL-actually-
final`. Git solves this properly: every meaningful change gets a permanent, labeled checkpoint you
can return to, compare against, or share. This isn't a beginner tool you'll graduate past later —
it's used on virtually every professional software project, at every level of experience.

## Mental Model

Think of git like a video game's save system. You can save your progress at any point (a
**commit**), and if something goes badly wrong later, you can load an earlier save instead of
losing everything. Unlike a single game save slot, though, git keeps *every* save you've ever made,
labeled and organized, letting you go back to any specific point in your project's entire history,
not just the very last one.

## How does it work?

### Turning a folder into a git repository

```bash
cd my-project
git init
```

`git init` creates a hidden `.git` folder that quietly starts tracking every change from this point
forward. You only do this once, at the start of a project.

### The core loop: status, add, commit

```bash
git status
```

`git status` is your "what's going on right now" command — it shows which files have changed,
which changes are staged, and which files git isn't tracking yet. You'll run this constantly.

```bash
git add index.html    # stage one specific file
git add .              # stage everything that's changed
```

**Staging** marks changes as "ready to be included in the next checkpoint." Git deliberately
separates "I changed something" from "I want this specific change included in my next save" — this
two-step process lets you commit only some of your current changes at a time, if you want to.

```bash
git commit -m "Add contact form"
```

This creates the actual checkpoint — a permanent, labeled snapshot of everything currently staged.
The message should describe *what changed and why*, since this becomes a permanent, searchable
record of your project's history.

### Connecting to GitHub

```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

- **`git remote add origin <url>`** links your local repository to a specific location on GitHub,
  named `origin` by convention.
- **`git branch -M main`** ensures your primary branch is named `main` (the modern convention).
- **`git push`** uploads your local commits to GitHub, making them visible and backed up online.

After this first setup, the everyday loop becomes simply:

```bash
git add .
git commit -m "describe what changed"
git push
```

### Reading real output — status and log

```
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

This tells you: you're on the `main` branch, your local copy matches GitHub exactly, and there's
nothing new to save right now. Learning to read this kind of output confidently — rather than just
running commands and hoping — is a real, important skill, and it's exactly the kind of thing that's
much easier to build by actually running these commands yourself than by reading about them in
isolation.

```bash
git log
```

Shows the full history of commits — each with a unique identifying hash, an author, a date, and the
message you wrote. This is genuinely a permanent, detailed record of everything that's ever
happened to the project, assuming commits were made along the way.

### `.gitignore` — telling git what to skip

```
node_modules/
.env
*.log
```

A file named `.gitignore` lists patterns of files/folders git should never track — most commonly,
installed dependencies (`node_modules`, regeneratable from `package.json`, as covered in the
Modules & Packages lesson) and secrets (`.env` files containing passwords or API keys, which should
never end up in a public, shared history).

## Simple Example

A realistic first-time setup, start to finish:

```bash
mkdir my-project
cd my-project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"
git remote add origin https://github.com/you/my-project.git
git branch -M main
git push -u origin main
```

## Let's Break It Down

- `git init` starts tracking this folder.
- Creating and staging `README.md`, then committing it, creates the very first checkpoint in this
  project's history — every project's history has to start somewhere, and an initial commit is the
  conventional first one.
- `git remote add origin ...` tells your local repository where its corresponding home on GitHub
  is — this doesn't send anything yet, it just establishes the connection.
- `git push -u origin main` is what actually uploads everything for the first time, and the `-u`
  flag sets up tracking, so every future `git push` from this branch can just be `git push`, with no
  extra arguments needed.

## Common Mistakes

- **Committing secrets (passwords, API keys) directly into a file that gets tracked by git.** Once
  something is committed and pushed, it exists in the project's history — simply deleting it in a
  later commit doesn't erase it from history; the earlier commit still contains it. This is exactly
  why `.gitignore` and environment variables (covered in the Backend module) matter so much.
- **Writing vague commit messages** like `"fix"` or `"updates"`, which become genuinely useless
  months later when trying to understand why a specific change was made.
- **Forgetting to `git add` before `git commit`**, and being confused why the commit doesn't
  include the expected changes — remember, staging and committing are two separate, deliberate
  steps.
- **Not running `git status` regularly.** It's the fastest way to understand exactly what state
  your project is currently in, before deciding what to do next.

## When Should I Use It?

Initialize git at the very start of any real project, not as an afterthought once things get messy.
Commit at meaningful checkpoints — after completing a specific piece of functionality, not
necessarily after every single line changed — with a clear, descriptive message each time. Push
regularly, so your work is both backed up and visible if you're collaborating with anyone else.

## Exercises

1. **(Recall)** What is the difference between `git add` and `git commit`? Why are they separate
   steps instead of one combined action?
2. **(Understanding)** Explain why simply deleting a secret from a file in a *later* commit doesn't
   actually remove it from the project's history.
3. **(Application)** Write out, in order, the exact sequence of commands you'd run to: initialize a
   new git repository in an existing folder, stage all current files, and make the first commit with
   a message of `"Initial commit"`.
4. **(Problem Solving)** You run `git status` and see a file listed as "untracked" that you expected
   to already be part of your project's history. Based on what you learned in this lesson, what does
   "untracked" actually mean, and what command would you run to start tracking it?

## What Should I Learn Next?

This closes out the Programming Fundamentals module. From here, continue to
[`03-javascript`](../../03-javascript) to go deep on a specific language, or to
[`02-git-and-version-control`](../../02-git-and-version-control) for the full depth on branching,
merging, and collaboration workflows this intro only touched on.
