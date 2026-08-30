import os

ROOT = "/home/claude/resources-v2"

# Each module: (folder, title, prerequisites, blurb, [ (topic_folder, topic_title, one_liner), ... ])
MODULES = [
    (
        "01-fundamentals",
        "Programming Fundamentals",
        "None — this is the starting point.",
        "How computers and programs actually work, and the building blocks every language shares: variables, logic, loops, functions, and how to think about and fix your own code.",
        [
            ("01-how-programs-work", "How Programs Work", "What actually happens when code runs: source code, interpreters/compilers, instructions, execution."),
            ("02-variables-and-data-types", "Variables & Data Types", "Naming and storing values; numbers, strings, booleans, and why types matter."),
            ("03-operators", "Operators", "Arithmetic, comparison, logical, and assignment operators, and how precedence works."),
            ("04-conditionals", "Conditionals", "Making decisions in code: if/else, comparison logic, and common ordering mistakes."),
            ("05-loops", "Loops", "Repeating work: for loops, while loops, iteration, and when each fits."),
            ("06-functions", "Functions", "Reusable blocks of logic: parameters, arguments, return values, and why functions exist."),
            ("07-scope", "Scope", "Where variables live and who can see them: global, function, and block scope."),
            ("08-data-structures-intro", "Data Structures (Intro)", "Arrays/lists and objects/maps as ways of organizing data, before going deep in the DSA module."),
            ("09-error-handling-and-debugging", "Error Handling & Debugging", "Reading error messages, forming hypotheses, and systematically finding bugs."),
            ("10-algorithms-and-complexity-intro", "Algorithms & Complexity (Intro)", "What an algorithm is, and a first, gentle look at Big O — deep dive lives in the DSA module."),
            ("11-memory-basics", "Memory Basics", "Stack vs heap, references vs values, and why some bugs come from misunderstanding this."),
            ("12-input-output-and-files", "Input, Output & Files", "Reading input, producing output, and working with files on disk."),
            ("13-modules-and-packages", "Modules & Packages", "Splitting code across files, importing/exporting, and what a package manager does."),
            ("14-apis-http-json", "APIs, HTTP & JSON", "What an API is, the request/response idea, and JSON as a shared data format."),
            ("15-command-line-basics", "Command Line Basics", "Navigating and using a terminal: the tool you'll live in for the rest of this path."),
            ("16-git-and-github-intro", "Git & GitHub (Intro)", "Why version control exists and the core save/sync loop — deep dive lives in its own module."),
        ],
    ),
    (
        "02-git-and-version-control",
        "Git & Version Control",
        "01-fundamentals (Command Line Basics, Git & GitHub Intro)",
        "Version control in depth: branching, merging, collaboration workflows, and how real teams use git day to day.",
        [
            ("01-git-basics-recap", "Git Basics Recap", "The init/add/commit/push loop, and reading git status/log confidently."),
            ("02-branching-and-merging", "Branching & Merging", "Working on features in isolation, merge vs rebase, and resolving conflicts."),
            ("03-collaboration-workflows", "Collaboration Workflows", "Feature branches, forks, and common team workflows (trunk-based, git-flow at a glance)."),
            ("04-github-and-pull-requests", "GitHub & Pull Requests", "Opening PRs, code review etiquette, merging, and protecting main branches."),
            ("05-undoing-mistakes", "Undoing Mistakes", "git reset, revert, checkout, and safely recovering from a bad commit or push."),
        ],
    ),
    (
        "03-javascript",
        "JavaScript",
        "01-fundamentals",
        "JavaScript beyond basic syntax — the language mechanics (scope, closures, this, prototypes, async) that explain *why* JS behaves the way it does.",
        [
            ("01-variables-and-types", "Variables & Types", "let/const/var, primitive types, and how JS represents values."),
            ("02-type-coercion", "Type Coercion", "How and why JS converts types implicitly, == vs ===, and the bugs this causes."),
            ("03-operators", "Operators", "JS-specific operator behavior, short-circuiting, and nullish coalescing."),
            ("04-functions-in-depth", "Functions In Depth", "Function declarations vs expressions, arrow functions, default params, arguments."),
            ("05-scope-and-closures", "Scope & Closures", "Lexical scope, and closures as functions that remember their birth environment."),
            ("06-arrays", "Arrays", "Core methods, map/filter/reduce, and thinking in transformations instead of loops."),
            ("07-objects", "Objects", "Object literals, property access, mutation vs copying, and object methods."),
            ("08-destructuring-and-spread-rest", "Destructuring & Spread/Rest", "Unpacking values cleanly, and expanding/collecting values with ..."),
            ("09-higher-order-functions-and-callbacks", "Higher-Order Functions & Callbacks", "Functions that take/return functions, and why callbacks are everywhere in JS."),
            ("10-this-keyword", "The `this` Keyword", "How `this` is determined by call-site, and where it commonly trips people up."),
            ("11-prototypes-and-classes", "Prototypes & Classes", "JS's real inheritance model, and how `class` is sugar over prototypes."),
            ("12-modules", "Modules (ES Modules)", "import/export, module scope, and organizing a codebase across files."),
            ("13-promises-and-async-await", "Promises & Async/Await", "Representing future values, chaining, and writing async code that reads like sync code."),
            ("14-error-handling", "Error Handling", "try/catch, throwing custom errors, and error handling in async code."),
            ("15-event-loop-call-stack-tasks", "Event Loop, Call Stack & Tasks", "What actually happens under the hood when async code runs — microtasks vs macrotasks."),
            ("16-dom-and-events", "The DOM & Events", "Selecting and updating elements, event listeners, and event delegation."),
            ("17-fetch-and-http-requests", "Fetch & HTTP Requests", "Making network requests from the browser and handling responses/errors."),
            ("18-browser-storage", "Browser Storage", "localStorage/sessionStorage, and persisting data on the client."),
        ],
    ),
    (
        "04-python",
        "Python (Parallel Track)",
        "01-fundamentals",
        "A second language, covered as translation from JS concepts you already know — useful for scripting, data work, and backend alternatives (Flask/FastAPI).",
        [
            ("01-syntax-and-variables", "Syntax & Variables", "Indentation-based blocks, dynamic typing, and Python's core syntax vs JS."),
            ("02-lists-and-loops", "Lists & Loops", "Lists, for-in, range/enumerate, and list comprehensions."),
            ("03-dictionaries", "Dictionaries", "Python's key/value structure, .items(), and working with nested data."),
            ("04-functions-in-depth", "Functions In Depth", "Default args, *args/**kwargs, multiple return values, docstrings."),
            ("05-classes-and-oop", "Classes & OOP", "__init__, self, inheritance, and how Python's OOP compares to JS classes."),
            ("06-error-handling", "Error Handling", "try/except, raising exceptions, and Python's error-handling idioms."),
            ("07-modules-and-packages", "Modules & Packages (pip)", "Organizing Python projects and using pip/virtual environments."),
        ],
    ),
    (
        "05-web-fundamentals",
        "Web Fundamentals",
        "01-fundamentals, 03-javascript (basic)",
        "How the web actually works underneath frameworks: markup, styling, and the HTTP protocol that ties clients and servers together.",
        [
            ("01-how-the-web-works", "How The Web Works", "DNS, browsers, servers, and the full journey from typing a URL to seeing a page."),
            ("02-html-structure-and-semantics", "HTML: Structure & Semantics", "Elements, the document skeleton, semantic tags, forms, and tables."),
            ("03-css-fundamentals", "CSS Fundamentals", "Selectors, the box model, and core properties."),
            ("04-css-layout", "CSS Layout (Flexbox & Grid)", "One-dimensional vs two-dimensional layout, and responsive design with media queries."),
            ("05-http-in-depth", "HTTP In Depth", "Methods, status codes, headers, and the request/response cycle in detail."),
            ("06-browsers-and-rendering", "Browsers & Rendering", "How a browser turns HTML/CSS/JS into pixels: parsing, the render tree, repaints."),
        ],
    ),
    (
        "06-react",
        "React",
        "03-javascript, 05-web-fundamentals",
        "The mental model behind React — describing UI as a function of state — not just a list of hooks and APIs.",
        [
            ("01-mental-model", "The React Mental Model", "Why React exists, and the shift from imperative DOM updates to declarative rendering."),
            ("02-jsx", "JSX", "JSX as syntax sugar over function calls, and its rules (className, single root, expressions)."),
            ("03-components-and-props", "Components & Props", "Building reusable UI pieces and passing data down via props."),
            ("04-state-and-events", "State & Events (useState)", "Component memory, re-renders, and handling user interaction."),
            ("05-conditional-rendering", "Conditional Rendering", "Showing different UI based on state: ternaries, &&, early returns."),
            ("06-lists-and-keys", "Lists & Keys", "Rendering collections with .map(), and why `key` matters."),
            ("07-forms-and-controlled-components", "Forms & Controlled Components", "Tying input values to state, and handling form submission."),
            ("08-useeffect-and-side-effects", "useEffect & Side Effects", "Synchronizing with the outside world: fetching, subscriptions, and the dependency array."),
            ("09-useref", "useRef", "Persisting values across renders without re-rendering, and direct DOM access."),
            ("10-context", "Context (useContext)", "Avoiding prop drilling and sharing state across the component tree."),
            ("11-custom-hooks", "Custom Hooks", "Extracting and reusing stateful logic across components."),
            ("12-component-composition", "Component Composition", "children props, composition over configuration, and avoiding prop explosions."),
            ("13-state-management", "State Management At Scale", "Lifting state up, when Context isn't enough, and a look at external state libraries."),
            ("14-data-fetching-patterns", "Data Fetching Patterns", "Loading/error states, race conditions, and an intro to data-fetching libraries."),
            ("15-routing", "Routing (React Router)", "Multi-page apps without full reloads: routes, links, and dynamic params."),
            ("16-error-handling", "Error Handling In React", "Error boundaries and graceful failure in a component tree."),
            ("17-performance", "Performance", "Unnecessary re-renders, memoization (useMemo/useCallback/React.memo), and when it matters."),
            ("18-accessibility", "Accessibility", "Semantic HTML in JSX, keyboard navigation, and ARIA basics."),
            ("19-project-structure", "Project Structure", "Organizing a real React app: components/, pages/, hooks/, context/, api/."),
        ],
    ),
    (
        "07-backend",
        "Backend Development",
        "03-javascript, 05-web-fundamentals",
        "Building the server side of an application: APIs, data validation, authentication, and how frontend and backend actually communicate.",
        [
            ("01-servers-and-http", "Servers & HTTP", "What a server is, and handling requests/responses with Node + Express."),
            ("02-request-response-cycle", "The Request/Response Cycle", "Tracing a request from client to server and back, end to end."),
            ("03-rest-apis", "REST APIs", "REST conventions, resources, and designing predictable endpoints."),
            ("04-routing-controllers-services", "Routing, Controllers & Services", "Structuring a backend: separating routes, logic, and data access."),
            ("05-middleware", "Middleware", "Code that runs between request and response: logging, parsing, auth checks."),
            ("06-validation", "Input Validation", "Never trusting client input, and validating data before it touches your logic."),
            ("07-error-handling", "Error Handling", "Centralized error handling, meaningful status codes, and not leaking internals."),
            ("08-authentication", "Authentication", "Proving who a user is: email/password flows and OAuth (e.g. Google sign-in)."),
            ("09-authorization", "Authorization", "What an authenticated user is allowed to do; roles and permissions."),
            ("10-sessions-cookies-jwt", "Sessions, Cookies & JWT", "Different ways to track logged-in state, and their tradeoffs."),
            ("11-password-hashing", "Password Hashing", "Why passwords are never stored in plain text, and how bcrypt/hashing works."),
            ("12-file-uploads", "File Uploads", "Handling files sent from the client and where/how to store them."),
            ("13-logging", "Logging", "Recording what happened for debugging and monitoring, without over-logging."),
            ("14-security", "Security Fundamentals", "Common vulnerabilities (injection, XSS, CSRF) and baseline defenses."),
            ("15-environment-variables", "Environment Variables & Secrets", "Keeping credentials out of source code and out of git."),
            ("16-api-architecture", "API Architecture", "Versioning, pagination, filtering, searching, and designing APIs that scale."),
        ],
    ),
    (
        "08-databases",
        "Databases",
        "07-backend (helpful in parallel)",
        "Databases taught conceptually first — what they are and why you'd choose one kind over another — then concretely in SQL and MongoDB.",
        [
            ("01-what-is-a-database", "What Is A Database?", "Why applications need persistent storage, and what a database actually provides."),
            ("02-relational-vs-nosql", "Relational vs NoSQL", "Tables vs documents, and the real tradeoffs between the two models."),
            ("03-tables-and-documents", "Tables & Documents", "Rows/columns vs flexible documents, and how each represents data."),
            ("04-keys-and-relationships", "Keys & Relationships", "Primary keys, foreign keys, and modeling relationships between data."),
            ("05-indexes", "Indexes", "How databases find data fast, and the cost/benefit of indexing."),
            ("06-queries-and-crud", "Queries & CRUD", "Create, Read, Update, Delete — the four operations every app relies on."),
            ("07-transactions-and-constraints", "Transactions & Constraints", "Ensuring data integrity, atomicity, and enforcing rules at the database level."),
            ("08-normalization-and-data-modeling", "Normalization & Data Modeling", "Structuring data to avoid duplication and inconsistency — and when to break the rules."),
            ("09-performance", "Query Performance", "Why some queries are slow, the N+1 problem, and how to reason about it."),
            ("10-migrations-and-backups", "Migrations & Backups", "Evolving a schema safely over time, and not losing data."),
            ("11-sql-deep-dive", "SQL Deep Dive", "SELECT/JOIN/WHERE/GROUP BY and writing real, non-trivial queries."),
            ("12-mongodb-deep-dive", "MongoDB Deep Dive", "Schemas with Mongoose, embedding vs referencing, and MongoDB-specific querying."),
        ],
    ),
    (
        "09-data-structures-and-algorithms",
        "Data Structures & Algorithms",
        "03-javascript or 04-python",
        "DSA taught with a consistent format for every structure: what it is, how it works, when to use it, and a real use case — not just interview trivia.",
        [
            ("01-big-o-and-complexity", "Big O & Complexity", "Measuring how code scales, and reading time/space complexity."),
            ("02-arrays-and-strings", "Arrays & Strings", "The most common structure, common patterns (two-pointer, sliding window)."),
            ("03-linked-lists", "Linked Lists", "Nodes and pointers, singly/doubly linked lists, and when arrays fall short."),
            ("04-stacks-and-queues", "Stacks & Queues", "LIFO vs FIFO, and real use cases (undo history, task queues)."),
            ("05-hash-tables", "Hash Tables", "O(1) lookup, how hashing works, and collisions."),
            ("06-trees", "Trees", "Hierarchical data, binary trees, BSTs, and traversal strategies."),
            ("07-graphs", "Graphs", "Nodes and edges, directed/undirected, and representing real networks."),
            ("08-heaps", "Heaps", "Priority queues, and why heaps are the go-to for 'give me the smallest/largest'."),
            ("09-recursion", "Recursion", "Functions calling themselves, base cases, and thinking recursively."),
            ("10-searching", "Searching Algorithms", "Linear vs binary search, and the assumptions each relies on."),
            ("11-sorting", "Sorting Algorithms", "Comparing common sorts (bubble, merge, quick) and their tradeoffs."),
        ],
    ),
    (
        "10-software-engineering-practices",
        "Software Engineering Practices",
        "Some backend/React experience recommended",
        "The practices that separate 'code that works' from professional software engineering: structure, testing, review, and maintainability.",
        [
            ("01-clean-code", "Clean Code", "Naming, readability, and writing code for humans first, computers second."),
            ("02-separation-of-concerns-and-modularity", "Separation of Concerns & Modularity", "Why mixing responsibilities in one place causes pain later."),
            ("03-dry-kiss-solid", "DRY, KISS & SOLID", "Core design principles, and — importantly — when they can be overapplied."),
            ("04-design-patterns", "Design Patterns", "Common, named solutions to recurring problems, and when they're overkill."),
            ("05-architecture-and-layered-design", "Architecture & Layered Design", "Organizing a whole application, not just a single file."),
            ("06-testing-unit-integration-e2e", "Testing (Unit, Integration, E2E)", "What each test type checks, and building a practical testing habit."),
            ("07-debugging-and-logging", "Debugging & Logging (Advanced)", "Systematic debugging strategies beyond console.log."),
            ("08-code-reviews", "Code Reviews", "Giving and receiving feedback on code, and why review matters."),
            ("09-documentation", "Documentation", "Writing docs/comments that help, without over-documenting the obvious."),
            ("10-git-workflows-and-branching", "Git Workflows In Practice", "Applying git branching/PR workflows on a real, evolving project."),
            ("11-refactoring-and-technical-debt", "Refactoring & Technical Debt", "Improving code without changing behavior, and managing debt deliberately."),
            ("12-security-practices", "Security Practices", "Defensive habits that apply across any stack."),
            ("13-performance-and-maintainability", "Performance & Maintainability", "Balancing speed of development against long-term maintainability."),
        ],
    ),
    (
        "11-working-with-ai",
        "Working With AI Tools",
        "Enough fundamentals to read code critically",
        "Using AI as a learning and productivity tool without becoming dependent on it — and without shipping code you don't understand.",
        [
            ("01-using-ai-effectively", "Using AI Effectively", "Good prompting, and treating AI as a collaborator, not an oracle."),
            ("02-verifying-ai-generated-code", "Verifying AI-Generated Code", "Why AI output must be checked, not trusted by default."),
            ("03-debugging-ai-generated-code", "Debugging AI-Generated Code", "Approaching unfamiliar, AI-written code methodically."),
            ("04-recognizing-hallucinated-apis", "Recognizing Hallucinated APIs", "Spotting invented functions/libraries/parameters that don't actually exist."),
            ("05-human-decisions-vs-ai-assistance", "Human Decisions vs AI Assistance", "Which decisions (architecture, security, tradeoffs) should stay yours."),
        ],
    ),
]

PROJECTS = {
    "beginner": [
        ("01-personal-portfolio-site", "Personal Portfolio Site", "HTML, CSS, responsive layout"),
        ("02-todo-list-app", "To-Do List App", "JS DOM manipulation or React state, localStorage"),
        ("03-cli-number-guessing-game", "CLI Number Guessing Game", "Python or JS fundamentals, loops, conditionals"),
    ],
    "intermediate": [
        ("01-full-stack-notes-app", "Full-Stack Notes App", "React + Express + MongoDB, full CRUD"),
        ("02-authenticated-blog-platform", "Authenticated Blog Platform", "Auth (email/password + OAuth), authorization, protected routes"),
        ("03-weather-dashboard-with-external-api", "Weather Dashboard (External API)", "Fetching, error/loading states, environment variables for API keys"),
    ],
    "advanced": [
        ("01-multi-user-saas-app", "Multi-User SaaS-Style App", "Auth, roles/permissions, database relationships, deployment"),
        ("02-realtime-chat-app", "Realtime Chat App", "WebSockets, state synchronization, architecture decisions"),
        ("03-e-commerce-platform", "E-Commerce Platform", "Complex data modeling, payments concepts, testing, security, performance"),
    ],
}

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

def module_readme(folder, title, prereq, blurb, topics):
    lines = [f"# {title}", "", f"**Prerequisites:** {prereq}", "", blurb, "", "## Topics In This Module", ""]
    for tfolder, ttitle, one_liner in topics:
        lines.append(f"- [`{tfolder}/`](./{tfolder}) — **{ttitle}**: {one_liner}")
    lines.append("")
    lines.append("> Each topic folder contains a `README.md` lesson. Work through them in order — later topics assume earlier ones.")
    return "\n".join(lines)

def topic_stub(module_title, ttitle, one_liner, prereq_topic):
    return f"""# {ttitle}

**Module:** {module_title}
**Status:** Placeholder — full lesson content not yet written.

## What This Topic Covers

{one_liner}

## Planned Lesson Structure

- **What is it?** — Simple definition.
- **Why does it matter?** — The problem it solves.
- **How does it work?** — The mechanism, explained simply.
- **Simple Example** — A small, concrete example.
- **Let's Break It Down** — Step-by-step explanation of the example.
- **Common Mistakes** — What beginners typically get wrong here, and why.
- **When Should I Use It?** — Practical guidance.
- **Exercises** — Recall → Understanding → Application → Problem Solving.
- **What Should I Learn Next?** — Link to the next topic.

*(This stub will be replaced with full lesson content in a later pass.)*
"""

# Build fundamentals/etc modules
for folder, title, prereq, blurb, topics in MODULES:
    module_path = os.path.join(ROOT, folder)
    write(os.path.join(module_path, "README.md"), module_readme(folder, title, prereq, blurb, topics))
    for tfolder, ttitle, one_liner in topics:
        write(os.path.join(module_path, tfolder, "README.md"), topic_stub(title, ttitle, one_liner, None))

# Build projects
proj_root = os.path.join(ROOT, "12-projects")
proj_index = ["# Projects", "", "Projects are where the concepts from every module get applied together. Each project README specifies what you're building, what it teaches, and what you should figure out yourself — not a full solution.", ""]
for level in ["beginner", "intermediate", "advanced"]:
    proj_index.append(f"## {level.capitalize()}")
    proj_index.append("")
    for pfolder, ptitle, concepts in PROJECTS[level]:
        proj_index.append(f"- [`{level}/{pfolder}/`](./{level}/{pfolder}) — **{ptitle}** ({concepts})")
    proj_index.append("")
write(os.path.join(proj_root, "README.md"), "\n".join(proj_index))

for level in ["beginner", "intermediate", "advanced"]:
    for pfolder, ptitle, concepts in PROJECTS[level]:
        content = f"""# {ptitle}

**Level:** {level.capitalize()}
**Concepts practiced:** {concepts}
**Status:** Placeholder — full project brief not yet written.

## Planned Brief Structure

- **What you're building** — a short description of the finished product.
- **What concepts it teaches** — tied directly back to specific curriculum modules.
- **Requirements** — the non-negotiable core features.
- **Suggested features** — optional extensions for a stronger version.
- **What you should figure out yourself** — deliberately unspecified decisions.
- **Possible extensions** — ways to keep pushing the project further.
- **Skills demonstrated** — what this project proves you can do.

*(This stub will be replaced with a full project brief in a later pass.)*
"""
        write(os.path.join(proj_root, level, pfolder, "README.md"), content)

print("done")
