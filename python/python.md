# Python Fundamentals

Python from the very beginning.
Clean, simple and powerful — great first language
and essential for data, automation and backend.

---

## 1. What is Python?

Python is a general purpose programming language
known for its clean readable syntax.

```
Used for:
- Web backend (Django, Flask, FastAPI)
- Data science (pandas, numpy)
- Machine learning (TensorFlow, PyTorch)
- Automation and scripting
- APIs and microservices
```

Python uses indentation instead of curly braces
to define blocks of code — this forces clean code.

---

## 2. Variables

No need to declare type — Python figures it out.

```python
name = 'John'
age = 25
price = 9.99
is_active = True
nothing = None

# Multiple assignment
x = y = z = 0
a, b, c = 1, 2, 3

# Swap values
a, b = b, a

# Check type
type(name)      # <class 'str'>
type(age)       # <class 'int'>
type(price)     # <class 'float'>
type(is_active) # <class 'bool'>
type(nothing)   # <class 'NoneType'>
```

**Naming conventions:**
```python
# Variables and functions — snake_case
user_name = 'John'
total_price = 100

# Constants — UPPER_SNAKE_CASE
MAX_SIZE = 100
API_URL = 'https://api.example.com'

# Classes — PascalCase
class UserProfile:
    pass
```

---

## 3. Data Types

```python
# String
name = 'John'
name = "John"          # single or double quotes
name = '''John'''      # triple quotes for multiline

# Integer
age = 25
big = 1_000_000        # underscores for readability

# Float
price = 9.99
pi = 3.14159

# Boolean
is_active = True       # capital T and F
is_done = False

# None — equivalent to null
result = None

# Check if None
if result is None:     # use 'is' not ==
    print('No result')
```

---

## 4. Strings

```python
s = 'Hello World'

# Length
len(s)               # 11

# Access characters
s[0]                 # 'H'
s[-1]                # 'd' — last character

# Slicing [start:stop:step]
s[0:5]               # 'Hello'
s[6:]                # 'World'
s[:5]                # 'Hello'
s[::-1]              # 'dlroW olleH' — reversed

# Case
s.upper()            # 'HELLO WORLD'
s.lower()            # 'hello world'
s.title()            # 'Hello World'
s.capitalize()       # 'Hello world'

# Search
s.find('World')      # 6 — index, -1 if not found
s.index('World')     # 6 — index, ValueError if not found
'World' in s         # True
s.startswith('Hello') # True
s.endswith('World')   # True
s.count('l')         # 3

# Replace
s.replace('World', 'Python')  # 'Hello Python'

# Split and join
'a,b,c'.split(',')   # ['a', 'b', 'c']
','.join(['a','b','c'])  # 'a,b,c'

# Strip whitespace
'  hello  '.strip()  # 'hello'
'  hello  '.lstrip() # 'hello  '
'  hello  '.rstrip() # '  hello'

# Check content
'123'.isdigit()      # True
'abc'.isalpha()      # True
'abc123'.isalnum()   # True
'  '.isspace()       # True

# f-strings — most common way to format
name = 'John'
age = 25
f'Hello {name}, you are {age}'    # 'Hello John, you are 25'
f'{2 + 2} is four'                # '4 is four'
f'{price:.2f}'                    # '9.99' — 2 decimal places
f'{1000000:,}'                    # '1,000,000' — with commas
f'{0.75:.0%}'                     # '75%' — percentage
```

---

## 5. Numbers

```python
# Integer operations
10 + 3    # 13
10 - 3    # 7
10 * 3    # 30
10 / 3    # 3.3333... — always float
10 // 3   # 3 — floor division
10 % 3    # 1 — remainder
10 ** 3   # 1000 — exponent

# Useful functions
abs(-5)          # 5
round(3.14159, 2) # 3.14
max(1, 2, 3)     # 3
min(1, 2, 3)     # 1
sum([1, 2, 3])   # 6
pow(2, 10)       # 1024

# Math module
import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.ceil(4.1)   # 5
math.floor(4.9)  # 4
math.log(100, 10) # 2.0

# Type conversion
int('42')        # 42
int(3.9)         # 3 — truncates, not rounds
float('3.14')    # 3.14
str(42)          # '42'
bool(0)          # False
bool(1)          # True
bool('')         # False
bool('hello')    # True
```

---

## 6. Lists

```python
fruits = ['apple', 'banana', 'cherry']

# Access
fruits[0]        # 'apple'
fruits[-1]       # 'cherry'
fruits[1:3]      # ['banana', 'cherry']

# Add
fruits.append('mango')           # add to end
fruits.insert(1, 'kiwi')         # insert at index
fruits.extend(['grape', 'plum']) # add multiple

# Remove
fruits.remove('banana')  # remove by value
fruits.pop()             # remove last, returns it
fruits.pop(0)            # remove by index
del fruits[0]            # delete by index

# Find
fruits.index('cherry')   # 2
fruits.count('apple')    # 1
'apple' in fruits        # True

# Sort
fruits.sort()                    # in place, ascending
fruits.sort(reverse=True)        # in place, descending
sorted_fruits = sorted(fruits)   # returns new list

# Other
len(fruits)       # length
fruits.reverse()  # reverse in place
fruits.copy()     # shallow copy
fruits.clear()    # remove all items

# List comprehension
squares = [n**2 for n in range(1, 6)]
# [1, 4, 9, 16, 25]

evens = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]
```

---

## 7. Tuples

```python
# Immutable list — cannot be changed after creation
point = (3, 4)
rgb = (255, 128, 0)
single = (1,)          # need comma for single item

# Access — same as list
point[0]               # 3
point[-1]              # 4

# Unpack
x, y = point
r, g, b = rgb

# Methods
point.count(3)         # 1
point.index(4)         # 1

# When to use tuple vs list
# tuple — fixed data, coordinates, RGB, DB records
# list  — data that changes, collections of items

# Tuples are faster and use less memory than lists
# Tuples can be used as dict keys, lists cannot
```

---

## 8. Dictionaries

```python
user = {
    'name': 'John',
    'age': 25,
    'email': 'john@example.com'
}

# Access
user['name']              # 'John' — KeyError if missing
user.get('name')          # 'John' — None if missing
user.get('phone', 'N/A')  # 'N/A' — default if missing

# Add and update
user['phone'] = '+254712345678'
user.update({'age': 26, 'city': 'Nairobi'})

# Remove
user.pop('phone')         # remove and return
del user['age']           # just remove

# Loop
for key in user:
    print(key)

for value in user.values():
    print(value)

for key, value in user.items():
    print(f'{key}: {value}')

# Check existence
'name' in user            # True
'phone' in user           # False

# Methods
user.keys()               # dict_keys([...])
user.values()             # dict_values([...])
user.items()              # dict_items([...])

# Dict comprehension
squares = {n: n**2 for n in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

---

## 9. Sets

```python
# Unordered collection of unique values
fruits = {'apple', 'banana', 'cherry', 'apple'}
# {'apple', 'banana', 'cherry'} — duplicates removed

# Add and remove
fruits.add('mango')
fruits.remove('banana')  # KeyError if not found
fruits.discard('banana') # no error if not found

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # union — {1, 2, 3, 4, 5, 6}
a & b   # intersection — {3, 4}
a - b   # difference — {1, 2}
a ^ b   # symmetric difference — {1, 2, 5, 6}

# Check membership — O(1) — faster than list
'apple' in fruits   # True

# Remove duplicates from list
unique = list(set([1, 2, 2, 3, 3, 4]))
# [1, 2, 3, 4]
```

---

## 10. Conditionals

```python
age = 20

# if / elif / else
if age >= 18:
    print('Adult')
elif age >= 13:
    print('Teenager')
else:
    print('Child')

# Ternary — one line
label = 'Adult' if age >= 18 else 'Minor'

# Truthiness
# Falsy: False, None, 0, '', [], {}, set()
# Truthy: everything else

name = ''
if not name:
    name = 'Guest'

# Shorthand
name = name or 'Guest'    # 'Guest' if name is falsy

# Check multiple conditions
if 18 <= age <= 65:        # chained comparison
    print('Working age')

if age == 25 or age == 30:
    print('Special age')

# in operator
role = 'admin'
if role in ['admin', 'moderator', 'superuser']:
    print('Has access')
```

---

## 11. Loops

```python
fruits = ['apple', 'banana', 'cherry']

# for loop — most common
for fruit in fruits:
    print(fruit)

# for with index — use enumerate
for i, fruit in enumerate(fruits):
    print(f'{i}: {fruit}')

# for with range
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

for i in range(5, 0, -1):   # 5, 4, 3, 2, 1
    print(i)

# while loop
count = 0
while count < 5:
    print(count)
    count += 1

# break and continue
for fruit in fruits:
    if fruit == 'banana':
        continue    # skip banana
    if fruit == 'cherry':
        break       # stop at cherry
    print(fruit)

# Loop over dict
user = {'name': 'John', 'age': 25}
for key, value in user.items():
    print(f'{key}: {value}')

# Loop over two lists together
names = ['Alice', 'Bob', 'Charlie']
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f'{name}: {score}')

# List comprehension — replaces simple loops
squares = [n**2 for n in range(1, 6)]
evens = [n for n in range(10) if n % 2 == 0]
```

---

## 12. Functions

```python
# Basic function
def greet(name):
    return f'Hello {name}'

greet('John')  # 'Hello John'

# Default parameters
def greet2(name='Guest'):
    return f'Hello {name}'

greet2()        # 'Hello Guest'
greet2('John')  # 'Hello John'

# Multiple return values
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5, 9])

# *args — variable positional arguments
def sum_all(*nums):
    return sum(nums)

sum_all(1, 2, 3, 4)  # 10

# **kwargs — variable keyword arguments
def display(**info):
    for key, value in info.items():
        print(f'{key}: {value}')

display(name='John', age=25, city='Nairobi')

# Lambda — anonymous function
double = lambda n: n * 2
double(5)  # 10

# Used with map, filter, sorted
nums = [3, 1, 4, 1, 5]
sorted(nums, key=lambda n: -n)  # [5, 4, 3, 1, 1]

# Docstring — document your function
def add(a, b):
    """
    Add two numbers and return the result.
    
    Args:
        a: first number
        b: second number
    
    Returns:
        sum of a and b
    """
    return a + b
```

---

## 13. Error Handling

```python
# try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print('Cannot divide by zero')

# Multiple exceptions
try:
    value = int('hello')
except ValueError:
    print('Invalid value')
except TypeError:
    print('Wrong type')

# Catch all
try:
    risky_operation()
except Exception as e:
    print(f'Error: {e}')

# Finally — always runs
try:
    file = open('data.txt')
    data = file.read()
except FileNotFoundError:
    print('File not found')
finally:
    file.close()  # always close the file

# Raise your own errors
def divide(a, b):
    if b == 0:
        raise ValueError('Cannot divide by zero')
    return a / b

# Common exceptions
# ValueError      — wrong value
# TypeError       — wrong type
# KeyError        — dict key not found
# IndexError      — list index out of range
# FileNotFoundError — file doesn't exist
# ZeroDivisionError — divide by zero
# AttributeError  — object has no attribute
# ImportError     — module not found
```

---

## 14. File Handling

```python
# Read file
with open('data.txt', 'r') as f:
    content = f.read()       # read all
    lines = f.readlines()    # read as list of lines

# Write file
with open('data.txt', 'w') as f:  # 'w' overwrites
    f.write('Hello World\n')

# Append to file
with open('data.txt', 'a') as f:  # 'a' appends
    f.write('New line\n')

# Read JSON
import json

with open('data.json', 'r') as f:
    data = json.load(f)      # parse JSON file

# Write JSON
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# JSON string
json_str = json.dumps(data)          # dict to string
data = json.loads(json_str)          # string to dict

# Always use 'with' — automatically closes file
# Modes: 'r' read, 'w' write, 'a' append, 'rb' read binary
```

---

## 15. Modules and Imports

```python
# Import entire module
import math
math.sqrt(16)    # 4.0

# Import specific items
from math import sqrt, pi
sqrt(16)         # 4.0

# Import with alias
import numpy as np
from datetime import datetime as dt

# Common standard library modules
import os           # file system operations
import sys          # system operations
import json         # JSON parsing
import re           # regular expressions
import math         # math operations
import random       # random numbers
import datetime     # dates and times
import collections  # Counter, defaultdict, deque
import itertools    # iteration tools
import functools    # higher order functions

# Random examples
import random
random.random()          # 0.0 to 1.0
random.randint(1, 6)     # random dice roll
random.choice(['a','b']) # random item from list
random.shuffle(lst)      # shuffle in place

# OS examples
import os
os.getcwd()              # current directory
os.listdir('.')          # list files
os.path.exists('file')   # check if exists
os.path.join('dir','file') # join paths safely
```

---

## 16. Common Mistakes

```python
# 1. Mutable default argument
def bad(lst=[]):       # same list reused every call
    lst.append(1)
    return lst

def good(lst=None):    # correct way
    if lst is None:
        lst = []
    lst.append(1)
    return lst

# 2. Using == to compare None
if result == None:     # wrong
if result is None:     # correct — use 'is'

# 3. Forgetting that strings are immutable
s = 'hello'
s[0] = 'H'            # TypeError — cannot modify
s = 'H' + s[1:]       # correct — create new string

# 4. Modifying list while looping
nums = [1, 2, 3, 4, 5]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)   # skips elements — bug

# Correct way
nums = [n for n in nums if n % 2 != 0]

# 5. Integer division confusion
10 / 3    # 3.3333 — always float in Python 3
10 // 3   # 3 — floor division

# 6. Copying lists shallowly
original = [[1, 2], [3, 4]]
copy = original.copy()   # shallow — nested lists shared
copy[0][0] = 99
original[0][0]           # 99 — original changed!

import copy
deep = copy.deepcopy(original)  # correct for nested
```