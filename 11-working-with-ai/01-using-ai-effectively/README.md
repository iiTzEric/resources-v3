# Using AI Effectively

**Module:** Working With AI Tools
**Prerequisites:** Enough fundamentals to read code critically

## What is it?

This topic covers using AI coding assistants (like the one that helped generate parts of this
curriculum) as a genuine productivity and learning tool — treated as a knowledgeable collaborator
to think alongside, not an oracle whose output should be accepted uncritically.

## Why does it matter?

AI tools are genuinely useful throughout modern software engineering — but used carelessly, they
can produce plausible-looking, subtly incorrect code, or create a dependency that erodes your own
understanding over time. This module aims for the middle ground: real, practical benefit without
those real risks.

## How does it work?

### Good prompting — being specific about context and constraints

```
Vague: "Write a function to validate emails"

Specific: "Write a JavaScript function that validates an email has an @ symbol
and at least one character before and after it. It should return a boolean,
not throw. This is for a signup form, so it needs to handle empty strings
gracefully (return false, not error)."
```

A specific prompt — including the language, exact expected behavior, edge cases you care about, and
context about how it'll be used — produces meaningfully more useful, correctly-scoped output than a
vague one, for exactly the same reason a well-specified requirement produces better results from a
human collaborator too.

### Asking AI to explain, not just generate

```
"Explain what this regex does, piece by piece, before I use it."
"Why did you choose useEffect here instead of useMemo?"
```

Asking for explanation alongside generated code — and actually reading the explanation — is what
turns AI assistance into a genuine learning tool, rather than a black box you copy without
understanding.

### Using AI for the right kinds of tasks

Genuinely strong use cases: explaining unfamiliar code or error messages, generating boilerplate
you'll review and adapt, exploring alternative approaches to a problem, rubber-duck-style
discussion of a design decision (connecting to the Debugging topic).

Weaker or riskier use cases: architecture decisions for a system AI has no real context on beyond
what you've described; security-critical code accepted without independent verification; anything
where you plan to ship the output without genuinely understanding it first.

### Iterating, not accepting the first output

Treating an initial AI response as a draft to question and refine — "this doesn't handle the case
where the array is empty, can you fix that?" — mirrors exactly the code review process from the SWE
Practices module, just directed at AI-generated code instead of a human colleague's.

## Simple Example

A realistic, effective AI-assisted workflow:

```
1. "I need to validate a signup form with email, password (8+ chars), and
   a confirm-password field that must match. Write this validation logic
   in JavaScript, and explain your approach."
2. [AI generates code + explanation]
3. "Why did you check password length before checking the emails match?"
4. [Read the explanation, confirm it makes sense]
5. "What happens if confirmPassword is undefined -- does this handle that?"
6. [AI clarifies or fixes a gap]
7. Manually test the final code with a few real inputs before using it
```

## Let's Break It Down

- Step 1 gives specific requirements, not a vague request.
- Steps 3 and 5 actively probe the reasoning and edge cases, rather than passively accepting the
  first output.
- Step 7 is genuinely essential and easy to skip — actually running/testing the code yourself,
  rather than trusting it worked because it "looks right."

## Common Mistakes

- **Accepting the first generated response without question**, missing errors or unhandled edge
  cases a moment of genuine scrutiny would catch.
- **Writing vague prompts** and being frustrated by generic, poorly-fitted output.
- **Never asking for explanations**, missing the substantial learning value AI assistance can
  provide when used deliberately.

## When Should I Use It?

Use AI assistance for explanation, boilerplate generation, exploring alternatives, and
rubber-duck-style discussion — always paired with your own genuine review and testing before
shipping anything. Reserve independent judgment for architecture and security-critical decisions.

## Exercises

1. **(Recall)** What makes a prompt "specific" rather than "vague," concretely?
2. **(Application)** Rewrite this vague prompt to be specific: "Make this code better."
3. **(Problem Solving)** You ask an AI tool to write a function and it produces working-looking
   code on the first try. What should you still do before using it in a real project?

## What Should I Learn Next?

Continue to [`02-verifying-ai-generated-code`](../02-verifying-ai-generated-code) — the concrete
practice of checking AI output rather than trusting it by default.
