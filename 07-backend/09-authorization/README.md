# Authorization

**Module:** Backend Development
**Prerequisites:** [`08-authentication`](../08-authentication)

## What is it?

**Authorization** determines what an already-authenticated user is actually allowed to do —
distinct from authentication, which only establishes *who* they are. "Are you logged in?" is
authentication; "are you allowed to delete this specific post?" is authorization.

## Why does it matter?

Confusing these two concepts (or implementing one without the other) is a genuine, common security
gap — an application can correctly verify who someone is, while still failing to check whether
they're actually permitted to perform the specific action they're attempting.

## Mental Model

Recall the earlier mental model: authentication is showing your ID at the front desk; authorization
is the specific set of doors your badge actually opens once inside. Being authenticated (having a
valid badge) doesn't mean you're authorized for every door in the building.

## How does it work?

### A basic authorization check, as middleware

```javascript
function requireRole(role) {
  return function(req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

app.delete("/users/:id", requireAuth, requireRole("admin"), (req, res) => {
  // only reaches here if authenticated AND has the admin role
});
```

Notice the two middlewares stacked: `requireAuth` (from the previous topic, establishing *who* the
user is) runs first, then `requireRole("admin")` (checking *what they're allowed to do*) runs
second — authentication and authorization as clearly separate, composable steps.

### Ownership checks — a very common authorization pattern

```javascript
app.delete("/posts/:id", requireAuth, async (req, res) => {
  const post = await findPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Not found" });

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ error: "You can only delete your own posts" });
  }

  await deletePost(req.params.id);
  res.status(204).send();
});
```

A common, specific case of authorization: not "does this user have a special role," but "does this
user own the specific resource they're trying to modify." This check requires actually looking up
the resource first, to compare its ownership against the requesting user.

### `401` vs `403` — using the right status code

- **`401` Unauthorized** — "we don't know who you are" (not authenticated at all, or invalid/
  expired credentials).
- **`403` Forbidden** — "we know who you are, and you're not allowed to do this" (authenticated,
  but not authorized for this specific action).

Using the correct one communicates precisely what went wrong to the client — a `401` suggests
"log in (again)"; a `403` suggests "this account genuinely can't do this," a meaningfully different
situation.

### Role-based vs. resource-based authorization

- **Role-based** — permissions tied to a role (`admin`, `member`, `moderator`) — simple, common for
  coarse-grained access control.
- **Resource-based (ownership)** — permissions tied to a specific relationship between the user and
  a specific piece of data (as in the post-deletion example above) — necessary for finer-grained
  control that a role alone can't express.

Real applications often combine both: a role might grant broad categories of access, while
ownership checks handle per-resource specifics within that.

## Simple Example

```javascript
app.patch("/orders/:id/status", requireAuth, requireRole("admin"), async (req, res) => {
  const order = await updateOrderStatus(req.params.id, req.body.status);
  res.json(order);
});

app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await findOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  if (order.userId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized to view this order" });
  }
  res.json(order);
});
```

## Let's Break It Down

- The first route uses simple role-based authorization — only admins can update an order's status.
- The second route combines both approaches: a regular user can view their *own* order (an
  ownership check), while an admin can view *any* order (a role-based override) — demonstrating how
  the two authorization styles often combine in real logic.

## Common Mistakes

- **Confusing authentication with authorization**, assuming "logged in" automatically means
  "allowed to do this specific thing."
- **Checking authorization only on the frontend** (hiding a button) without enforcing it on the
  backend — exactly the same "client-side alone is not security" principle from the Validation
  topic.
- **Using `401` when `403` is actually correct**, or vice versa, giving clients (and attackers)
  misleading information about the actual situation.

## When Should I Use It?

Apply authorization checks on the backend for every action that isn't universally available to any
authenticated user — role checks for broad categories of access, ownership checks for per-resource
permissions. Never rely solely on hiding UI elements as a substitute for real server-side
enforcement.

## Exercises

1. **(Recall)** What's the precise difference between authentication and authorization?
2. **(Understanding)** Explain why `401` and `403` communicate genuinely different situations to a
   client.
3. **(Application)** Write an authorization check for a `PUT /comments/:id` route that only allows
   the comment's original author (or an admin) to edit it.

## What Should I Learn Next?

Continue to [`10-sessions-cookies-jwt`](../10-sessions-cookies-jwt) — the actual mechanisms for
tracking that a user is logged in across multiple requests.
