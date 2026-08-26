# MongoDB + Mongoose

## What MongoDB actually is

**What:** A NoSQL, document-based database — stores data as JSON-like documents (called BSON) instead of rows/tables like a SQL database.

**Why:** Its document shape maps naturally onto JS objects, which makes it a common pairing with Node — you're not constantly converting between rows and objects.

**When:** Good fit for data that's naturally hierarchical or doesn't need complex multi-table joins (a blog post with comments, a user profile). Less ideal than SQL when you have deeply relational data with lots of cross-referencing and need strict consistency guarantees — worth knowing that trade-off exists, not something to worry about for most small-to-medium projects.

---

## Mongoose

**What:** An Object Data Modeling (ODM) library — lets you define schemas and interact with MongoDB using JS objects/classes instead of writing raw MongoDB queries.

**Why:** Raw MongoDB has no schema enforcement — any document can have any shape. Mongoose adds structure, validation, and a much friendlier API.

---

## Connecting

The code in this repository uses CommonJS (`require` and `module.exports`), so the examples below use that same module system.

```js
const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
}

connect();
```

---

## Schemas and models

**What:** A schema defines the shape of a document (fields, types, validation rules). A model is what you actually use to query/create documents based on that schema.

**How:**

```js
// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
); // auto-adds createdAt / updatedAt

module.exports = mongoose.model("Task", taskSchema);
```

---

## CRUD operations

```js
const Task = require("./models/Task");

async function runExamples() {
  // Create
  const task = await Task.create({ title: "Buy milk", userId: someUserId });

  // Read — all
  const tasks = await Task.find({ userId: someUserId });

  // Read — one
  const oneTask = await Task.findById(taskId);

  // Read — with a filter
  const incomplete = await Task.find({ userId: someUserId, completed: false });

  // Update
  const updated = await Task.findByIdAndUpdate(
    taskId,
    { completed: true },
    { new: true },
  );

  // Delete
  await Task.findByIdAndDelete(taskId);
}

runExamples();
```

**Common mistake:** Forgetting `{ new: true }` on `findByIdAndUpdate` — by default, Mongoose returns the document _as it was before_ the update, which is confusing if you immediately send that back to the client expecting the new value.

---

## Relationships (references and population)

**What:** How MongoDB (a non-relational DB) handles "this document relates to that one" — typically via storing an `ObjectId` reference, then "populating" it when needed.

**Why:** A task belongs to a user; you often want the user's info alongside the task without a separate query.

**How:**

```js
// When creating: store the reference
async function loadTaskWithUser() {
  const task = await Task.create({ title: "Buy milk", userId: user._id });

  // When reading: populate to get full user data instead of just the ID
  const tasks = await Task.find().populate("userId");
  // each task.userId is now the full user object, not just an ObjectId
}
```

**Common mistake:** Forgetting `.populate()` and being confused why `task.userId` is just a string of characters instead of a full user object — that string _is_ the reference; population is a separate, explicit step.

---

## Validation and error handling

```js
async function createTask() {
  try {
    const task = await Task.create({ title: "" }); // required field missing
  } catch (error) {
    if (error.name === "ValidationError") {
      // error.errors has field-specific messages
      console.log(error.errors);
    }
  }
}
```

Mongoose validation runs based on your schema (`required`, `enum`, `min`/`max`, custom validators) — it catches bad data before it reaches the database, not after.

---

## Indexes (worth knowing exists, not urgent at small scale)

**What:** A performance structure that speeds up queries on specific fields, at the cost of slightly slower writes and more storage.

**When:** Once your collections grow large and you're querying/filtering on a field often (e.g., `userId` on every task query) — add an index on it.

```js
taskSchema.index({ userId: 1 });
```
