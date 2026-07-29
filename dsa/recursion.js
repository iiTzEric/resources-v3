function countdown(n) {
    if (n === 0) return
    console.log(n)
    countdown(n - 1)
}

countdown(5)



function sum(n) {
    if (n === 0) return 0
    if (n > 0) {
        return n + sum(n - 1)
    }
}

console.log(sum(5))
console.log(sum(3))  

// each function call adds its own n and passes the rest down to the next call. When it hits 0 it stops and everything adds back up.

// def sum(n):
//     if n == 0:
//         return 0
//     if n > 0:
//         return n + sum(n -1)


function factorial(n) {
    if (n === 0) return 1
    if (n > 0) {
        return n * factorial(n - 1)
    }
}
console.log(factorial(5))
console.log(factorial(3))
console.log(factorial(0))  

// def factorial(n):
//     if n == 0:
//         return 1
//     if n > 0:
//         return n * factorial(n - 1)