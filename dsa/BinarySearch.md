Binary search works on sorted arrays and is O(log n) — much faster.

The idea: instead of checking every element, you check the middle element each time and eliminate half the array.
Think of it like finding a word in a dictionary:

You don't start from page 1 and go one by one
You open to the middle, see if your word is before or after
Then eliminate half and repeat

Example — find 7 in [1, 3, 5, 7, 9, 11, 13]:
left=0, right=6, mid=3 → nums[3]=7 → found! return 3

find 5:
left=0, right=6, mid=3 → nums[3]=7 → 5 < 7 → go left
left=0, right=2, mid=1 → nums[1]=3 → 5 > 3 → go right
left=2, right=2, mid=2 → nums[2]=5 → found! return 2