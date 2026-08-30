// looping through every element of an array
// this is always o(n) time complexity

// Problem 1: Find the maximum number in an array
// Input:
// [3, 1, 4, 1, 5, 9, 2, 6]
// Output: 9

function findMax(array) {
    let max = array[0]
    for ( let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i]
        }
    }
    return max
}

console.log(findMax([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(findMax([-5, -3, -1, -2]))

// python solution
// def current_max(array):
//     max = array[0]
//     for i in range(1, len(array)):
//         if array[i] > max:
//             max = array[i]
//     return max

// print(current_max([3, 1, 4, 1, 5, 9, 2, 6]))
// print(current_max([-5, -3, -1, -2]))


// problem 2: Find the second largest number in an array
// Input:
// [3, 1, 4, 1, 5, 9, 2, 6]
// Output: 6

function secondLargest(array) {
    let max = array[0]
    let secondMax = array[0]
    for ( let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            secondMax = max
            max = array[i]
        } else if (array[i] > secondMax && array[i] !== max) {
            secondMax = array[i]
        }
    }
    return secondMax
}

console.log(secondLargest([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(secondLargest([-5, -3, -1, -2]))

// python solution
// def second_largest(array):
//     current_max = array[0]
//     second_max = array[0]
//     for i in range(1, len(array)):
//         if array[i] > current_max:
//             second_max = current_max
//             current_max = array[i]
//         elif array[i] > second_max and array[i] != current_max:
//             second_max = array[i]
//     return second_max

// print(second_largest([3, 1, 4, 1, 5, 9, 2, 6]))
// print(second_largest([-5, -3, -1, -2]))




// Problem 3 — findMax variations:
// array: [3, 1, 4, 1, 5, 9, 2, 6]

// Find the minimum instead of maximum
// Find both max and min in one loop
// Find the index of the maximum value, not the value itself

function findMin(array) {
    let min = array[0]
    for ( let i = 1; i < array.length; i++) {
    if (array[i] < min) {
        min = array[i]
    }
    }   
    return min
}

console.log(findMin([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(findMin([-5, -3, -1, -2]))


// python solution
// def current_min(array):
//  min = array[0]
//  for i in range(1, len(array)):
//      if array[i] < min:
//          min = array[i]
//  return min

// print(current_min([3, 1, 4, 1, 5, 9, 2, 6]))
// print(current_min([-5, -3, -1, -2]))

function findMaxAndMin(array) {
    let max = array[0]
    let min = array[0]
    for ( let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i]
        } else if (array[i] < min) {
            min = array[i]
        }
    }
    return {max, min}
}

console.log(findMaxAndMin([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(findMaxAndMin([-5, -3, -1, -2]))

// python solution
// def current_max_and_min(array):
//     max = array[0]
//     min = array[0]
//     for i in range(1, len(array)):
//         if array[i] > max:
//             max = array[i]
//         elif array[i] < min:
//             min = array[i]
//     return max, min

// print(current_max_and_min([3, 1, 4, 1, 5, 9, 2, 6]))
// print(current_max_and_min([-5, -3, -1, -2]))

function findMaxIndex(array) {
    let maxIndex = 0
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[maxIndex]) {
            maxIndex = i
        }
    }
    return maxIndex
}

console.log(findMaxIndex([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(findMaxIndex([-5, -3, -1, -2]))

// python solution
// def current_max_index(array):
//     max_index = 0
//     for i in range(1, len(array)):
//         if array[i] > array[max_index]:
//             max_index = i
//     return max_index

// print(current_max_index([3, 1, 4, 1, 5, 9, 2, 6]))
// print(current_max_index([-5, -3, -1, -2]))




// Problem 4 — secondLargest variations:

// Find the third largest
// Find the largest and smallest in one function

function thirdLargest(array) {
    let max = array[0]
    let secondMax = array[0]
    let thirdMax = array[0]
    for ( let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            thirdMax = secondMax
            secondMax = max
            max = array[i]
        } else if (array[i] > secondMax && array[i] !== max) {
            thirdMax = secondMax
            secondMax = array[i]
        } else if (array[i] > thirdMax && array[i] !== secondMax && array[i] !== max) {
            thirdMax = array[i]
        }
    }
    return thirdMax
}

console.log(thirdLargest([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(thirdLargest([-5, -3, -1, -2]))

// python solution
// def third_largest(array):
//     current_max = array[0]
//     second_max = array[0]
//     third_max = array[0]
//     for i in range(1, len(array)):
//         if array[i] > current_max:
//             third_max = second_max
//             second_max = current_max
//             current_max = array[i]
//         elif array[i] > second_max and array[i] != current_max:
//             third_max = second_max
//             second_max = array[i]
//         elif array[i] > third_max and array[i] != second_max and array[i] != current_max:
//             third_max = array[i]
//     return third_max

// print(third_largest([3, 1, 4, 1, 5, 9, 2, 6]))
// print(third_largest([-5, -3, -1, -2]))

function largestAndSmallest(array) {
    let max = array[0]
    let min = array[0]
    for ( let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i]
        } else if (array[i] < min) {
            min = array[i]
        }
    }
    return {max, min}
}

console.log(largestAndSmallest([3, 1, 4, 1, 5, 9, 2, 6]))
console.log(largestAndSmallest([-5, -3, -1, -2]))

// python solution
// def largest_and_smallest(array):
//     max = array[0]
//     min = array[0]
//     for i in range(1, len(array)):
//         if array[i] > max:
//             max = array[i]
//         elif array[i] < min:
//             min = array[i]
//     return max, min

// print(largest_and_smallest([3, 1, 4, 1, 5, 9, 2, 6]))
// print(largest_and_smallest([-5, -3, -1, -2]))