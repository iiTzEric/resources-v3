# Collaboration Workflows

**Module:** Git & Version Control
**Prerequisites:** [`02-branching-and-merging`](../02-branching-and-merging)

## What is it?

A **workflow** is an agreed-upon set of conventions a team follows for how branches get created,
named, reviewed, and merged. Git itself doesn't enforce any particular workflow — it just provides
the underlying tools (branches, merges, remotes). Teams choose consistent conventions on top of
those tools so everyone collaborates predictably.

## Why does it matter?

Branching without any shared convention quickly becomes chaotic once more than one person is
involved — inconsistent naming, unclear ownership of branches, unpredictable merge timing. A shared
workflow removes this ambiguity: everyone knows where new work starts, how it gets reviewed, and
when/how it lands in `main`.

## How does it work?

### The feature branch workflow — the most common starting point

1. `main` always represents working, deployable code.
2. Any new work — a feature, a fix — happens on its own branch, created from the latest `main`.
3. Once that work is complete, it gets proposed for merging back into `main` via a **pull request**
   (covered in depth in the next topic), not merged directly and silently.
4. After review (and any requested changes), it gets merged into `main`.
5. The feature branch is deleted once merged.

This is genuinely the default, sensible starting point for most teams and projects, including
solo projects where you're disciplined about not committing straight to `main`.

### Naming conventions

```
feature/user-authentication
fix/cart-total-calculation
chore/update-dependencies
```

A common convention prefixes branch names by *type* of work (`feature/`, `fix/`, `chore/`), making
it immediately clear what a branch is for just from its name, without needing extra context. Teams
vary in their exact conventions — the important part is having *one*, consistently applied, rather
than which specific words are used.

### Keeping your branch up to date with `main`

If `main` moves forward (other work gets merged) while you're still working on your own branch, it's
good practice to periodically bring those changes into your branch too, rather than waiting until
the very end:

```bash
git checkout feature-login
git fetch origin
git merge origin/main
```

This surfaces potential conflicts earlier and in smaller, more manageable pieces, rather than
facing one large, tangled conflict only once your feature is otherwise finished.

### Trunk-based development — a brief comparison

Some teams (especially with strong automated testing and frequent deployment) use **trunk-based
development**: very short-lived branches, merged into `main` extremely frequently (often within a
day), sometimes hidden behind **feature flags** (a setting that turns unfinished functionality off
in production even though the code is already merged). This trades some of feature-branching's
isolation for faster integration and fewer large, painful merges. Neither approach is universally
"correct" — the right choice depends on team size, deployment practices, and how much automated
testing exists to catch problems quickly. As a learner, the feature-branch workflow above is the
more approachable, widely-applicable starting point.

### Communicating through commits and branches, not just chat

A well-organized git history — clear branch names, meaningful commit messages, sensibly-sized pull
requests — is itself a form of communication with your teammates (and future you). Someone should
be able to look at your branch name and recent commits and get a reasonable sense of what you're
working on, without needing to ask.

## Simple Example

A realistic day using the feature branch workflow:

```bash
git checkout main
git pull                          # start from the latest main
git checkout -b feature/dark-mode  # branch, following the naming convention

# ... work, commit as you go ...

git push -u origin feature/dark-mode
# open a pull request on GitHub (next topic covers this in depth)
```

## Let's Break It Down

- Starting from an up-to-date `main` (via `git pull` first) ensures your new branch is based on the
  most current code, reducing the chance of unnecessary conflicts later.
- The branch name `feature/dark-mode` immediately communicates both the *type* of work (a feature)
  and *what* it's about, following a consistent convention.
- Pushing the branch (rather than merging directly) sets up the next step — proposing this work for
  review via a pull request, rather than silently merging it into `main` unreviewed.

## Common Mistakes

- **Branching from an outdated `main`**, leading to avoidable conflicts and confusion later.
- **Inconsistent or unclear branch naming**, making it hard for teammates (or future you) to
  understand what a given branch is for at a glance.
- **Letting a branch live for a very long time without merging or updating it**, increasing the
  size and difficulty of an eventual merge — smaller, more frequent merges are generally easier to
  reason about than one enormous one.
- **Assuming there's only one "correct" workflow.** Different teams and projects reasonably choose
  different conventions — the goal is internal consistency, not universal agreement on one specific
  approach.

## When Should I Use It?

Use a feature-branch-style workflow as a solid, learnable default for most projects, including solo
ones — the discipline of never committing directly to `main` pays off the moment a change turns out
to be broken or needs review. Adapt naming conventions and merge frequency to whatever a specific
team or project has agreed on, prioritizing consistency within that project over any particular
"best" convention.

## Exercises

1. **(Recall)** What's the purpose of prefixing branch names with something like `feature/` or
   `fix/`?
2. **(Understanding)** Explain why periodically merging `main` into your feature branch, throughout
   your work rather than only at the very end, tends to reduce the size and difficulty of merge
   conflicts.
3. **(Application)** Come up with well-named branches (following the convention shown) for these
   three tasks: adding a new signup form, fixing a bug where prices display incorrectly, and
   updating a dependency version.
4. **(Problem Solving)** A teammate's feature branch has been open for three weeks without merging,
   and `main` has moved forward substantially in that time with unrelated work. What risk does this
   create, and what would you suggest they do differently going forward?

## What Should I Learn Next?

Continue to [`04-github-and-pull-requests`](../04-github-and-pull-requests) — pull requests are the
concrete mechanism GitHub provides for proposing, reviewing, and merging the branches described in
this topic's workflow.
