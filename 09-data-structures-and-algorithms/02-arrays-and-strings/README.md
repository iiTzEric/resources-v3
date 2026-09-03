# Arrays & Strings

**Module:** Data Structures & Algorithms
**Prerequisites:** [`01-big-o-and-complexity`](../01-big-o-and-complexity)

## What is it?

You already know arrays as a data structure — this topic examines them with precise complexity
analysis for their common operations, and covers two genuinely useful patterns for solving
array/string problems efficiently: the **two-pointer** technique and the **sliding window**
technique.

## What is it, how it works, complexity

Arrays store elements contiguously, accessible by index. This contiguous storage is precisely why
`array[i]` is **O(1)** — the computer can calculate exactly where element `i` lives directly from
the array's starting memory location, with no searching required.

**Common operations and their complexity:**
- **Access by index** (`array[i]`) — O(1).
- **Search for a value** (`array.includes(x)`) — O(n), since it may need to check every element.
- **Push to the end** (`array.push(x)`) — O(1) typically (usually enough pre-allocated space).
- **Insert/remove at the beginning or middle** (`array.unshift(x)`, `array.splice(...)`) — O(n),
  since every subsequent element must shift position.

Strings, in most languages including JavaScript, behave similarly to arrays of characters for
complexity purposes — accessing `str[i]` is O(1); searching for a substring is generally O(n) (or
more, depending on the algorithm).

### Common use case

Arrays are the default choice for ordered collections accessed primarily by position or iterated
over in full — lists of items, sequences of steps, anything where order matters and lookups by
position (or a full scan) are the primary access pattern.

## Two useful patterns for array/string problems

### The two-pointer technique

```javascript
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

Two pointers move toward each other (or in the same direction, in other variants), checking
elements as they go — this solves the palindrome check in **O(n)** time and **O(1)** extra space
(no new data structure needed beyond the two pointer variables), rather than a less efficient
approach like reversing the whole string and comparing (which would use O(n) additional space for
the reversed copy).

### The sliding window technique

```javascript
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // slide the window: add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
```

This finds the maximum sum of any `k` consecutive elements in **O(n)** time, by maintaining a
running "window" sum and sliding it one position at a time — adding the newly included element and
subtracting the one that just left the window — rather than recalculating the entire sum from
scratch for every possible window position, which would be O(n·k), a meaningfully slower approach
for large inputs.

## Simple Example

```javascript
function hasPairWithSum(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left < right) {
    const sum = sortedArr[left] + sortedArr[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}
```

## Let's Break It Down

- Given a **sorted** array, this uses two pointers starting at opposite ends — if the sum is too
  small, moving `left` rightward increases it; if too large, moving `right` leftward decreases it.
- This achieves O(n) time — each pointer moves at most `n` times total, combined — dramatically more
  efficient than checking every pair (which would be O(n²), the naive nested-loop approach from the
  Big O topic's own example).
- This specific technique relies on the array being sorted — the two-pointer approach wouldn't work
  correctly this way on unsorted data.

## Common Mistakes

- **Using a nested loop (O(n²)) for a problem a two-pointer or sliding-window approach could solve
  in O(n)** — recognizing when these patterns apply is a genuinely valuable, practiced skill.
- **Applying the two-pointer technique to unsorted data** when the specific approach (like the pair-
  sum example) actually depends on sortedness to work correctly.
- **Recalculating a sliding window's sum from scratch on every step**, missing the O(n)-to-O(n·k)
  efficiency loss this causes.

## When Should I Use It?

Reach for two-pointer techniques on sorted array/string problems involving pairs or comparisons
from both ends. Reach for sliding window techniques on problems involving contiguous subarrays/
substrings of a fixed or variable size.

## Exercises

1. **(Recall)** Why is accessing an array by index O(1), while inserting at the beginning is O(n)?
2. **(Application)** Write a two-pointer solution to reverse an array in place (without creating a
   new array).
3. **(Problem Solving)** Given the task "find if any two numbers in an unsorted array sum to a
   target," explain why the two-pointer technique from this lesson's example doesn't directly apply
   without first sorting, and what that sorting step would cost in time complexity.

## What Should I Learn Next?

Continue to [`03-linked-lists`](../03-linked-lists) — a different way of organizing sequential
data, with different tradeoffs than arrays.
