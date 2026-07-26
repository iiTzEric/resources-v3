# Fundamentals

The tool-level and conceptual basics that sit underneath every language — worth knowing solidly before (or alongside) any specific stack.

## Git & version control

**What:** A system for tracking changes to code over time, and collaborating without overwriting each other's work.

**Why:** Every professional codebase uses it. It's also just genuinely useful solo — you get to "undo" mistakes at the project level, not just the file level.

**Core commands:**
```bash
git init                        # start tracking a folder
git status                      # what's changed / staged / untracked
git add <file>                  # stage a file for commit
git commit -m "message"          # save a snapshot with a message
git log --oneline                # view history
git diff                         # see uncommitted changes
git branch <name>                 # create a new branch
git checkout <name>               # switch to a branch
git checkout -b <name>            # create + switch in one step
git merge <branch>                 # merge another branch into the current one
git push / git pull                 # sync with a remote (e.g. GitHub)
```

**Commit message convention worth adopting early** (Conventional Commits):
```
feat: add task deletion
fix: correct off-by-one in pagination
refactor: extract task validation into its own function
chore: update dependencies
docs: add setup instructions to README
```

**Common mistake:** Committing `node_modules/`, `.env`, or other machine-specific/secret files. Always create a `.gitignore` before your first commit, not after.

---

## The command line / terminal

**What:** A text-based way to interact with your computer — navigate folders, run programs, install tools.

**Why:** Nearly every tool in this repo (`npm`, `git`, `docker`, `python`) is used from the terminal. It's not optional infrastructure — it's the primary interface for a lot of development work.

**Commands worth having memorized:**
```bash
pwd            # print current directory
ls             # list files (ls -la for hidden files + details)
cd <folder>     # change directory
cd ..            # go up one level
mkdir <name>       # make a folder
touch <file>         # create an empty file
rm <file>              # delete a file (rm -r <folder> for a folder)
cat <file>               # print a file's contents
echo "text" > file        # write text to a file (overwrites)
echo "text" >> file        # append text to a file
```

---

## HTTP basics

**What:** The protocol browsers and servers use to communicate. Every API call you make (via `fetch`, `axios`, or a browser navigating to a page) is an HTTP request/response.

**Why:** Understanding this makes REST APIs (Express), status codes, and networking errors far less mysterious.

**Core concepts:**
- **Methods**: `GET` (read), `POST` (create), `PATCH`/`PUT` (update), `DELETE` (remove)
- **Status codes**: `2xx` success, `3xx` redirect, `4xx` client error (you sent something wrong), `5xx` server error (something broke on their end)
- **Headers**: metadata about the request/response (`Content-Type`, `Authorization`)
- **Body**: the actual data being sent (usually JSON in modern APIs)

---

## Big-O notation (just enough to be useful)

**What:** A way to describe how an algorithm's time or memory usage grows as input size grows — not exact timing, just the growth *shape*.

**Why:** Helps you reason about whether code will scale, and shows up constantly in technical interviews.

**The ones worth recognizing on sight:**
| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Accessing an array by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Looping through an array once |
| O(n log n) | Log-linear | Efficient sorting (merge sort) |
| O(n²) | Quadratic | Nested loop over the same array |

See [`../dsa/README.md`](../dsa/README.md) for this applied to real data structures.

---

## Debugging mindset

**What:** A repeatable process for figuring out why something's broken, instead of randomly changing code and hoping.

**A useful default sequence:**
1. Read the actual error message — where, what line, what type of error
2. Reproduce it reliably — know exactly what triggers it
3. Isolate — comment out / log intermediate values until you find where reality diverges from your expectation
4. Form a hypothesis, test *one* change at a time
5. Once fixed, understand *why* — not just that it works now

**Common mistake:** Changing multiple things at once when trying to fix a bug. If it works, you won't know which change actually mattered — and if it doesn't, you've made the problem harder to isolate.
