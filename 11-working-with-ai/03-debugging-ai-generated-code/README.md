# Debugging AI-Generated Code

**Module:** Working With AI Tools
**Prerequisites:** [`02-verifying-ai-generated-code`](../02-verifying-ai-generated-code)

## What is it?

This topic covers approaching bugs in AI-generated code methodically — applying the systematic
debugging process from Fundamentals and the advanced techniques from the SWE Practices module,
specifically to code you didn't write yourself and may not fully understand yet.

## Why does it matter?

Debugging unfamiliar code is inherently harder than debugging your own — you lack the mental model
you'd have built while writing it. This gap is exactly what makes deliberately *understanding*
AI-generated code (not just accepting it) so important, and this topic covers closing that gap when
a bug does appear.

## How does it work?

### Read and understand it first — before trying to fix anything

Recall the Fundamentals debugging process: form a specific hypothesis before making changes.
This is genuinely harder with unfamiliar code, which is precisely why understanding AI-generated
code *before* something breaks (asking for explanations, as covered in Using AI Effectively) pays
off — you're debugging from a position of actual understanding, not starting from zero exactly when
something's already gone wrong.

### If you don't understand it, ask for an explanation now

```
"This function is throwing a TypeError on line 4 when I pass an empty array.
Walk me through what this line is doing and why it might fail on empty input."
```

Using the AI tool itself to explain unfamiliar code it generated is a legitimate, genuinely useful
part of the debugging process — just remember to independently verify the explanation makes sense
and actually matches what the code does, rather than accepting a second AI-generated explanation
just as uncritically as the first AI-generated code.

### Apply the same systematic process from Fundamentals

1. Read the actual error message and stack trace carefully.
2. Form a specific hypothesis about what's wrong.
3. Verify that hypothesis directly (print/log the relevant value).
4. Narrow down from there.

None of this changes because the code was AI-generated — the same rigorous process applies
identically.

### Watch for AI "confidently" proposing an incorrect fix

If you ask the AI tool itself to fix a bug it introduced, verify the fix the same way you'd verify
any other generated code — a confidently-worded fix isn't automatically a correct one, and
AI tools can sometimes address the symptom you described rather than the actual underlying cause.

### Recognizing AI hallucinations as a specific debugging scenario

If a bug traces back to a function, library method, or API that doesn't actually exist (covered
fully in the next topic), the "bug" isn't really in your logic at all — it's that the generated
code referenced something that was never real to begin with. Recognizing this specific failure mode
quickly (rather than assuming your own usage is wrong) saves significant debugging time.

## Simple Example

A realistic debugging sequence for AI-generated code:

```
1. Error: "Cannot read properties of undefined (reading 'map')" on line 12
2. Ask: "Walk me through what user data looks like when this line runs"
3. Realize: the AI assumed `response.data.items` always exists, but the
   actual API sometimes returns `response.data` with no `items` field
4. Verify by logging the actual response shape yourself
5. Fix: add a fallback, `response.data.items || []`
```

## Let's Break It Down

- Step 1 starts with the actual error message, exactly as the Fundamentals process recommends.
- Step 2 uses the AI tool itself to help understand unfamiliar code — a legitimate part of the
  process, not a shortcut around it.
- Step 4 is the crucial verification step — confirming the actual data shape yourself, rather than
  trusting the AI's explanation of "why" without checking it against reality.
- Step 5 applies a fix informed by genuine understanding of the root cause, not just a guess.

## Common Mistakes

- **Trying to fix AI-generated code you don't actually understand**, essentially guessing rather
  than following the systematic process.
- **Trusting an AI-generated explanation of its own bug without independently verifying it**
  against the actual behavior/data.
- **Not recognizing a hallucinated API/method as the actual root cause**, and instead assuming your
  own usage or environment must be at fault.

## When Should I Use It?

Apply the exact same systematic debugging process to AI-generated code as any other code — reading
error messages carefully, forming specific hypotheses, verifying directly. Use the AI tool itself as
a resource for understanding unfamiliar code, while independently verifying its explanations.

## Exercises

1. **(Recall)** Why is debugging unfamiliar AI-generated code inherently harder than debugging your
   own code?
2. **(Application)** Describe how you'd approach debugging an AI-generated function that throws an
   error you don't understand, step by step.
3. **(Problem Solving)** You ask an AI tool to fix a bug, and it confidently provides a fix. What
   should you do before trusting that the fix is actually correct?

## What Should I Learn Next?

Continue to
[`04-recognizing-hallucinated-apis`](../04-recognizing-hallucinated-apis) — a specific, genuinely
common failure mode: AI confidently inventing functions, methods, or libraries that don't exist.
