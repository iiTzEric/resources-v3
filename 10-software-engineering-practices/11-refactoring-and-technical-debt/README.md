# Refactoring & Technical Debt

**Module:** Software Engineering Practices
**Prerequisites:** [`10-git-workflows-and-branching`](../10-git-workflows-and-branching)

## What is it?

**Refactoring** means improving code's internal structure without changing its external behavior —
making it cleaner, more maintainable, or better organized, while it continues to do exactly what it
did before. **Technical debt** is the accumulated cost of shortcuts, quick fixes, or outdated
designs left unaddressed over time — like financial debt, it accrues "interest" (increasing
difficulty and risk) the longer it's left unresolved.

## Why does it matter?

Code inevitably accumulates rough edges over time, as requirements change and deadlines pressure
quick solutions over ideal ones. Refactoring is the deliberate practice of paying down that debt
before it compounds into a codebase that's genuinely difficult and risky to change safely.

## How does it work?

### A concrete refactoring example — same behavior, better structure

```javascript
// Before refactoring
function processOrder(order) {
  let total = 0;
  for (let i = 0; i < order.items.length; i++) {
    total = total + order.items[i].price * order.items[i].quantity;
  }
  if (order.customer.isVip) {
    total = total * 0.9;
  }
  return total;
}
```

```javascript
// After refactoring - same external behavior, clearer internal structure
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyVipDiscount(total, isVip) {
  return isVip ? total * 0.9 : total;
}

function processOrder(order) {
  const subtotal = calculateSubtotal(order.items);
  return applyVipDiscount(subtotal, order.customer.isVip);
}
```

Calling `processOrder` with the exact same input produces the exact same output before and after —
that's the defining characteristic of a genuine refactor, as opposed to a change that also alters
behavior (which would be a feature change or bug fix, not purely a refactor).

### Why tests matter enormously for safe refactoring

Recall the Testing topic: a solid test suite lets you refactor with real confidence — if tests still
pass after restructuring code, you have genuine evidence the external behavior is unchanged.
Refactoring code with no test coverage is meaningfully riskier, since you're relying purely on
manual verification (or hope) that nothing broke.

### Recognizing technical debt

Common signs: code that's genuinely hard to change without breaking something else; duplicated
logic scattered across many places; outdated dependencies with known security issues; workarounds
for a design decision that no longer fits how the application has actually evolved.

### Not all technical debt is a mistake

Sometimes technical debt is a **deliberate, reasonable tradeoff** — shipping a simpler solution
quickly to meet a genuine deadline or validate an idea, with a clear understanding that it'll need
revisiting later. This is meaningfully different from *accidental* debt (sloppy work, not
understanding the problem well) — deliberate debt, taken on knowingly and revisited later, is a
legitimate engineering tradeoff; accidental, unmanaged debt is a genuine problem.

### Managing debt deliberately

Real teams often track technical debt explicitly (a backlog item, a `// TODO` with context) rather
than letting it exist only as vague, unaddressed discomfort — and allocate some ongoing time
specifically to paying it down, rather than exclusively building new features indefinitely while
debt silently compounds.

## Simple Example

```javascript
// TODO: This uses a synchronous loop for simplicity during the MVP.
// Revisit with batch processing once order volume exceeds ~1000/day
// (tracked in issue #142).
function processAllOrders(orders) {
  for (const order of orders) {
    processOrder(order);
  }
}
```

## Let's Break It Down

- The comment explicitly acknowledges a deliberate simplification, explains the reasoning (an MVP
  deadline), and gives a concrete condition for when it should be revisited, plus a reference to
  track it (`issue #142`) — this is *managed*, deliberate technical debt, not an accidental oversight
  quietly left to compound unnoticed.
- Without this kind of explicit acknowledgment, the exact same code might later be mistaken for a
  simple oversight, or worse, remain unaddressed indefinitely with no one aware it needs revisiting.

## Common Mistakes

- **Refactoring without test coverage**, relying on hope rather than evidence that behavior is
  genuinely unchanged.
- **Mixing refactoring with behavior changes in the same commit/PR**, making it harder to review and
  riskier to revert if something goes wrong (harder to tell whether a resulting bug came from the
  refactor or the behavior change).
- **Letting technical debt accumulate silently**, without tracking or communicating it, until it
  becomes a genuine crisis.
- **Treating all technical debt as unacceptable**, rather than recognizing some deliberate,
  well-managed debt is a legitimate engineering tradeoff.

## When Should I Use It?

Refactor when code has become genuinely harder to work with than it should be, ideally backed by
tests giving confidence the behavior stays correct. Keep refactoring commits separate from behavior-
changing commits. Track deliberate technical debt explicitly rather than leaving it as vague,
unaddressed discomfort.

## Exercises

1. **(Recall)** What's the defining characteristic that distinguishes a refactor from a feature
   change or bug fix?
2. **(Understanding)** Explain why refactoring code with strong test coverage is meaningfully safer
   than refactoring code with none.
3. **(Application)** Identify a piece of duplicated or tangled logic in a project you've worked on
   (or a hypothetical one), and describe how you'd refactor it while preserving its exact behavior.

## What Should I Learn Next?

Continue to [`12-security-practices`](../12-security-practices) — defensive habits that apply
across any stack, tying together the Backend module's security topic with broader engineering
practice.
