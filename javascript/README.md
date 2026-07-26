# JavaScript Fundamentals

JavaScript from the very beginning.
Every concept explained simply with real examples.

---

## 1. What is JavaScript?

JavaScript is the programming language of the web.
It runs in the browser and makes websites interactive.

```
HTML  → structure  (the skeleton)
CSS   → style      (the appearance)
JS    → behavior   (the actions)
```

With Node.js, JavaScript also runs on the server.
That is why you can use it for both frontend and backend.

---

## 2. Variables

Variables store data. Three ways to declare them:

```js
var name = 'John'    // old way — avoid
let age = 25         // can be reassigned
const email = 'john@example.com'  // cannot be reassigned
```

**Rules:**
- Always use `const` by default
- Use `let` only when you need to reassign
- Never use `var` — it has confusing scoping rules

```js
const name = 'John'
name = 'Jane'  // TypeError — cannot reassign const

let count = 0
count = 1      // fine — let can be reassigned
count++        // count is now 2
```

---

## 3. Data Types

**Primitive types — simple values:**

```js
// String — text
const name = 'John'
const greeting = "Hello"
const template = `Hi ${name}`  // template literal

// Number — integers and decimals
const age = 25
const price = 9.99
const negative = -10

// Boolean — true or false
const isLoggedIn = true
const isPro = false

// Null — intentionally empty
const phone = null

// Undefined — not yet assigned
let address
console.log(address)  // undefined

// Symbol — unique identifier (advanced)
const id = Symbol('id')
```

**Reference types — complex values:**

```js
// Object — key-value pairs
const user = { name: 'John', age: 25 }

// Array — ordered list
const skills = ['React', 'Node', 'Python']

// Function — reusable block of code
function greet() { return 'Hello' }
```

**Checking types:**
```js
typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' — famous JS bug
typeof []          // 'object'
typeof {}          // 'object'
typeof function(){} // 'function'

// Better way to check arrays
Array.isArray([])  // true
```

---

## 4. Operators

```js
// Arithmetic
5 + 3   // 8
5 - 3   // 2
5 * 3   // 15
5 / 3   // 1.666...
5 % 3   // 2 — remainder
5 ** 3  // 125 — exponent

// Assignment
let x = 10
x += 5   // x = x + 5 = 15
x -= 3   // x = x - 3 = 12
x *= 2   // x = x * 2 = 24
x /= 4   // x = x / 4 = 6

// Comparison — always use === not ==
5 === 5    // true — strict equality
5 === '5'  // false — different types
5 == '5'   // true — loose equality (avoid)
5 !== 3    // true — not equal
5 > 3      // true
5 < 3      // false
5 >= 5     // true
5 <= 4     // false

// Logical
true && true   // true — AND
true && false  // false
true || false  // true — OR
false || false // false
!true          // false — NOT
!false         // true

// Nullish coalescing — use default if null or undefined
const name = null ?? 'Guest'  // 'Guest'
const age = 0 ?? 18           // 0 — 0 is not null

// Optional chaining — safe property access
const user = null
user?.name    // undefined — no crash
user?.address?.city  // undefined — no crash
```

---

## 5. Strings

```js
const str = 'Hello World'

// Length
str.length           // 11

// Access characters
str[0]               // 'H'
str.at(-1)           // 'd' — last character

// Case
str.toUpperCase()    // 'HELLO WORLD'
str.toLowerCase()    // 'hello world'

// Search
str.includes('World')    // true
str.startsWith('Hello')  // true
str.endsWith('World')    // true
str.indexOf('o')         // 4 — first occurrence

// Extract
str.slice(0, 5)      // 'Hello'
str.slice(-5)        // 'World'

// Replace
str.replace('World', 'JS')      // 'Hello JS'
str.replaceAll('l', 'L')        // 'HeLLo WorLd'

// Split and join
'a,b,c'.split(',')              // ['a', 'b', 'c']
['a', 'b', 'c'].join('-')       // 'a-b-c'

// Trim whitespace
'  hello  '.trim()              // 'hello'

// Repeat
'ha'.repeat(3)                  // 'hahaha'

// Pad
'5'.padStart(3, '0')            // '005'

// Template literals — backticks
const name = 'John'
const age = 25
`Hello ${name}, you are ${age}` // 'Hello John, you are 25'
`${2 + 2} is four`              // '4 is four'
```

---

## 6. Arrays

```js
const fruits = ['apple', 'banana', 'cherry']

// Access
fruits[0]          // 'apple'
fruits.at(-1)      // 'cherry' — last element
fruits.length      // 3

// Add and remove
fruits.push('mango')     // add to end
fruits.pop()             // remove from end
fruits.unshift('grape')  // add to start
fruits.shift()           // remove from start

// Find
fruits.indexOf('banana')              // 1
fruits.includes('banana')             // true
fruits.find(f => f.startsWith('c'))   // 'cherry'
fruits.findIndex(f => f === 'banana') // 1

// Transform — these return NEW arrays
fruits.map(f => f.toUpperCase())
// ['APPLE', 'BANANA', 'CHERRY']

fruits.filter(f => f.length > 5)
// ['banana', 'cherry']

fruits.reduce((acc, f) => acc + f + ' ', '')
// 'apple banana cherry '

// Sort
['c', 'a', 'b'].sort()              // ['a', 'b', 'c']
[3, 1, 2].sort((a, b) => a - b)     // [1, 2, 3]

// Spread — copy or merge
const copy = [...fruits]
const merged = [...fruits, 'kiwi']

// Destructuring
const [first, second, ...rest] = fruits
// first = 'apple', second = 'banana', rest = ['cherry']
```

---

## 7. Objects

```js
const user = {
  name: 'John',
  age: 25,
  email: 'john@example.com',
  address: {
    city: 'Nairobi',
    country: 'Kenya'
  }
}

// Access
user.name              // 'John'
user['name']           // 'John'
user.address.city      // 'Nairobi'
user?.phone            // undefined — safe access

// Add and update
user.phone = '+254712345678'
user.age = 26

// Delete
delete user.phone

// Destructuring
const { name, age } = user
const { name: userName } = user  // rename
const { role = 'user' } = user   // default value

// Spread — copy or merge
const copy = { ...user }
const updated = { ...user, age: 27 }

// Methods
Object.keys(user)      // ['name', 'age', 'email', 'address']
Object.values(user)    // ['John', 25, ...]
Object.entries(user)   // [['name', 'John'], ...]

// Loop
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`)
}
```

---

## 8. Functions

```js
// Function declaration — hoisted
function greet(name) {
  return `Hello ${name}`
}

// Function expression — not hoisted
const greet2 = function(name) {
  return `Hello ${name}`
}

// Arrow function — shorter syntax
const greet3 = (name) => `Hello ${name}`
const greet4 = name => `Hello ${name}`  // one param, no parens needed

// Default parameters
function greet5(name = 'Guest') {
  return `Hello ${name}`
}
greet5()         // 'Hello Guest'
greet5('John')   // 'Hello John'

// Rest parameters — collect remaining args
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3, 4)  // 10

// Spread in function call
const nums = [1, 2, 3]
Math.max(...nums)  // 3

// Destructuring in parameters
function display({ name, age }) {
  return `${name} is ${age}`
}
display({ name: 'John', age: 25 })
```

---

## 9. Conditionals

```js
const age = 20

// if / else if / else
if (age >= 18) {
  console.log('Adult')
} else if (age >= 13) {
  console.log('Teenager')
} else {
  console.log('Child')
}

// Ternary — one line if/else
const label = age >= 18 ? 'Adult' : 'Minor'

// Short circuit — use default if falsy
const name = '' || 'Guest'     // 'Guest'
const user = null || {}        // {}

// Nullish coalescing — only null/undefined
const name2 = null ?? 'Guest'  // 'Guest'
const count = 0 ?? 10          // 0 — 0 is not null

// Switch
const day = 'Monday'
switch (day) {
  case 'Monday':
  case 'Tuesday':
    console.log('Weekday')
    break
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend')
    break
  default:
    console.log('Unknown')
}
```

---

## 10. Loops

```js
const fruits = ['apple', 'banana', 'cherry']

// for loop — when you need the index
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i])
}

// for...of — loop over values (use this most)
for (const fruit of fruits) {
  console.log(fruit)
}

// for...in — loop over object keys
const user = { name: 'John', age: 25 }
for (const key in user) {
  console.log(key, user[key])
}

// while — when you don't know iterations
let count = 0
while (count < 5) {
  console.log(count)
  count++
}

// forEach — array method
fruits.forEach((fruit, index) => {
  console.log(index, fruit)
})

// break and continue
for (const fruit of fruits) {
  if (fruit === 'banana') continue  // skip banana
  if (fruit === 'cherry') break     // stop at cherry
  console.log(fruit)
}
```

---

## 11. Scope

**Where a variable can be accessed.**

```js
// Global scope — accessible everywhere
const globalVar = 'I am global'

function example() {
  // Function scope — only inside this function
  const funcVar = 'I am local'
  console.log(globalVar)  // works
  console.log(funcVar)    // works
}

console.log(funcVar)  // ReferenceError — not accessible

// Block scope — only inside {}
if (true) {
  const blockVar = 'I am block scoped'
  let alsoBlock = 'me too'
  var notBlock = 'I leak out'  // var ignores blocks
}

console.log(blockVar)   // ReferenceError
console.log(notBlock)   // 'I leak out' — var leaks
```

**Closure — function remembers its outer scope:**
```js
function counter() {
  let count = 0  // remembered by inner function

  return function() {
    count++
    return count
  }
}

const increment = counter()
increment()  // 1
increment()  // 2
increment()  // 3
```

---

## 12. Error Handling

```js
// try/catch — handle errors gracefully
try {
  const result = riskyOperation()
  console.log(result)
} catch (err) {
  console.error('Something went wrong:', err.message)
} finally {
  console.log('Always runs')
}

// Throwing errors
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }
  return a / b
}

try {
  divide(10, 0)
} catch (err) {
  console.error(err.message)  // 'Cannot divide by zero'
}

// Error types
new Error('General error')
new TypeError('Wrong type')
new RangeError('Out of range')
new ReferenceError('Not defined')
```

---

## 13. Classes

```js
class Animal {
  constructor(name, species) {
    this.name = name
    this.species = species
  }

  speak() {
    return `${this.name} makes a sound`
  }

  toString() {
    return `${this.name} (${this.species})`
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Dog')  // call parent constructor
    this.breed = breed
  }

  speak() {
    return `${this.name} barks`  // override parent
  }
}

const dog = new Dog('Rex', 'Labrador')
dog.speak()              // 'Rex barks'
dog instanceof Dog       // true
dog instanceof Animal    // true
```

---

## 14. Modules

```js
// Export — named exports
export const PI = 3.14159
export function add(a, b) { return a + b }
export class User { ... }

// Export — default export (one per file)
export default function main() { ... }

// Import — named
import { PI, add } from './math.js'

// Import — default
import main from './main.js'

// Import — everything
import * as math from './math.js'
math.PI   // 3.14159
math.add(1, 2)  // 3

// Import — rename
import { add as sum } from './math.js'
```

---

## 15. Common Mistakes

```js
// 1. Using == instead of ===
0 == '0'    // true  — wrong
0 === '0'   // false — correct

// 2. Mutating arrays when you shouldn't
const arr = [1, 2, 3]
arr.push(4)       // mutates original
const new_arr = [...arr, 4]  // creates new — better

// 3. Forgetting to return in arrow functions
const double = n => { n * 2 }   // undefined — forgot return
const double2 = n => n * 2      // correct — implicit return
const double3 = n => { return n * 2 }  // correct — explicit

// 4. var in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// prints 3, 3, 3 — use let instead

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// prints 0, 1, 2 — correct

// 5. Not handling async errors
async function bad() {
  const data = await fetch('/api')  // crashes if fails
}

async function good() {
  try {
    const data = await fetch('/api')
  } catch (err) {
    console.error(err)
  }
}
```