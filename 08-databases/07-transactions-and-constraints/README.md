# Transactions & Constraints

**Module:** Databases
**Prerequisites:** [`06-queries-and-crud`](../06-queries-and-crud)

## What is it?

A **transaction** groups multiple database operations so they either **all** succeed together, or
**all** fail together, with no partial, inconsistent result left behind. **Constraints** are rules
the database itself enforces on data (like "this field can't be empty" or "this value must be
unique"), rejecting any operation that would violate them.

## Why does it matter?

Some operations genuinely require multiple steps that must happen together, atomically — transferring
money between two accounts, for instance, requires both decreasing one balance and increasing
another; if only one step succeeded due to a crash or error partway through, the data would be left
in a genuinely inconsistent, incorrect state. Transactions prevent exactly this.

## How does it work?

### The problem transactions solve

```javascript
// WITHOUT a transaction - dangerous if an error occurs between these two steps
await Account.findByIdAndUpdate(fromId, { $inc: { balance: -100 } });
// if the server crashes right here, money has vanished from one account
// without ever appearing in the other
await Account.findByIdAndUpdate(toId, { $inc: { balance: 100 } });
```

If anything goes wrong between these two operations (a crash, a network failure, a thrown error),
the first account has been debited but the second was never credited — money has effectively
disappeared, a genuinely serious data integrity failure.

### Using a transaction

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.findByIdAndUpdate(fromId, { $inc: { balance: -100 } }, { session });
  await Account.findByIdAndUpdate(toId, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction(); // undoes BOTH operations if either failed
  throw error;
} finally {
  session.endSession();
}
```

If any operation within the transaction fails, `abortTransaction()` rolls back **everything** done
within it — the database returns to exactly the state it was in before the transaction began, as if
neither operation had ever happened. This "all or nothing" guarantee is often summarized by the
acronym **ACID** (Atomicity, Consistency, Isolation, Durability) — a set of properties well-designed
transactional databases aim to guarantee.

### Constraints — rules enforced automatically by the database

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 0)
);
```

- **`NOT NULL`** — this field can never be left empty.
- **`UNIQUE`** — no two rows can share the same value in this column (preventing duplicate emails,
  for instance).
- **`CHECK (age >= 0)`** — a custom rule; the database rejects any row violating it.

These constraints provide a genuine safety net at the database level, catching invalid data even if
your application code's own validation (from the Backend module) somehow has a bug or gets
bypassed — a deliberate, valuable "defense in depth" principle: don't rely on just one layer to
catch every problem.

### MongoDB's schema validation — a looser parallel

Mongoose schemas (which you've already used) provide similar validation at the application level:

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 }
});
```

This is enforced by Mongoose itself, in your application layer, rather than by MongoDB's own
storage engine as rigorously as a relational database's built-in constraints — a genuine, real
difference in how strictly each system enforces data rules by default.

## Simple Example

```sql
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  balance DECIMAL CHECK (balance >= 0)
);
```

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## Let's Break It Down

- The `CHECK (balance >= 0)` constraint prevents any single update from ever leaving an account
  with a negative balance — a rule enforced automatically, regardless of what application code
  attempts.
- `BEGIN`/`COMMIT` wraps both updates in a transaction — if the second update somehow failed (say,
  it violated the `CHECK` constraint because it would've gone negative), the entire transaction
  would roll back, undoing the first update too, rather than leaving one account debited with no
  corresponding credit.

## Common Mistakes

- **Performing multiple related operations without a transaction**, risking genuinely inconsistent
  data if a failure occurs partway through.
- **Relying solely on application-level validation** without database-level constraints as a
  backup safety net.
- **Wrapping every single operation in a transaction unnecessarily**, adding overhead for
  operations that don't actually require this "all or nothing" guarantee.

## When Should I Use It?

Use a transaction whenever multiple related database operations must succeed or fail together as a
single, indivisible unit (financial operations, anything where partial completion would leave data
in a genuinely inconsistent state). Add constraints for any data rule that should always hold true,
regardless of what application code attempts.

## Exercises

1. **(Recall)** What does it mean for a transaction to guarantee "all or nothing"?
2. **(Understanding)** Explain, using the money-transfer example, why performing two related
   updates without a transaction is genuinely risky.
3. **(Application)** Design constraints for a `products` table ensuring `price` is never negative
   and `sku` (a product code) is always unique.

## What Should I Learn Next?

Continue to
[`08-normalization-and-data-modeling`](../08-normalization-and-data-modeling) — structuring data
thoughtfully to avoid duplication and inconsistency.
