# Undoing Mistakes

**Module:** Git & Version Control
**Prerequisites:** [`04-github-and-pull-requests`](../04-github-and-pull-requests)

## What is it?

Git provides several distinct commands for undoing different kinds of mistakes — an uncommitted
change you want to discard, a commit you want to remove or reverse, a file you accidentally staged.
This topic covers the most common recovery situations and which specific command actually fits
each one, since using the wrong one can occasionally make things worse rather than better.

## Why does it matter?

Mistakes are inevitable — a bad commit, an accidental file change, a merge you didn't mean to do.
One of git's core value propositions is that almost none of these are actually unrecoverable, *if*
you know the right command for the specific situation. Knowing this removes a lot of the anxiety
around experimenting and making changes, since you can trust there's usually a way back.

## How does it work?

### Discarding uncommitted changes to a file

```bash
git checkout -- filename.js
```

This reverts a file back to its last committed state, throwing away any uncommitted edits to it.
Use this when you've made changes you no longer want, and haven't staged or committed them yet.
**This is genuinely destructive and unrecoverable** — there's no "undo" for discarding uncommitted
work, since it was never saved as a checkpoint in the first place.

### Unstaging a file (without losing the changes)

```bash
git reset filename.js
```

If you staged a file with `git add` but change your mind before committing, this removes it from
the staging area — the actual changes in the file are untouched, just no longer marked "ready to
commit."

### Amending the most recent commit

```bash
git commit --amend
```

If you just committed and immediately realize you forgot a file, or want to fix the commit message,
`--amend` lets you fold new staged changes into the previous commit, or edit its message, instead of
creating a whole new separate commit for a small correction. **Only do this on commits that haven't
been pushed yet** — amending a commit that others may have already pulled creates confusing,
diverging history.

### Reverting a commit — the safe way to undo pushed history

```bash
git revert <commit-hash>
```

`git revert` creates a **new commit** that undoes the changes from a specific earlier commit,
without erasing or rewriting history. This is the safe option once a commit has already been
pushed and possibly seen by others — the history stays intact and honest ("here's what we did, and
here's a later commit that undid it"), rather than pretending the original commit never happened.

### Resetting — rewriting history (use with real caution)

```bash
git reset --soft <commit-hash>   # undo commits, keep changes staged
git reset --mixed <commit-hash>   # undo commits, keep changes unstaged (default)
git reset --hard <commit-hash>     # undo commits AND discard all related changes entirely
```

`git reset` moves your branch pointer backward to an earlier commit, effectively "forgetting" any
commits after that point. `--soft` and `--mixed` keep the actual file changes around (just
un-committed or un-staged); `--hard` throws them away entirely and irreversibly. **`git reset
--hard` is one of the few git commands that can genuinely and permanently lose real work** — always
be certain before running it, and strongly prefer `revert` over `reset` for anything that's already
been pushed and shared with others.

### Recovering a deleted branch (when it's not truly gone yet)

```bash
git reflog
```

`git reflog` shows a log of nearly everywhere `HEAD` (your current position) has pointed recently —
including commits from a branch you may have just deleted. This is a genuine safety net: as long as
enough time hasn't passed for git's internal cleanup to remove the old data, you can often find and
recover a commit hash from `reflog` and check it out again, even after deleting the branch that
originally pointed to it.

## Simple Example

A realistic recovery scenario:

```bash
git commit -m "Add checkout flow"
# immediately realize the commit message has a typo, and you forgot one file

git add forgotten-file.js
git commit --amend -m "Add checkout flow with validation"
```

Versus, if that commit had already been pushed and someone else may have pulled it:

```bash
# instead of amending (which would rewrite already-shared history):
git revert <the-commit-hash>
git push
```

## Let's Break It Down

- In the first scenario, since the commit hasn't been pushed yet, amending it is safe — nobody else
  has a copy of the "wrong" version to get out of sync with.
- In the second scenario, since the commit is already shared, `revert` is used instead — it adds a
  new commit that undoes the change, keeping history honest and avoiding any confusing mismatch
  between your local history and what others already have.
- The underlying judgment call in both cases is the same question: **has this commit been shared
  with anyone else yet?** If no, it's generally safe to rewrite (amend, reset). If yes, prefer
  non-destructive alternatives (revert) that add to history rather than rewriting it.

## Common Mistakes

- **Running `git reset --hard` without being certain what it will discard.** This can permanently
  lose real, uncommitted work with no warning and no easy recovery.
- **Amending or rewriting commits that have already been pushed and potentially pulled by
  others**, creating confusing, diverging history between your local repository and everyone
  else's.
- **Panicking and avoiding git entirely after a mistake**, instead of methodically checking
  `git status`, `git log`, and `git reflog` to understand exactly what state things are actually in
  before deciding on a recovery step.
- **Not realizing `git reflog` exists**, and assuming a deleted branch or a "lost" commit is
  permanently gone, when it's often still recoverable for some time.

## When Should I Use It?

Use `checkout --` for discarding unwanted uncommitted changes, `reset` (non-`--hard`) for adjusting
staged changes before committing, `commit --amend` for small corrections to a commit that hasn't
been pushed yet, and `revert` for undoing a commit that has already been shared. Reach for `git
reflog` any time you believe something is "lost" — many situations that feel unrecoverable at first
genuinely aren't.

## Exercises

1. **(Recall)** What's the key practical difference between `git revert` and `git reset --hard`,
   in terms of what happens to history?
2. **(Understanding)** Explain why amending a commit that's already been pushed and pulled by a
   teammate can cause real problems, even though amending an unpushed commit is perfectly safe.
3. **(Application)** You've just committed with the message "fxi bug" (a typo) and haven't pushed
   yet. Write the exact command to correct just the message to "fix bug".
4. **(Problem Solving)** You realize a commit pushed to `main` two days ago introduced a bug that
   several teammates have since built on top of. Explain why `git revert`, not `git reset --hard`,
   is the appropriate tool here, and what you'd actually run.

## What Should I Learn Next?

This completes the Git & Version Control module. Continue to
[`03-javascript`](../../03-javascript) to build deep language fluency in JavaScript, applying the
version control habits from this module to every project from here forward.
