# Component Composition

**Module:** React
**Prerequisites:** [`11-custom-hooks`](../11-custom-hooks)

## What is it?

**Composition** means building complex UI by combining smaller, focused components together —
often by nesting components inside other components via the special `children` prop, rather than
building one large, configurable component with many specific props.

## Why does it matter?

As components grow more complex, cramming every possible variation into props (`showHeader`,
`showFooter`, `headerColor`, `footerText`...) becomes unwieldy fast. Composition — arranging
components inside each other, like nesting HTML elements — is generally a more flexible, scalable
approach, and it's a core idiom in idiomatic React code.

## How does it work?

### The `children` prop — content passed between a component's tags

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h3>Title</h3>
      <p>Some content</p>
    </Card>
  );
}
```

Anything placed between `<Card>` and `</Card>` becomes available inside `Card` as `props.children`
— a special, automatically-provided prop. `Card` doesn't need to know or care what's actually
inside it; it just provides the wrapping structure (styling, layout) around whatever content is
passed in.

### Composition over configuration — a concrete comparison

**Configuration-heavy approach** (many specific props):
```jsx
<Card title="Hello" showButton={true} buttonText="Click me" onButtonClick={handleClick} />
```

**Composition approach** (nesting):
```jsx
<Card>
  <h3>Hello</h3>
  <button onClick={handleClick}>Click me</button>
</Card>
```

The composition version is more flexible — `Card` doesn't need a new prop every time a new use case
appears (a different title format, no button at all, two buttons); it just receives whatever
content is actually needed for a given case.

### Multiple "slots" via named props

```jsx
function PageLayout({ header, sidebar, content }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  );
}

function App() {
  return (
    <PageLayout
      header={<Navbar />}
      sidebar={<Filters />}
      content={<ProductList />}
    />
  );
}
```

Here, JSX elements themselves are passed as prop values (not just `children`) — useful when a
component needs more than one distinct "slot" for different pieces of content.

### Composing custom components together, building up complexity

```jsx
function App() {
  return (
    <Page>
      <Header />
      <Sidebar>
        <FilterList />
      </Sidebar>
      <MainContent>
        <ProductGrid />
      </MainContent>
    </Page>
  );
}
```

Real React applications are typically built this way — many small, focused components, nested and
combined, rather than one enormous top-level component handling everything directly.

## Simple Example

```jsx
function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Confirm Action</h2>
          <p>Are you sure?</p>
        </Modal>
      )}
    </div>
  );
}
```

## Let's Break It Down

- `Modal` handles the generic structure — overlay, container, close button — without knowing or
  caring what content it wraps.
- `App` supplies whatever specific content it needs (a confirmation message, in this case) as
  `children`, and this same `Modal` could wrap completely different content elsewhere in the app
  with zero changes to `Modal` itself.
- This combination — a reusable structural component plus flexible `children` — is genuinely one
  of the most common, useful React patterns.

## Common Mistakes

- **Overloading a component with many boolean/configuration props** to handle every possible
  variation, instead of using composition to let the calling code supply exactly what's needed.
- **Forgetting `children` is just a regular prop**, accessible and destructurable exactly like any
  other prop.
- **Over-composing trivial cases**, breaking things into components so small and numerous that the
  actual structure becomes harder to follow rather than easier — balance matters, same as with
  extracting functions in JavaScript.

## When Should I Use It?

Reach for composition (nesting components, using `children`) whenever a component would otherwise
need many specific configuration props to handle different content variations. Keep components
focused on one clear structural or behavioral responsibility, and let composition combine them
into more complex UI.

## Exercises

1. **(Recall)** What is `props.children`, and where does its value come from?
2. **(Application)** Write a `Panel` component that renders a styled container around whatever
   `children` it receives, and use it to wrap two different pieces of content in an `App`
   component.
3. **(Problem Solving)** A `Card` component has grown to accept 8 different boolean props to handle
   various display variations. Describe how you'd refactor it toward a composition-based approach.

## What Should I Learn Next?

Continue to [`13-state-management`](../13-state-management) — patterns for organizing state as an
application grows beyond what Context alone comfortably handles.
