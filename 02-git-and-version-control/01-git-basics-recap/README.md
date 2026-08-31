# Git Basics Recap

**Module:** Git & Version Control
**Prerequisites:** [`01-fundamentals/16-git-and-github-intro`](../../01-fundamentals/16-git-and-github-intro)

## What is it?

This topic consolidates the git basics from the Fundamentals intro — `init`, `status`, `add`,
`commit`, `push` — into fluent, confident daily habits, with more attention paid to reading real
output correctly, since that's usually where beginners get stuck, not the commands themselves.

## Why does it matter?

Knowing the commands and being *comfortable* using them under real, sometimes confusing conditions
are different things. This topic exists specifically to build that comfort before layering
branching and collaboration on top — trying to learn branching while still shaky on the basic loop
tends to compound confusion rather than build on solid ground.

## How does it work?

### The daily loop, and what each step is really doing

```bash
git status
git add .
git commit -m "Add user login form"
git push
```

- `git status` — always run this first. It answers: what's changed, what's staged, what isn't
  tracked yet.
- `git add .` — stages everything changed in the current folder (and subfolders). You can also
  stage individual files (`git add file.js`) when you only want part of your current changes in the
  next commit.
- `git commit -m "..."` — creates the checkpoint. The message should describe the *what and why*,
  not just restate the filename ("Add user login form" is useful; "update files" is not).
- `git push` — sends your local commits to GitHub. This step is genuinely optional per-commit — you
  can make several local commits before ever pushing — but pushing regularly keeps your work backed
  up and visible to any collaborators.

### Reading `git status` output precisely

```
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   app.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notes.txt
```

Reading this carefully tells you a lot at once: you have 2 local commits GitHub doesn't have yet
(worth a `git push`); `app.js` has been modified but not staged (running `git add app.js` would
stage it); and `notes.txt` is a brand-new file git has never seen before (also needs `git add` to
start being tracked at all). Learning to read this output confidently — rather than skimming past
it — is genuinely one of the highest-value git habits you can build.

### Viewing history

```bash
git log
git log --oneline
```

`git log` shows full commit details (hash, author, date, message) for every commit, most recent
first. `git log --oneline` compresses each commit to a single line — genuinely useful for a quick
overview once a project has many commits.

### Checking what actually changed — `git diff`

```bash
git diff
```

Shows the exact line-by-line changes in your currently modified, unstaged files — lines removed
shown with a `-` prefix, lines added shown with a `+`. This is worth running *before* staging and
committing, as a final check that you're about to commit exactly what you think you are.

## Simple Example

```bash
git status
# see: modified app.js, untracked new-feature.js

git diff
# review exactly what changed in app.js

git add app.js new-feature.js
git status
# confirm: both files are now staged

git commit -m "Add search filter to product list"
git push
```

## Let's Break It Down

- Checking `git status` first, before doing anything, is the habit that prevents surprises.
- `git diff` lets you review the actual content of your changes before committing them — catching,
  for example, a leftover `console.log` you meant to remove, or an accidental change to an unrelated
  line.
- Staging explicitly by filename (rather than `git add .`) here demonstrates that you can be
  precise about exactly what goes into a given commit — useful once you're working on more than one
  thing at a time and want separate, focused commits rather than one commit mixing unrelated
  changes together.

## Common Mistakes

- **Committing without checking `git status`/`git diff` first**, and later discovering the commit
  included something unintended (a debug log, an unrelated file).
- **Writing commit messages that describe *how* the code works rather than *what changed and
  why*.** "Added a for loop" describes the code; "Fix duplicate entries in cart total" describes the
  actual change and its purpose — the latter is far more useful months later.
- **Treating `git push` as automatic or unnecessary.** Commits only exist locally until pushed —
  if your machine is lost or damaged before pushing, unpushed commits are gone.

## When Should I Use It?

Run `git status` liberally and often — there's no cost to checking it, and it prevents a wide range
of confusion. Commit at meaningful, coherent checkpoints (a complete small feature or fix), not
after every single keystroke, but also not so infrequently that a single commit bundles many
unrelated changes together.

## Exercises

1. **(Recall)** What's the difference between a file being "modified but not staged" and "staged"
   in `git status` output?
2. **(Application)** Make three small, separate, meaningful changes to a practice project (e.g., a
   small HTML edit, a CSS tweak, a JS fix), and commit each one separately with a clear, specific
   message describing just that change.
3. **(Problem Solving)** `git status` shows a file as "untracked" that you're certain you already
   committed previously. What are two different real explanations for this, and how would you
   investigate each?

## What Should I Learn Next?

Continue to [`02-branching-and-merging`](../02-branching-and-merging) — so far, everything has
happened on a single line of history (`main`). Branches let you work on something new in isolation,
without disturbing that main line until you're ready.
