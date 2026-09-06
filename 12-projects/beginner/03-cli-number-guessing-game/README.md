# CLI Number Guessing Game

**Level:** Beginner
**Concepts practiced:** Fundamentals (loops, conditionals, functions), Python or JS, command line I/O

## What You're Building

A command-line game: the program picks a random number in a range, the player guesses repeatedly,
and the program gives "too high"/"too low" feedback until the player guesses correctly.

## What Concepts It Teaches

This is deliberately the simplest project in this curriculum, meant to solidify Module 01
(Fundamentals) and command-line basics before moving into anything web-related — loops,
conditionals, functions, and reading real user input from a terminal, in either Python or
JavaScript (Node.js).

## Requirements

- The program picks a random number in a fixed range (e.g., 1-100) at the start.
- The player can repeatedly guess, receiving "too high," "too low," or "correct" feedback after
  each guess.
- The game ends when the player guesses correctly, reporting how many guesses it took.
- Handle invalid input gracefully (the player types something that isn't a number) without
  crashing — connecting directly to the Fundamentals Error Handling lesson.

## Suggested Features

- A maximum number of allowed guesses, with a "game over" message if exceeded.
- Track and display the player's best (fewest-guesses) score across multiple rounds in the same
  session.
- Let the player choose the number range at the start.

## What You Should Figure Out Yourself

- How to read input from the terminal in your chosen language (covered conceptually in
  Fundamentals' Input/Output lesson, but the exact syntax/library is for you to look up and apply).
- How to generate a random number in your chosen language.
- The exact loop structure — a `while` loop is a natural fit here; consider why, based on the Loops
  lesson's guidance on when `while` fits better than `for`.

## Possible Extensions

- Add a hint system (e.g., "you're very close" within 5 of the answer).
- Rebuild it as a simple web page instead of command-line, applying the DOM/events topics from the
  JavaScript module.

## Skills Demonstrated

Completing this project demonstrates genuine command of the absolute fundamentals — loops that
correctly terminate, conditionals handling multiple cases correctly, and basic error handling for
invalid input — the bedrock everything else in this curriculum builds on.
