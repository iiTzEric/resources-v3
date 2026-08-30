# Curriculum Map

This is the full learning path, in order. Each module lists its prerequisites — you should be
comfortable with those before starting. You don't have to follow this 100% linearly (e.g. Python
and Databases can run in parallel with other work), but the core spine —
**Fundamentals → JavaScript → Web Fundamentals → React → Backend → Databases → Software Engineering
Practices → Projects** — is meant to be followed in order.

## Why this order

- You can't learn a *language* well until you understand *programming* itself — hence
  Fundamentals comes first, language-agnostic.
- JavaScript comes before the web, because the DOM/fetch/browser topics assume you already know
  the language mechanics (closures, async, etc.) that explain *why* those APIs behave as they do.
- React comes after Web Fundamentals, because React is built on top of HTML/CSS/the DOM/HTTP —
  trying to learn React first means learning five things badly at once instead of one thing well
  at a time.
- Backend and Databases come after React (not before), so that by the time you learn "how a
  server stores and validates data," you already have a real frontend that needs one — the
  motivation is concrete, not abstract.
- Data Structures & Algorithms is listed as its own module, usable in parallel with backend/React
  work — it's foundational computer science, not tied to any one part of the stack.
- Software Engineering Practices comes near the end deliberately: concepts like "separation of
  concerns" or "when to use a design pattern" are close to meaningless until you've written enough
  real, messy code to feel the problems they solve.
- Projects are woven through at every level, not saved only for the end — but the Projects module
  itself sits last as the place where everything gets combined deliberately.

## Modules

| # | Module | Prerequisites |
|---|--------|----------------|
| 01 | [Programming Fundamentals](./01-fundamentals) | None |
| 02 | [Git & Version Control](./02-git-and-version-control) | 01 (command line, git intro) |
| 03 | [JavaScript](./03-javascript) | 01 |
| 04 | [Python (parallel track)](./04-python) | 01 |
| 05 | [Web Fundamentals](./05-web-fundamentals) | 01, 03 (basic JS) |
| 06 | [React](./06-react) | 03, 05 |
| 07 | [Backend Development](./07-backend) | 03, 05 |
| 08 | [Databases](./08-databases) | 07 (helpful in parallel) |
| 09 | [Data Structures & Algorithms](./09-data-structures-and-algorithms) | 03 or 04 |
| 10 | [Software Engineering Practices](./10-software-engineering-practices) | Some 06/07 experience |
| 11 | [Working With AI Tools](./11-working-with-ai) | Enough fundamentals to read code critically |
| 12 | [Projects](./12-projects) | Applies everything above, by level |

## What's carried over from `resources-v2` (the original repo)

The original repo's top-level folders — `fundamentals`, `javascript`, `python`, `React`,
`Backend`, `dsa`, `services`, `styles` — map roughly onto modules 01, 03, 04, 06, 07, 09, and parts
of 05/10 here. The topic *areas* were a reasonable starting point and are preserved conceptually.
What's changed:

- **Added, previously missing:** Git & Version Control as its own module (was not covered at all);
  Web Fundamentals as a distinct module bridging Fundamentals → React (previously implicit/missing,
  which meant jumping into React without a solid HTML/CSS/HTTP base); Databases as a full
  conceptual module (previously, if present, likely commands-only inside `services` rather than
  taught from first principles); Software Engineering Practices as a named module (clean code,
  SOLID, testing, architecture — not present as such before); Working With AI Tools (did not exist
  before, and is increasingly necessary); a graded Projects track (beginner/intermediate/advanced)
  instead of ad hoc examples.
- **Reordered:** JavaScript now explicitly precedes the DOM/browser topics rather than mixing
  language mechanics and browser APIs together; React now explicitly requires Web Fundamentals as
  a prerequisite instead of being reachable directly from JavaScript basics.
- **Deepened:** JavaScript now separates true language depth (closures, `this`, prototypes, event
  loop, microtasks/macrotasks) from browser APIs — the original `javascript` folder's scope was
  unclear on this split. DSA now specifies a consistent explanation format per structure
  (what/how/why/complexity/when-to-use/when-not-to-use/example/real use case) rather than being a
  loose folder of problems (`dsa` in the original appears to be individual solved problems, e.g.
  "maximum depth of binary tree," with no surrounding conceptual scaffolding).
- **Split out:** `styles` (presumably CSS) is now explicitly part of Web Fundamentals rather than a
  disconnected top-level folder with unclear relationship to the rest of the path.
- **Renamed for clarity:** `services` (unclear scope from the folder name alone) is superseded by
  the explicit Backend + Databases modules, which name their contents directly.

## Status of this branch

This branch currently contains the **full structure and topic map only** — every module and topic
folder exists with a placeholder `README.md` describing what that lesson will cover, in the
consistent format described in the root README. Full lesson content is being written module by
module, starting with Fundamentals, in follow-up commits. This lets the shape of the whole
curriculum be reviewed before time is spent writing hundreds of pages of content into a structure
that might still need to change.
