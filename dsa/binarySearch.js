// Input:  nums = [-1,0,3,5,9,12], target = 9
// Output: 4

// Input:  nums = [-1,0,3,5,9,12], target = 2
// Output: -1  (not found)


function search(nums, target) {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (target === nums[mid]) {
            return mid
        }
        if (target < nums[mid]) {
            right = mid - 1
        }
        if (target > nums[mid]) {
            left = mid + 1
        }
    }
    return -1
}

console.log(search([-1,0,3,5,9,12], 9))   // 4
console.log(search([-1,0,3,5,9,12], 2))   // -1

// Python solution
def search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if target == nums[mid]:
            return mid
        if target < nums[mid]:
            right = mid - 1
        if target > nums[mid]:
            left = mid + 1
    return -1