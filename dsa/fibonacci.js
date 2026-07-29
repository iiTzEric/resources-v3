function fib(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    if (n > 0) {
        return fib(n - 1) + fib(n - 2)
    }
}

console.log(fib(4))   // expect 3
console.log(fib(10))  // expect 55
console.log(fib(0))   // expect 0
console.log(fib(1))   // expect 1

def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    if n > 0:
        return fib(n - 1) + fib(n - 2)

class Solution:
    def fib(self, n):
        if n <= 1:
            return n
        a, b = 0, 1
        for i in range(2, n + 1):
            a, b = b, a + b
        return b