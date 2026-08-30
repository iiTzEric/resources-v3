# React

**Prerequisites:** 03-javascript, 05-web-fundamentals

The mental model behind React — describing UI as a function of state — not just a list of hooks and APIs.

## Topics In This Module

- [`01-mental-model/`](./01-mental-model) — **The React Mental Model**: Why React exists, and the shift from imperative DOM updates to declarative rendering.
- [`02-jsx/`](./02-jsx) — **JSX**: JSX as syntax sugar over function calls, and its rules (className, single root, expressions).
- [`03-components-and-props/`](./03-components-and-props) — **Components & Props**: Building reusable UI pieces and passing data down via props.
- [`04-state-and-events/`](./04-state-and-events) — **State & Events (useState)**: Component memory, re-renders, and handling user interaction.
- [`05-conditional-rendering/`](./05-conditional-rendering) — **Conditional Rendering**: Showing different UI based on state: ternaries, &&, early returns.
- [`06-lists-and-keys/`](./06-lists-and-keys) — **Lists & Keys**: Rendering collections with .map(), and why `key` matters.
- [`07-forms-and-controlled-components/`](./07-forms-and-controlled-components) — **Forms & Controlled Components**: Tying input values to state, and handling form submission.
- [`08-useeffect-and-side-effects/`](./08-useeffect-and-side-effects) — **useEffect & Side Effects**: Synchronizing with the outside world: fetching, subscriptions, and the dependency array.
- [`09-useref/`](./09-useref) — **useRef**: Persisting values across renders without re-rendering, and direct DOM access.
- [`10-context/`](./10-context) — **Context (useContext)**: Avoiding prop drilling and sharing state across the component tree.
- [`11-custom-hooks/`](./11-custom-hooks) — **Custom Hooks**: Extracting and reusing stateful logic across components.
- [`12-component-composition/`](./12-component-composition) — **Component Composition**: children props, composition over configuration, and avoiding prop explosions.
- [`13-state-management/`](./13-state-management) — **State Management At Scale**: Lifting state up, when Context isn't enough, and a look at external state libraries.
- [`14-data-fetching-patterns/`](./14-data-fetching-patterns) — **Data Fetching Patterns**: Loading/error states, race conditions, and an intro to data-fetching libraries.
- [`15-routing/`](./15-routing) — **Routing (React Router)**: Multi-page apps without full reloads: routes, links, and dynamic params.
- [`16-error-handling/`](./16-error-handling) — **Error Handling In React**: Error boundaries and graceful failure in a component tree.
- [`17-performance/`](./17-performance) — **Performance**: Unnecessary re-renders, memoization (useMemo/useCallback/React.memo), and when it matters.
- [`18-accessibility/`](./18-accessibility) — **Accessibility**: Semantic HTML in JSX, keyboard navigation, and ARIA basics.
- [`19-project-structure/`](./19-project-structure) — **Project Structure**: Organizing a real React app: components/, pages/, hooks/, context/, api/.

> Each topic folder contains a `README.md` lesson. Work through them in order — later topics assume earlier ones.