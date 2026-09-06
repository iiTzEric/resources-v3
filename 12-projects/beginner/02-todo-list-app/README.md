# To-Do List App

**Level:** Beginner
**Concepts practiced:** JS DOM manipulation or React state, localStorage, arrays/objects

## What You're Building

A to-do list application: add tasks, mark them complete, delete them, and have the list persist
across page reloads.

## What Concepts It Teaches

Build this **twice**, deliberately, to feel the difference the React module describes directly:
first with vanilla JavaScript (DOM manipulation, event listeners, arrays of objects — Fundamentals
and JavaScript modules), then again with React (`useState`, controlled inputs, list rendering with
keys — React module). This mirrors exactly the progression this curriculum's own practical sections
walked through.

## Requirements

- Add a new task via a text input and a button (or pressing Enter).
- Display all current tasks in a list.
- Mark a task as complete (visually distinct, e.g., strikethrough).
- Delete a task.
- Tasks persist across a page reload, using `localStorage` (JavaScript module topic).
- Handle the empty-list case gracefully (don't just show a blank area).

## Suggested Features

- A count of remaining (incomplete) tasks.
- A way to filter: show all / active / completed only.
- Editing an existing task's text.

## What You Should Figure Out Yourself

- The exact data shape for a task (at minimum: text and a completed flag — what else might be
  useful?).
- How to structure the `localStorage` read/write logic — when exactly should saving happen?
- In the React version: where state should live, and whether any part of this app's structure
  benefits from the composition patterns from the React module.

## What Should I Learn Next?

*(Build order suggestion, not a requirement)* Try the vanilla JS version first if you haven't
already built something like this during the JavaScript module's practical work; then rebuild it in
React specifically to notice what becomes easier (list re-rendering, no manual DOM updates) and
what requires new thinking (controlled inputs, `key` props).

## Possible Extensions

- Add due dates and sort tasks by them.
- Add categories/tags to tasks.
- Rebuild the persistence layer using a real backend + database (Backend and Databases modules)
  instead of `localStorage`, turning this into a genuine full-stack project.

## Skills Demonstrated

Completing both versions demonstrates a genuine, felt understanding of the difference between
imperative DOM manipulation and React's declarative model — not just knowing the syntax of each, but
having built the identical feature both ways and noticed where each approach helps or adds
friction.
