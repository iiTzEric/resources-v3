# GitHub & Pull Requests

**Module:** Git & Version Control
**Prerequisites:** [`03-collaboration-workflows`](../03-collaboration-workflows)

## What is it?

A **pull request** (PR) is a GitHub feature that formally proposes merging one branch into another,
giving other people (or just yourself, on a solo project) a chance to review the actual changes
before they become part of `main`. It's the concrete mechanism that turns "the feature branch
workflow" from a general idea into something you actually do, step by step, on GitHub.

## Why does it matter?

Merging directly and silently means nobody (including future you) gets a chance to catch mistakes,
ask questions, or suggest improvements before code becomes part of the permanent, shared history.
Pull requests create a deliberate checkpoint for review — genuinely one of the most impactful
habits in professional software development, and a skill that transfers to essentially every team
you'll ever work on.

## How does it work?

### Opening a pull request

Once you've pushed a branch to GitHub:

```bash
git push -u origin feature/dark-mode
```

GitHub will typically show a direct link to open a pull request for that branch (you may have seen
this exact message in your own terminal output before: `Create a pull request for '...' by
visiting: ...`). Opening it, you specify: which branch you want merged (the **head** branch, e.g.
`feature/dark-mode`) into which branch (the **base** branch, usually `main`), a title, and a
description of what the change does and why.

### What a good pull request description includes

- **What changed** — a clear summary, not just "various fixes."
- **Why** — the motivation or problem being solved.
- **How to verify it** — steps someone could take to confirm the change works as intended.
- **Anything the reviewer should pay special attention to** — a tricky piece of logic, a deliberate
  tradeoff, an area you're unsure about.

A pull request with a thoughtful description is dramatically easier and faster to review than one
that just says "changes" — this is a real, practical courtesy to whoever reviews it (including
future you, months later, wondering why a change was made).

### The diff view — reviewing exactly what changed

GitHub's pull request page shows a **diff**: every line added (green) and removed (red) across
every changed file. This is the actual content a reviewer evaluates — reading through it carefully,
checking that the logic makes sense, that nothing unintended was included, and that it matches
what the description claims.

### Review comments and requested changes

Reviewers can leave comments on specific lines, ask questions, or request changes before approving.
This back-and-forth is a normal, healthy part of the process — not a sign that something went
wrong. Responding to review feedback, making the requested adjustments, and pushing additional
commits to the same branch automatically updates the same pull request — you don't need to open a
new one.

### Merging a pull request

Once a PR is approved (or, on a solo project, once you're satisfied with it yourself), GitHub
provides a merge button, with a few common merge strategies:

- **Merge commit** — preserves every individual commit from the branch, plus a new commit marking
  the merge itself.
- **Squash and merge** — combines all the branch's commits into a single, clean commit on `main`,
  useful when a branch has many small, "work in progress" commits that aren't individually
  meaningful.
- **Rebase and merge** — replays the branch's commits directly onto `main`, without a separate merge
  commit, producing a linear history.

Different teams prefer different strategies; "squash and merge" is a common, approachable default
since it keeps `main`'s history clean and readable, one commit per completed feature/fix.

### Branch protection — preventing direct pushes to `main`

Many real projects configure GitHub to *require* pull requests for any change to `main` — direct
pushes are simply blocked, enforcing the review process rather than relying on everyone remembering
to follow it voluntarily. This is a setting worth knowing exists, even if you don't configure it
yourself right away.

## Simple Example

A full pull request cycle, described step by step:

1. `git checkout -b fix/broken-image-links`, make the fix, commit, push.
2. Open a pull request on GitHub: base `main`, head `fix/broken-image-links`.
3. Write a description: "Several product images were pointing at removed files. Updated the image
   paths to the current asset locations. Verified by loading the product page locally and confirming
   all images render."
4. A teammate reviews, leaves one comment asking about a specific path, you respond and confirm it's
   correct.
5. They approve; you (or they) click "Squash and merge."
6. The branch is deleted; `main` now includes this fix as one clean commit.

## Let's Break It Down

- The branch and commit process is identical to what you already know from the previous topics —
  the pull request is an additional, deliberate step layered on top, not a replacement for any of
  it.
- The description explains what, why, and how to verify — exactly the information a reviewer (or
  future you) would actually want, rather than assuming the diff alone speaks for itself.
- The review comment-and-response cycle is a normal part of the process, not a sign anything went
  wrong — it's precisely the mechanism that catches issues before they reach `main`.

## Common Mistakes

- **Opening pull requests with no description**, forcing reviewers to reverse-engineer intent
  purely from the diff.
- **Making pull requests enormous**, bundling many unrelated changes together — this makes review
  genuinely difficult and slow. Smaller, focused pull requests are almost always easier to review
  and merge confidently.
- **Taking review comments personally** rather than as a normal, expected part of collaborative
  software development — every experienced engineer has had changes requested on their PRs; it's
  not a judgment of skill.
- **Merging your own pull requests without any real review**, even on solo projects, missing the
  chance to re-read your own diff with fresh eyes before it becomes permanent.

## When Should I Use It?

Open a pull request for any change headed into `main`, even on solo projects — the discipline of
writing a clear description and reviewing your own diff before merging catches real mistakes.
Prefer smaller, focused pull requests over large ones whenever the work can reasonably be split that
way, since they're faster to review and easier to reason about if something later needs to be
reverted.

## Exercises

1. **(Recall)** What are the three merge strategies GitHub offers, and what's the main practical
   difference between them?
2. **(Understanding)** Explain why a pull request description matters even for a small,
   seemingly obvious change.
3. **(Application)** Write a realistic pull request description (what/why/how to verify) for a
   change that fixes a typo in a website's footer copyright year.
4. **(Problem Solving)** A pull request has grown to include changes across 30 files, mixing a new
   feature with several unrelated bug fixes. A reviewer says it's too large to review confidently.
   What would you suggest doing to address this?

## What Should I Learn Next?

Continue to [`05-undoing-mistakes`](../05-undoing-mistakes) — even with careful workflows, mistakes
happen: a bad commit, an accidental push, a merge that shouldn't have happened. This topic covers
how to safely recover.
