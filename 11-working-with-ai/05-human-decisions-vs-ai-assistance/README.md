# Human Decisions vs AI Assistance

**Module:** Working With AI Tools
**Prerequisites:** [`04-recognizing-hallucinated-apis`](../04-recognizing-hallucinated-apis)

## What is it?

This closing topic addresses which kinds of decisions should deliberately remain yours — informed
by AI assistance, but not outsourced to it — and how to use AI throughout your learning and career
without eroding the actual understanding this entire curriculum has been building.

## Why does it matter?

The goal of using AI well isn't maximum reliance on it — it's genuine productivity gain *without*
sacrificing your own understanding, judgment, and ability to work independently when needed. This
final topic makes that balance explicit.

## How does it work?

### Decisions that should remain genuinely yours

- **Architecture decisions** — choosing a database type, an overall system structure, a
  technology stack — these require judgment about *your specific* project's real constraints,
  team, and goals, which an AI model, lacking full context on your actual situation, can inform but
  shouldn't unilaterally decide.
- **Security-critical logic** — authentication, authorization, payment handling — verify these with
  particular rigor (from the Verifying AI-Generated Code topic), given the real consequences of a
  subtle error.
- **Tradeoff judgments** — performance versus simplicity, speed versus maintainability (from the
  final SWE Practices topic) — these depend on context and priorities only you (or your team)
  genuinely have full visibility into.
- **Understanding what you ship** — regardless of who or what wrote a specific line, you're
  ultimately responsible for code you deploy; being unable to explain what your own shipped code
  does is a genuine problem, independent of how it was originally produced.

### The "explain it back" test

A genuinely useful, concrete check: after using AI assistance on something, can you explain — to a
colleague, in a code review, or just to yourself — *why* the code works the way it does, not just
*that* it works? If not, that's a clear, actionable signal to slow down and actually understand it
before shipping it, exactly the "explain, don't just generate" habit from the first topic in this
module.

### Avoiding dependency — a genuine, worth-naming risk

Habitually reaching for AI assistance on things you're fully capable of doing yourself can, over
time, genuinely erode skills you'd otherwise maintain through regular practice — precisely the same
concern that motivated this curriculum's insistence, throughout every practical section, on
actually running code yourself, reading real error messages, and understanding *why* something
worked or failed, not just accepting a working answer.

### A healthy, sustainable relationship with AI tools, summarized

- Use it to move faster on tasks you already understand.
- Use it to learn about things you don't yet understand — by asking for explanations, not just
  answers.
- Verify everything before shipping it, with the same rigor you'd apply to any other unfamiliar
  code.
- Keep your own independent skills sharp through deliberate practice, not just AI-assisted output.
- Make the judgment calls — architecture, security, tradeoffs — yourself, using AI as an input to
  that judgment, not a replacement for it.

## Simple Example

A healthy pattern, contrasted with an unhealthy one:

```
Healthy: "I don't understand promises well yet -- can you explain how this
async function works, step by step, and why await is needed here?"
[reads and genuinely engages with the explanation]

Unhealthy: "Just write the whole authentication system for my app."
[copies the output without review, doesn't understand JWT vs sessions,
can't explain any of it if asked, ships it to production]
```

## Let's Break It Down

- The healthy pattern uses AI specifically to build genuine understanding — asking "why," reading
  the explanation, and presumably able to explain it back afterward.
- The unhealthy pattern outsources both the implementation *and* the understanding of a genuinely
  security-critical system (authentication, from the Backend module) entirely — exactly the kind
  of decision this topic argues should remain informed by, not replaced by, AI assistance.

## Common Mistakes

- **Treating AI as a substitute for understanding**, rather than a tool that can help build it when
  used deliberately (asking for explanations, verifying output).
- **Outsourcing genuinely consequential decisions** (architecture, security) entirely to AI
  suggestions without applying your own judgment and context.
- **Losing track of your own independent skill level** by consistently reaching for AI assistance
  even on things you're fully capable of doing yourself, gradually eroding that capability through
  disuse.

## When Should I Use It?

Use AI assistance liberally for learning, exploration, and productivity on tasks you genuinely
understand or are actively working to understand. Reserve final judgment — on architecture,
security-critical logic, and genuine tradeoffs — for yourself, informed by AI input rather than
replaced by it.

## Exercises

1. **(Recall)** What is the "explain it back" test, and what does it help you catch?
2. **(Understanding)** Explain the genuine risk of habitually outsourcing tasks you're fully
   capable of doing yourself to AI assistance.
3. **(Application)** Reflect honestly: for a recent piece of code you used AI to help with (or
   imagine one), could you explain to someone else exactly why it works? If not, what would you do
   about that, based on this lesson?

## What Should I Learn Next?

This completes the Working With AI Tools module, and represents the last conceptual module of this
curriculum. Continue to [`12-projects`](../../12-projects) to apply everything from every module
in this curriculum to real, complete, progressively challenging projects.
