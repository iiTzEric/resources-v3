# Git Workflows In Practice

**Module:** Software Engineering Practices
**Prerequisites:** [`09-documentation`](../09-documentation)

## What is it?

This topic applies the git branching, pull request, and collaboration concepts from the Git module
concretely, to a real, evolving project — the practical day-to-day rhythm of using git well on
actual work, combining everything from that module with the code review practices just covered.

## Why does it matter?

Knowing individual git commands and knowing how to work effectively within a real team's ongoing
workflow are different levels of fluency — this topic focuses on the latter, the practical rhythm
professional engineers actually follow.

## How does it work?

### A realistic daily workflow, combining everything learned so far

```bash
git checkout main
git pull                                  # start from the latest shared code
git checkout -b feature/add-search-filter  # branch, following naming convention

# ... work, committing at meaningful checkpoints ...
git add .
git commit -m "Add category filter to search endpoint"

git push -u origin feature/add-search-filter
# open a pull request, with a clear description (from the GitHub & PRs topic)
# request review (from the Code Reviews topic)
# respond to feedback, push additional commits as needed
# once approved, merge (commonly via squash-and-merge for a clean history)
git checkout main
git pull                                    # get the now-merged change locally
git branch -d feature/add-search-filter       # clean up the now-merged branch
```

### Committing at meaningful checkpoints, not too granular or too broad

A single commit ideally represents one coherent, complete unit of change — not "every few
keystrokes" (too granular, adds noise to history) nor "an entire multi-day feature in one commit"
(too broad, hard to review or revert selectively). A reasonable heuristic: could you describe this
commit's purpose in one clear sentence? If not, it might be doing too much.

### Keeping your branch current with `main` during longer-running work

```bash
git fetch origin
git merge origin/main
```

For work spanning more than a day or so, periodically merging `main`'s latest changes into your
branch (from the Collaboration Workflows topic) surfaces potential conflicts earlier, in smaller,
more manageable pieces, rather than facing one large, tangled conflict only at the very end.

### Handling a genuinely urgent fix — a hotfix branch

```bash
git checkout main
git checkout -b hotfix/critical-login-bug
# fix, commit, push, open an expedited PR, merge quickly once reviewed
```

For urgent production issues, a dedicated, clearly-named branch (following the same conventions)
still applies — even urgency doesn't justify skipping review or committing directly to `main`,
though the review/merge process might reasonably move faster than for a routine feature.

### Writing commit messages that read well in `git log`

```
Add category filter to search endpoint

Users can now filter search results by product category via a
?category= query parameter. Includes validation rejecting unknown
category values with a 400 response.
```

A short, clear summary line, optionally followed by a blank line and more detail — genuinely useful
months later when scanning `git log` to understand a project's history.

## Simple Example

A realistic sequence of commits on a feature branch, as they might appear in `git log --oneline`:

```
a1b2c3d Add category filter to search endpoint
d4e5f6g Add validation for invalid category values
h7i8j9k Add tests for category filter behavior
```

## Let's Break It Down

- Each commit represents one clear, describable unit of work — the filter itself, then validation,
  then tests — rather than one enormous commit bundling all three, or dozens of tiny, incomplete
  "WIP" commits.
- This granularity makes the history genuinely useful: if the validation specifically introduced a
  bug, `git bisect` or a manual review of history could isolate it to that specific commit, rather
  than an entire tangled feature.

## Common Mistakes

- **Committing directly to `main`**, skipping the branch/PR/review workflow entirely, even for
  "small" changes.
- **Letting a feature branch diverge from `main` for a long time** without periodically merging
  updates, risking a large, painful conflict later.
- **Writing commit messages like "fix" or "wip"** repeatedly, providing no real information for
  anyone (including future you) reviewing history later.

## When Should I Use It?

Follow this full workflow — branch, commit at meaningful checkpoints, push, PR, review, merge,
clean up — for every real piece of work on a project with any collaboration (or even solo projects
where the discipline still pays off), rather than treating git as an afterthought bolted on at the
end.

## Exercises

1. **(Recall)** What's a reasonable heuristic for deciding whether a commit is well-scoped?
2. **(Application)** Write out the full command sequence for starting a new feature branch,
   committing two logical changes separately, pushing, and (after merge) cleaning up the branch.
3. **(Problem Solving)** A feature branch has been open for two weeks with no commits merging
   `main`'s updates during that time, and now has a large, tangled merge conflict. Describe what
   should have been done differently, and how you'd approach resolving the current conflict.

## What Should I Learn Next?

Continue to
[`11-refactoring-and-technical-debt`](../11-refactoring-and-technical-debt) — improving existing
code deliberately, and managing the tradeoffs of moving fast versus keeping code maintainable.
