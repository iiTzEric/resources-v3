## DOM and events (vanilla JS — foundational for understanding React)

**What:** The DOM is the browser's live representation of your HTML. JS can read and change it.

**Why:** This is how a page becomes interactive without a full reload.

**When:** Direct DOM manipulation is mostly a foundational skill — frameworks like React handle this for you in real projects. But understanding it is what makes a framework's behavior "click" instead of feeling like magic.

**How:**
```js
const button = document.getElementById('my-button');

button.addEventListener('click', (event) => {
  console.log('Clicked!', event.target);
});

// Creating and inserting elements
const li = document.createElement('li');
li.textContent = 'New task';
document.getElementById('task-list').appendChild(li);
```

**Common mistake:** Attaching a listener to an element that doesn't exist yet (e.g., your script runs before the HTML is parsed). Fix: put `<script>` at the end of `<body>`, or use `DOMContentLoaded`.

---