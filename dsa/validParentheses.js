// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
 

// Example 1:

// Input: s = "()"

// Output: true

// Example 2:

// Input: s = "()[]{}"

// Output: true

// Example 3:

// Input: s = "(]"

// Output: false

// Example 4:

// Input: s = "([])"

// Output: true

// Example 5:

// Input: s = "([)]"

// Output: false


function isValid(s) {
    const pairs = { ')': '(', ']': '[', '}': '{' } // each closing bracket tells you what opening bracket it should
    const stack = [] // starts empty and it will hold opening brackets

    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        if (char in pairs) {  // checks if the character is a key in pairs.
            const top = stack.pop() // removes and returns the last item pushed 
            if (top !== pairs[char]) {
                return false
            }
        } else {
            stack.push(char) // Save it on the stack for later
        }
    }
    return stack.length === 0 // After checking every character, if the stack is empty, every opening bracket found its closing partner.
}


def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack:
                return False
            top = stack.pop()
            if top != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0