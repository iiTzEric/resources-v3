# Branching & Merging

**Module:** Git & Version Control
**Prerequisites:** [`01-git-basics-recap`](../01-git-basics-recap)

## What is it?

A **branch** is an independent line of development within the same repository — a way to work on
something (a new feature, an experiment, a fix) without touching the main, stable line of history
until you're ready. **Merging** is bringing the changes from one branch into another.

## Why does it matter?

Without branches, every single change would happen directly on `main` — meaning half-finished,
possibly broken work would sit alongside your stable code at all times. Branches solve this: you
can experiment freely, make several commits, even make mistakes, all in isolation, and only bring
the finished result into `main` once it's actually ready. This is genuinely how real software teams
work — nobody commits directly to a shared `main` branch on a serious project.

## Mental Model

Think of `main` as the master copy of a document that everyone relies on. A branch is like making a
personal working copy to try out edits — you can scribble all over your copy, undo things, try
different approaches, all without affecting the master copy anyone else is reading. Once your edits
are actually good, you bring them back into the master copy (merging) — and if you decide your
experiment didn't work out, you can simply discard your personal copy with zero impact on the
original.

## How does it work?

### Creating and switching branches

```bash
git branch feature-login       # create a new branch (doesn't switch to it yet)
git checkout feature-login      # switch to it

# or, in one step:
git checkout -b feature-login
```

`git checkout -b <name>` is the common shorthand: create a new branch and immediately switch to it.
Everything you commit while "on" this branch only affects this branch's history — `main` (and any
other branch) is completely unaffected until you deliberately merge.

### Seeing what branch you're on, and what exists

```bash
git branch          # lists local branches, marks current one with *
git branch -a        # also shows remote branches (on GitHub)
```

### Making changes on a branch

```bash
git checkout -b feature-login
# ... edit files, work normally ...
git add .
git commit -m "Add login form UI"
git push -u origin feature-login
```

This works exactly like committing on `main` — branches don't change *how* you commit, only *which
line of history* those commits belong to.

### Merging a branch back into main

```bash
git checkout main
git pull                    # make sure your local main is fully up to date first
git merge feature-login
git push
```

`git merge feature-login`, while standing on `main`, brings all of `feature-login`'s commits into
`main`'s history. If nothing else changed on `main` in the meantime, this is usually a clean,
automatic merge.

### Merge conflicts — when git needs your help deciding

A conflict happens when the same lines of the same file were changed differently on both branches
being merged — git genuinely cannot know which version you want, so it stops and asks you to
decide:

```
<<<<<<< HEAD
const greeting = "Hello there";
=======
const greeting = "Hi!";
>>>>>>> feature-login
```

This marked block appears directly inside the affected file. `<<<<<<< HEAD` through `=======` shows
your current branch's version; `=======` through `>>>>>>> feature-login` shows the incoming
branch's version. Resolving a conflict means manually editing the file to keep whichever version
(or some combination) is actually correct, removing all the `<<<<<<<`/`=======`/`>>>>>>>` marker
lines entirely, then:

```bash
git add the-conflicted-file.js
git commit
```

Staging and committing after resolving tells git "this conflict is resolved, here's the final
version" — completing the merge.

### Why conflicts happen, and why they're not a sign of doing something wrong

Conflicts are a normal, expected part of working with branches, especially once more than one
person is editing the same files — they simply mean git found genuinely ambiguous, overlapping
changes and needs a human decision, not a bug or a mistake on your part.

### Deleting a branch once it's merged

```bash
git branch -d feature-login          # delete local branch
git push origin --delete feature-login  # delete it on GitHub too
```

Once a branch's work is safely merged into `main`, the branch itself has served its purpose and can
be deleted — this keeps the list of active branches meaningful and uncluttered, without losing any
history (the commits still exist in `main`'s history after merging).

## Simple Example

```bash
git checkout -b add-footer
echo "Footer content" >> index.html
git add index.html
git commit -m "Add footer to homepage"

git checkout main
git merge add-footer
git branch -d add-footer
```

## Let's Break It Down

- `add-footer` is created and switched to — any commits from here forward belong only to this
  branch, not `main`.
- The change is made and committed, entirely isolated from `main` at this point.
- Switching back to `main` and running `git merge add-footer` brings that commit's changes into
  `main`'s history — assuming no conflicting changes happened on `main` in the meantime, this
  completes cleanly and automatically.
- Deleting the branch afterward is just cleanup — the actual change now permanently lives in
  `main`'s history regardless.

## Common Mistakes

- **Making significant changes directly on `main`** instead of a feature branch, especially once
  collaborating with others — this removes the isolation branches are meant to provide.
- **Panicking at a merge conflict** instead of reading the conflict markers carefully and making a
  deliberate decision about which version (or combination) is correct.
- **Forgetting to delete merged branches**, leading to a cluttered, hard-to-navigate list of
  branches over time.
- **Merging without first pulling the latest `main`**, increasing the chance of unnecessary
  conflicts that could have been avoided by working from the most current version.

## When Should I Use It?

Create a new branch for any distinct piece of work — a feature, a bug fix, an experiment — rather
than working directly on `main`. Merge back into `main` once that work is complete and verified to
work correctly, and delete the branch afterward to keep things tidy.

## Exercises

1. **(Recall)** What command creates a new branch and switches to it in one step?
2. **(Understanding)** Explain, using the "personal working copy" mental model, why working on a
   branch protects `main` from broken or unfinished work.
3. **(Application)** Create a branch called `add-styling`, make and commit a small CSS change on it,
   then merge it back into `main` and delete the branch.
4. **(Problem Solving)** You attempt a merge and git shows conflict markers in a file. Walk through,
   in your own words, exactly what steps you'd take from that point to safely resolve it.

## What Should I Learn Next?

Continue to [`03-collaboration-workflows`](../03-collaboration-workflows) — branching becomes even
more important once more than one person is contributing to the same project at the same time.
