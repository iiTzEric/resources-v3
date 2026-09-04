# Code Reviews

**Module:** Software Engineering Practices
**Prerequisites:** [`07-debugging-and-logging`](../07-debugging-and-logging)

## What is it?

A **code review** is another person examining your proposed code changes (typically via a pull
request, from the Git module) before they merge into a shared codebase — checking for correctness,
clarity, and alignment with the project's conventions.

## Why does it matter?

You've already learned the mechanics of opening a pull request — this topic covers the actual
substance of what a good review looks like, both giving and receiving one, since the PR mechanism
alone doesn't guarantee a genuinely useful review happens.

## How does it work?

### What a good review actually looks for

- **Correctness** — does the logic actually do what it's meant to do, including edge cases?
- **Clarity** — could someone unfamiliar with this specific change understand it from reading the
  code and its description?
- **Consistency** — does it follow the project's existing conventions (naming, structure, patterns
  already established elsewhere in the codebase)?
- **Test coverage** — are the meaningful new behaviors covered by tests?
- **Security/performance concerns** — anything from the Security or Performance topics that might
  apply here?

### Giving feedback constructively

```
Less useful: "This is wrong."

More useful: "This doesn't handle the case where `user` is null -- could this throw
if someone hasn't logged in yet? Might be worth adding a guard clause here."
```

Good feedback is specific, explains the *reasoning* (not just "change this"), and is framed
collaboratively rather than as a personal criticism — the goal is a better codebase, not "winning"
a disagreement about a specific line.

### Distinguishing severity of feedback

Not every comment carries the same weight — experienced reviewers often distinguish:
- **Blocking** — a genuine bug, security issue, or serious design problem that must be fixed before
  merging.
- **Suggestion** — a genuine improvement, but not required — the author can reasonably decide
  whether to adopt it.
- **Nitpick** — a minor stylistic preference, worth mentioning but not worth blocking a merge over.

Being explicit about which category a comment falls into (many teams literally prefix comments with
"nit:" for minor stylistic points) helps the author prioritize responses appropriately.

### Receiving feedback well

Recall from the earlier conversational guidance on responding to mistakes: receiving review
feedback isn't a judgment of your overall skill — it's a normal, expected, valuable part of
collaborative software development. Every experienced engineer has had changes requested on their
code; responding openly (asking clarifying questions, making requested changes, or respectfully
explaining your reasoning if you disagree) is the actual professional skill here, more than never
receiving feedback at all.

### Reviewing your own code first

Before requesting review from someone else, re-reading your own diff with fresh eyes (the "diff
view" from the GitHub & Pull Requests topic) often catches obvious issues yourself — a courtesy to
your reviewer, and a habit that improves your own code quality over time.

## Simple Example

A realistic review comment thread:

```
Reviewer: "This loop re-fetches the user on every iteration -- looks like it might be
an N+1 query. Could this be restructured to fetch all needed users once, upfront?"

Author: "Good catch, missed that. Updated to fetch all users in one query before the loop."

Reviewer: "Looks good, approving."
```

## Let's Break It Down

- The reviewer identifies a specific, genuine issue (connecting directly to the N+1 problem from
  the Databases module) with a clear, respectful explanation of the concern.
- The author responds constructively, without defensiveness, and makes the improvement.
- This is exactly what a healthy, functional code review interaction looks like — specific,
  substantive, and focused on the code's quality rather than the author personally.

## Common Mistakes

- **Giving vague feedback** ("this is confusing") without explaining specifically what's unclear or
  suggesting an alternative.
- **Treating every piece of feedback as equally blocking**, rather than distinguishing genuine
  issues from minor preferences.
- **Taking review feedback personally**, becoming defensive rather than engaging with the actual
  technical substance of the comment.
- **Approving reviews without genuinely reading the code**, defeating the entire purpose of having a
  review step at all.

## When Should I Use It?

Request review for any change headed into a shared codebase, even on solo projects, reviewing your
own diff carefully before considering it complete. Give feedback that's specific, explains its
reasoning, and clearly distinguishes blocking issues from minor suggestions.

## Exercises

1. **(Recall)** What's the difference between a "blocking" review comment and a "nitpick"?
2. **(Application)** Rewrite this vague review comment to be specific and constructive: "This
   function is bad."
3. **(Problem Solving)** A reviewer leaves 15 comments, all minor stylistic nitpicks, with no
   mention of a genuine null-reference bug you spotted yourself in the same code. What does this
   suggest about the review's actual thoroughness, and what would you do?

## What Should I Learn Next?

Continue to [`09-documentation`](../09-documentation) — writing docs and comments that genuinely
help, without over-documenting the obvious.
