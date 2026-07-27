# ============================================
#  PYTHON USEFUL PATTERNS
#
#  Real patterns you will use in every project.
#  Solving common problems that come up again
#  and again in interviews and real code.
# ============================================


# ── STRING PATTERNS ─────────────────────────

# Reverse a string
def reverse_string(s):
    return s[::-1]

reverse_string('hello')  # 'olleh'

# Check palindrome
def is_palindrome(s):
    clean = s.lower().replace(' ', '')
    return clean == clean[::-1]

is_palindrome('racecar')         # True
is_palindrome('A man a plan')    # True

# Count vowels
def count_vowels(s):
    return sum(1 for c in s.lower() if c in 'aeiou')

count_vowels('Hello World')  # 3

# Most frequent character
from collections import Counter

def most_frequent(s):
    return Counter(s).most_common(1)[0][0]

most_frequent('aabbbbcc')  # 'b'

# Check anagram
def is_anagram(s, t):
    return Counter(s.lower()) == Counter(t.lower())

is_anagram('listen', 'silent')  # True

# Slugify string
import re

def slugify(s):
    s = s.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_-]+', '-', s)
    return s

slugify('Hello World!')   # 'hello-world'
slugify('  Python 3.9 ') # 'python-39'

# Truncate string
def truncate(s, length, suffix='...'):
    if len(s) <= length:
        return s
    return s[:length - len(suffix)] + suffix

truncate('Hello World', 8)  # 'Hello...'

# Extract numbers from string
def extract_numbers(s):
    return list(map(int, re.findall(r'\d+', s)))

extract_numbers('I have 3 cats and 12 dogs')  # [3, 12]

# Validate email
def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

is_valid_email('john@example.com')  # True
is_valid_email('notanemail')        # False


# ── NUMBER PATTERNS ─────────────────────────

# Check prime
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

is_prime(17)  # True
is_prime(4)   # False

# Fibonacci
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

list(fibonacci(8))  # [0, 1, 1, 2, 3, 5, 8, 13]

# Factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

factorial(5)  # 120

# GCD and LCM
import math

math.gcd(12, 8)   # 4
math.lcm(12, 8)   # 24 (Python 3.9+)

# Custom LCM
def lcm(a, b):
    return abs(a * b) // math.gcd(a, b)

# Number to words (simple)
def num_to_words(n):
    words = {
        0: 'zero', 1: 'one', 2: 'two', 3: 'three',
        4: 'four', 5: 'five', 6: 'six', 7: 'seven',
        8: 'eight', 9: 'nine', 10: 'ten'
    }
    return words.get(n, str(n))

# Digital root
def digital_root(n):
    while n >= 10:
        n = sum(int(d) for d in str(n))
    return n

digital_root(493)  # 4+9+3=16 → 1+6=7


# ── LIST PATTERNS ────────────────────────────

# Flatten nested list (any depth)
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

flatten([1, [2, [3, [4]], 5]])  # [1, 2, 3, 4, 5]

# Chunk list
def chunk(lst, n):
    return [lst[i:i+n] for i in range(0, len(lst), n)]

chunk([1,2,3,4,5,6,7], 3)  # [[1,2,3],[4,5,6],[7]]

# Sliding window
def sliding_window(lst, k):
    return [lst[i:i+k] for i in range(len(lst) - k + 1)]

sliding_window([1,2,3,4,5], 3)
# [[1,2,3], [2,3,4], [3,4,5]]

# Rotate list
def rotate(lst, n):
    n = n % len(lst)
    return lst[n:] + lst[:n]

rotate([1,2,3,4,5], 2)  # [3,4,5,1,2]

# Remove duplicates preserving order
def unique(lst):
    seen = set()
    return [x for x in lst if not (x in seen or seen.add(x))]

unique([1,2,2,3,3,4])  # [1,2,3,4]

# Zip two lists into dict
keys = ['name', 'age', 'city']
values = ['John', 25, 'Nairobi']
dict(zip(keys, values))
# {'name': 'John', 'age': 25, 'city': 'Nairobi'}

# Group list into dict by key
from collections import defaultdict

def group_by(lst, key):
    groups = defaultdict(list)
    for item in lst:
        groups[item[key]].append(item)
    return dict(groups)

users = [
    {'name': 'John', 'city': 'Nairobi'},
    {'name': 'Jane', 'city': 'Lagos'},
    {'name': 'Ali',  'city': 'Nairobi'},
]
group_by(users, 'city')
# {'Nairobi': [{John}, {Ali}], 'Lagos': [{Jane}]}

# Partition list into two based on condition
def partition(lst, condition):
    yes = [x for x in lst if condition(x)]
    no  = [x for x in lst if not condition(x)]
    return yes, no

evens, odds = partition([1,2,3,4,5,6], lambda n: n % 2 == 0)
# evens=[2,4,6], odds=[1,3,5]

# Running total
def running_total(lst):
    total = 0
    result = []
    for n in lst:
        total += n
        result.append(total)
    return result

running_total([1,2,3,4,5])  # [1,3,6,10,15]

# Moving average
def moving_average(lst, k):
    return [sum(lst[i:i+k])/k for i in range(len(lst)-k+1)]

moving_average([1,2,3,4,5,6], 3)  # [2.0, 3.0, 4.0, 5.0]


# ── DICT PATTERNS ────────────────────────────

# Safe nested get
def deep_get(d, *keys, default=None):
    for key in keys:
        if isinstance(d, dict):
            d = d.get(key, default)
        else:
            return default
    return d

data = {'user': {'address': {'city': 'Nairobi'}}}
deep_get(data, 'user', 'address', 'city')  # 'Nairobi'
deep_get(data, 'user', 'phone')            # None

# Invert dict
def invert(d):
    return {v: k for k, v in d.items()}

invert({'a': 1, 'b': 2})  # {1: 'a', 2: 'b'}

# Merge dicts
def merge(*dicts):
    result = {}
    for d in dicts:
        result.update(d)
    return result

merge({'a': 1}, {'b': 2}, {'c': 3})
# {'a': 1, 'b': 2, 'c': 3}

# Remove keys with None values
def clean_dict(d):
    return {k: v for k, v in d.items() if v is not None}

clean_dict({'name': 'John', 'phone': None, 'age': 25})
# {'name': 'John', 'age': 25}

# Pick specific keys
def pick(d, keys):
    return {k: d[k] for k in keys if k in d}

pick({'name': 'John', 'age': 25, 'password': 'secret'}, ['name', 'age'])
# {'name': 'John', 'age': 25}

# Omit specific keys
def omit(d, keys):
    return {k: v for k, v in d.items() if k not in keys}

omit({'name': 'John', 'age': 25, 'password': 'secret'}, ['password'])
# {'name': 'John', 'age': 25}

# Frequency counter
def frequency(lst):
    return dict(Counter(lst))

frequency(['a','b','a','c','b','a'])
# {'a': 3, 'b': 2, 'c': 1}


# ── FUNCTIONAL PATTERNS ─────────────────────

# Memoize / cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_cached(n):
    if n < 2:
        return n
    return fibonacci_cached(n-1) + fibonacci_cached(n-2)

fibonacci_cached(50)  # instant — cached

# Manual memoize decorator
def memoize(fn):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    return wrapper

@memoize
def expensive(n):
    return n ** n

# Retry decorator
import time

def retry(times=3, delay=1):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return fn(*args, **kwargs)
                except Exception as e:
                    if attempt == times - 1:
                        raise
                    print(f'Attempt {attempt+1} failed: {e}')
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(times=3, delay=2)
def unstable_api_call():
    # might fail
    pass

# Timer decorator
def timer(fn):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = fn(*args, **kwargs)
        end = time.time()
        print(f'{fn.__name__} took {end-start:.4f}s')
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

# Pipeline — apply functions in sequence
from functools import reduce

def pipeline(*fns):
    return lambda x: reduce(lambda v, f: f(v), fns, x)

process = pipeline(
    str.strip,
    str.lower,
    lambda s: s.replace(' ', '-')
)
process('  Hello World  ')  # 'hello-world'

# Partial application
from functools import partial

def multiply(a, b):
    return a * b

double = partial(multiply, 2)
triple = partial(multiply, 3)

double(5)  # 10
triple(5)  # 15


# ── VALIDATION PATTERNS ─────────────────────

# Validate required fields
def validate_required(data, fields):
    missing = [f for f in fields if not data.get(f)]
    if missing:
        raise ValueError(f'Missing required fields: {missing}')

validate_required(
    {'name': 'John', 'email': ''},
    ['name', 'email', 'password']
)
# ValueError: Missing required fields: ['email', 'password']

# Type validation
def validate_types(data, schema):
    errors = {}
    for field, expected_type in schema.items():
        value = data.get(field)
        if value is not None and not isinstance(value, expected_type):
            errors[field] = f'Expected {expected_type.__name__}'
    return errors

schema = {'name': str, 'age': int, 'active': bool}
validate_types({'name': 'John', 'age': '25'}, schema)
# {'age': 'Expected int'}

# Range validation
def validate_range(value, min_val, max_val, field='value'):
    if not min_val <= value <= max_val:
        raise ValueError(f'{field} must be between {min_val} and {max_val}')

validate_range(150, 1, 100, 'score')
# ValueError: score must be between 1 and 100


# ── CACHING PATTERNS ────────────────────────

# Simple TTL cache
import time

class TTLCache:
    def __init__(self, ttl=300):
        self.cache = {}
        self.ttl = ttl

    def get(self, key):
        if key in self.cache:
            value, expires_at = self.cache[key]
            if time.time() < expires_at:
                return value
            del self.cache[key]
        return None

    def set(self, key, value):
        self.cache[key] = (value, time.time() + self.ttl)

    def delete(self, key):
        self.cache.pop(key, None)

cache = TTLCache(ttl=60)
cache.set('user:1', {'name': 'John'})
cache.get('user:1')   # {'name': 'John'}


# ── INTERVIEW PATTERNS ───────────────────────

# Two sum
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i

two_sum([2, 7, 11, 15], 9)  # [0, 1]

# Valid parentheses
def is_valid_parens(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    return len(stack) == 0

is_valid_parens('()[]{}'  )  # True
is_valid_parens('(]')        # False

# Maximum subarray (Kadane's algorithm)
def max_subarray(nums):
    max_sum = current_sum = nums[0]
    for n in nums[1:]:
        current_sum = max(n, current_sum + n)
        max_sum = max(max_sum, current_sum)
    return max_sum

max_subarray([-2,1,-3,4,-1,2,1,-5,4])  # 6

# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

binary_search([1,3,5,7,9,11], 7)  # 3

# Merge sorted arrays
def merge_sorted(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result

merge_sorted([1,3,5], [2,4,6])  # [1,2,3,4,5,6]

# First duplicate in array
def first_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return n
        seen.add(n)
    return None

first_duplicate([1,2,3,2,4,3])  # 2

# Count islands (matrix DFS)
def count_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != '1':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

grid = [
    ['1','1','0','0'],
    ['1','1','0','0'],
    ['0','0','1','0'],
    ['0','0','0','1']
]
count_islands(grid)  # 3