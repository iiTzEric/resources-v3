# Verifying AI-Generated Code

**Module:** Working With AI Tools
**Prerequisites:** [`01-using-ai-effectively`](../01-using-ai-effectively)

## What is it?

This topic covers the concrete practice of checking AI-generated code before trusting or shipping
it — applying the same testing, review, and debugging skills from earlier in this curriculum,
specifically to output you didn't personally write.

## Why does it matter?

AI-generated code can look entirely plausible and confident while containing genuine bugs, security
issues, or subtly incorrect logic. Because it reads fluently, it can be *more* dangerous to blindly
trust than obviously-rough human-written code — the polish doesn't guarantee correctness.

## How does it work?

### Actually running it — the non-negotiable first step

Recall the pattern established throughout this entire curriculum's practical sections: paste
generated code, then genuinely **run it**, don't assume it works from reading it. This single habit
catches an enormous share of real problems immediately.

### Testing edge cases specifically

```javascript
// AI-generated function
function getDiscount(price, quantity) {
  if (quantity > 10) return price * 0.9;
  return price;
}
```

Deliberately testing beyond the "happy path": what if `quantity` is exactly `10`? Negative? What if
`price` is `0`? AI-generated code, like any code, needs the same edge-case thinking from the
Fundamentals Conditionals lesson's boundary-condition guidance — an AI tool has no special immunity
to off-by-one errors or unhandled edge cases.

### Checking that it actually does what you asked, not just something plausible

AI can confidently produce code that solves an adjacent, but subtly different, problem than what
you actually intended — reading the generated code carefully against your *actual* requirement,
not just skimming for "does this look like reasonable code," is essential.

### Applying your existing review skills

Everything from the Code Reviews topic applies directly: does it handle errors appropriately (Error
Handling topics)? Does it validate input (Validation topic)? Does it follow the project's existing
conventions? Would you approve this if a human teammate had submitted it?

### Writing tests for AI-generated code, same as any other code

```javascript
test("getDiscount applies 10% discount for quantity over 10", () => {
  expect(getDiscount(100, 11)).toBe(90);
});
test("getDiscount applies no discount at exactly 10", () => {
  expect(getDiscount(100, 10)).toBe(100); // verify the boundary behaves as intended
});
```

Writing tests forces you to be explicit about what "correct" actually means for this code — a
genuinely useful exercise regardless of whether the code was AI-generated or self-written, but
especially valuable when verifying code you didn't personally write line by line.

## Simple Example

A realistic verification checklist applied to a generated function:

```
1. Does it run without errors on typical input? [test it]
2. Does it handle empty/null/undefined input gracefully? [test it]
3. Does it handle boundary values correctly (exactly at a threshold)? [test it]
4. Does it match the actual requirement, not just "look reasonable"? [re-read carefully]
5. Does it follow this project's existing conventions/style? [compare]
6. Would this pass a normal code review from a human teammate? [apply that standard]
```

## Let's Break It Down

- Each step targets a specific, real risk: functional correctness (1-3), matching actual intent (4),
  consistency (5), and overall quality (6) — collectively, this is a genuinely thorough check, not
  excessive caution.
- This checklist isn't meaningfully different from how you'd verify a human teammate's
  unfamiliar pull request — the standard for AI-generated code should be the same, not lower.

## Common Mistakes

- **Trusting code because it "looks professional" or well-formatted**, mistaking surface polish for
  actual correctness.
- **Skipping edge-case testing specifically for AI-generated code**, applying less scrutiny than
  you would to your own or a colleague's code.
- **Not verifying the code solves your actual problem**, rather than a plausible-sounding adjacent
  one.

## When Should I Use It?

Apply this verification process to every piece of AI-generated code before it ships, with the same
rigor (or more, given you didn't personally reason through every line) as reviewing a human
colleague's unfamiliar code.

## Exercises

1. **(Recall)** Why can confident, well-formatted AI output be more risky to blindly trust than
   obviously rough code?
2. **(Application)** Write two edge-case tests for the `getDiscount` function above, beyond the
   ones already shown.
3. **(Problem Solving)** An AI-generated function passes all your manual spot-checks but was
   actually asked to solve a slightly different problem than what you needed. What verification
   step in this lesson would have caught this?

## What Should I Learn Next?

Continue to [`03-debugging-ai-generated-code`](../03-debugging-ai-generated-code) — approaching
unfamiliar, AI-written code methodically when something does go wrong.
