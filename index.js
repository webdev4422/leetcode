// Hashmap
// 1. Two Sum
// Array, Hash Table
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let result = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        result.push(i, j)
        return result
      }
    }
  }
}
// console.log(twoSum([3, 2, 3], 6)) // Expected [0,2]

/*****************************************************************************/
/********************* TOP INTERVIEW 150  ************************************/
/*****************************************************************************/

/******************** Array / String *****************************************/
/*****************************************************************************/

// 88. Merge Sorted Array, Easy
// Array, Two Pointers, Sorting
/*****************************************************************************/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
;(nums1 = [1, 2, 3, 0, 0, 0]), (m = 3), (nums2 = [2, 5, 6]), (n = 3) // Expected [1,2,2,3,5,6]
// ;(nums1 = [-1, 0, 0, 3, 3, 3, 0, 0, 0]), (m = 6), (nums2 = [1, 2, 2]), (n = 3) // Expected [-1,0,0,1,2,2,3,3,3]
/*nums1 =[-10,-10,-9,-9,-9,-8,-8,-7,-7,-7,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-4,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,1,2,2,2,3,3,3,4,5,5,6,6,6,6,7,7,7,7,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
nums2 = [-10,-10,-9,-9,-9,-9,-8,-8,-8,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,9,9,9,9]
m = 55; n = 99 // Expected [-10,-10,-10,-10,-9,-9,-9,-9,-9,-9,-9,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,9,9,9]*/
var merge = function (nums1, m, nums2, n) {
  nums1.length = m // Cut arr to 'm' length
  for (let i = 0; i < n; i++) {
    nums1.push(nums2[i]) // Add nums2 to nums1 array
  }
  nums1.sort((a, b) => a - b) // Sort
}
// merge(nums1, m, nums2, n); console.log(nums1)

// 27. Remove Element, Easy
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// ;(nums = [3, 2, 2, 3]), (val = 3) // Output: 2, nums = [2,2,_,_]
// ;(nums = [0, 1, 2, 2, 3, 0, 4, 2]), (val = 2) //Output: 5, nums = [0,1,4,0,3,_,_,_]
// ;(nums = [3, 3]), (val = 3) // Output [3]
var removeElement = function (nums, val) {
  let length = nums.length
  for (let i = 0; i < length; i++) {
    // Only splice array when item is found
    if (nums.indexOf(val) > -1) {
      nums.splice(nums.indexOf(val), 1)
    }
  }
  return nums.length
}
// const k = removeElement(nums, val) // Calls your implementation

// 26. Remove Duplicates from Sorted Array, Easy
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// nums = [1, 1, 2] // Output: 2, nums = [1,2,_]
// nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] // Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
var removeDuplicates = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    // If current element equals next element
    if (nums[i] == nums[i + 1]) {
      nums.splice(i, 1) // Remove current element
      i-- // Reset i, to be current element again, otherwise it will jump to next element
    }
  }
  return nums.length
}
// let k = removeDuplicates(nums)

// 80. Remove Duplicates from Sorted Array II, Medium
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// nums = [1, 1, 1, 2, 2, 3] // Output: 5, nums = [1,1,2,2,3,_]
// nums = [0, 0, 1, 1, 1, 1, 2, 3, 3] // Output: 7, nums = [0,0,1,1,2,3,3,_,_]
var removeDuplicates2 = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    // If current element equals next element and element before current
    if (nums[i] == nums[i + 1] && nums[i - 1] == nums[i]) {
      nums.splice(i, 1) // Remove current element
      i-- // Reset i, to be current element again, otherwise it will jump to next element
    }
  }
}
// let k = removeDuplicates2(nums)

// 169. Majority Element, Easy
// Array, Hash Table, Divide and Conquer, Sorting, Counting
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// Brute force approach.
// Time complexity: O(n²). Two nested "for" loops each run "n" iterations.
// Space complexity: O(1). Does not allocate additional space proportional to input size.
// nums = [3, 2, 3] // Output: 3
// nums = [2, 2, 1, 1, 1, 2, 2] //Output: 2
var majorityElement = function (nums) {
  // prettier-ignore
  let el, count = 0
  for (let j = 0; j < nums.length; j++) {
    el = nums[j]
    for (let i = 0; i < nums.length; i++) {
      if (el == nums[i]) {
        count++
      }
      if (count > nums.length / 2) {
        return el
      }
    }
    count = 0
  }
}
// let k = majorityElement(nums)

// 189. Rotate Array, Medium
// Array, Math, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// ;(nums = [1, 2, 3, 4, 5, 6, 7]), (k = 3) // Output: [5,6,7,1,2,3,4]
// ;(nums = [-1, -100, 3, 99]), (k = 2) // Output: [3,99,-1,-100]
// ;(nums = [-1]), (k = 2) // Output: [-1]
// ;(nums = [1, 2]), (k = 3) // Output: [2,1]
// ;(nums = [1, 2, 3]), (k = 4) // Output: [3,1,2]
var rotate = function (nums, k) {
  // Variant 1
  // for (let i = 0; i < k; i++) {
  //   // Add to begining of array last element of this array
  //   nums.unshift(nums[nums.length - 1])
  //   // Remove last element
  //   nums.pop()
  // }
  // Variant 2
  // while (k != 0) {
  //   nums.unshift(nums[nums.length - 1])
  //   nums.pop()
  //   k--
  // }
  // Variant 3
  // if (nums.length == 1) {
  //   return
  // }
  // if (nums.length == 2 && k % 2 == 1) {
  //   // Add elements to start of array with spread '...' operator
  //   nums.unshift(nums[nums.length - 1])
  //   // Remove k elements from length - k index
  //   nums.splice(nums.length - 1, 1)
  //   return
  // }
  // if (nums.length < k) {
  //   for (let i = 0; i < k; i++) {
  //     nums.unshift(nums[nums.length - 1])
  //     nums.pop()
  //   }
  //   return
  // }
  // // Cut last k elements into new array
  // let arrX = nums.slice(nums.length - k, nums.length)
  // // Add elements to start of array with spread '...' operator
  // nums.unshift(...arrX)
  // // Remove k elements from length - k index
  // nums.splice(nums.length - k, k)
  // Variant 4
  // while (k > 0) {
  //   nums.unshift(nums.pop())
  //   k--
  // }
  // Variant 4 Alternative https://leetcode.com/problems/rotate-array/solutions/487529/py3-js-5-different-simple-solutions/
  // while (k--) {
  //   nums.unshift(nums.pop())
  // }
  // Variant 5 with help https://leetcode.com/problems/rotate-array/solutions/1917874/js-rotate-array-time-limit-exceeded/
  // Shifting items one by one k times is too slow, you have to do it in o(n) amount of time instead of o(k*n)
  if (nums.length > k) {
    nums.unshift(...nums.splice(-k))
  } else {
    while (k--) {
      nums.unshift(nums.pop())
    }
  }
}
// rotate(nums, k)

// 121. Best Time to Buy and Sell Stock, Easy
// Array, Dynamic Programming
/*****************************************************************************/
/**
 * @param {number[]} prices
 * @return {number}
 */
// TODO Search MAXIMUM pforit in O(n) times
// ascii graph with understanding
/* For [7, 1, 5, 3, 6, 4]; points of interest: 2(1) and 5(6).
8
7    *                  v
6     \                /*\
5      \      /*\     /   \
4       \    /   \   /      *
3        \  /      *
2         \/
1         *
0    1    2    3   4   5   6
          ^
*/
// prices = [7, 1, 5, 3, 6, 4] // Output: 5
// prices = [7, 6, 4, 3, 1] // Output: 0
// prices = [1] // Output: 0
// prices = [1, 2] // Output: 1
// prices = [2, 4, 1] // Output: 2
// prices = [3, 2, 6, 5, 0, 3] // Output: 4
// prices = [2, 1, 2, 1, 0, 1, 2] // Output: 2
// prices = [1, 2, 4, 7, 11] // Output: 10
var maxProfit = function (prices) {
  let profit = -1 // Set negative profit
  let current = prices[0] // Set current
  for (let i = 0; i < prices.length; i++) {
    // If difference between index value and current value bigger then profit, this difference become new profit
    if (prices[i] - current > profit) {
      profit = prices[i] - current
      // If NOT and also current value bigger then index value, set current value to be lower than it was (same as value at current index)
    } else if (current > prices[i]) {
      current = prices[i]
    }
  }
  return profit
}
// maxProfit(prices)

// 122. Best Time to Buy and Sell Stock II, Medium
// Array, Dynamic Programming, Greedy
/*****************************************************************************/
/**
 * @param {number[]} prices
 * @return {number}
 */
// prices = [7, 1, 5, 3, 6, 4] // Output: 7
// prices = [7, 6, 4, 3, 1] // Output: 0
// prices = [1] // Output: 0
// prices = [1, 2] // Output: 1
// prices = [2, 4, 1] // Output: 2
// prices = [1,2,4,7,11] // Output: 10
// prices = [1,2,3,4,5] // Output: 4
// prices = [7,6,4,3,1] // Output: 0
// TODO Search sum of profits in O(n) times
var maxProfit = function (prices) {
  let profit = -1
  let current = prices[0]
  let profits = []
  let profitsSum = 0

  for (let i = 0; i < prices.length; i++) {
    // If difference between index value and current value bigger then profit, this difference become new profit
    if (prices[i] - current > profit) {
      profit = prices[i] - current
      // Add profit to profits array
      profits.push(profit)
      // Reset current value to count from current index
      current = prices[i]
      // If NOT and also current value bigger then index value, set current value to be lower than it was (same as value at current index)
    } else if (current > prices[i]) {
      current = prices[i]
    }
    // Reset profit after each cycle
    profit = 0
  }
  // Sum profits
  for (let i = 0; i < profits.length; i++) {
    profitsSum += profits[i]
  }
  // profitsSum = profits.reduce((a, b) => a + b)
  console.log(profits)
  console.log(profitsSum)
  return profitsSum
}
// maxProfit(prices)

// 55. Jump Game, Medium
// Array, Dynamic Programming, Greedy
/*****************************************************************************/
// With hellp of https://leetcode.com/problems/jump-game/solutions/273641/javascript-simple-o-n-greedy-solution/?envType=study-plan-v2&envId=top-interview-150
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// nums = [2, 3, 1, 1, 4] // Output: true
// nums = [3, 2, 1, 0, 4] // Output: false
// nums = [0] // true
// nums = [2, 0] // true
// nums = [2, 5, 0, 0] // true
// nums = [3, 2, 1, 0, 4] // false
// nums = [0, 2, 3] // false
// nums = [3, 0, 8, 2, 0, 0, 1] // true
// nums = [1, 0, 1, 0] // false
// nums = [5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0] // true
// nums = [1, 1, 2, 2, 0, 1, 1] // true
// nums = [8, 2, 4, 4, 4, 9, 5, 2, 5, 8, 8, 0, 8, 6, 9, 1, 1, 6, 3, 5, 1, 2, 6, 6, 0, 4, 8, 6, 0, 3, 2, 8, 7,6, 5, 1, 7, 0, 3, 4, 8, 3, 5, 9, 0, 4, 0, 1, 0, 5, 9, 2, 0, 7, 0, 2, 1, 0, 8, 2, 5, 1, 2, 3, 9, 7,  4, 7, 0, 0, 1, 8, 5, 6, 7, 5, 1, 9, 9, 3, 5, 0, 7, 5,] // true
var canJump = function (nums) {
  let i = 0
  let lastIndex = nums.length - 1
  let jump = 0
  while (i < nums.length) {
    // Set jumper to be maximum value of 2: 'last jump' and 'new possible jump from current index + index value'
    jump = Math.max(jump, i + nums[i])
    // Check if we can jump beyond or equal to last index
    if (jump >= lastIndex) {
      return true // If so we can reach end of array
    }
    // If we reach 0 at this index and there are no jumpers before, that can jump beyond this index  (jump < i) we reach end of our jumps
    if (jump <= i && nums[i] === 0) {
      return false
    }
    // Increment counter
    i++
  }
}
// canJump(nums)

// 45. Jump Game II, Medium
// Array, Dynamic Programming, Greedy, BFS
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// TODO return minimum number of jumps to reach nums[n-1]
// nums = [2, 3, 1, 1, 4] // Output: 2
// nums = [0] // 0
// nums = [1, 2, 1, 1, 1] // 3
// nums = [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3] // 2
// nums = [4, 1, 1, 3, 1, 1, 1] // 2
// TODO jump 3 even if max jump could be 4, then jump 3; Need minimum number of jumps
var jump = function (nums) {
  let i = 0
  let lastIndex = nums.length - 1
  let jump = 0
  let lastJump = 0
  let count = 0

  if (nums.length == 1) return 0

  while (i < nums.length) {
    // Hold last jump to compare with new jump after this
    lastJump = jump
    // Set jumper to be maximum value of 2: 'last jump' and 'new possible jump from current index + index value'
    jump = Math.max(jump, i + nums[i], jump + nums[jump])
    // Count jumps if new jump happens
    if (jump > lastJump) count++
    // Check if we can jump beyond or equal to last index
    if (jump >= lastIndex) {
      return count // If so we can reach end of array
    }
    // If we reach 0 at this index and there are no jumpers before, that can jump beyond this index  (jump < i) we reach end of our jumps
    if (jump <= i && nums[i] === 0) {
      return false
    }
    // Increment counter
    i++
  }
}
// console.log(jump(nums))

/* TODO
https://leetcode.com/problems/jump-game-ii/solutions/443098/javascript-solution-w-explanation/?envType=study-plan-v2&envId=top-interview-150

var jump = function(nums) {
  let newMax = 0;
  let jump = 0;
  let oldMax = 0;
  for (let i=0;i<nums.length-1;i++) {
      newMax = Math.max(newMax, i+nums[i]);
      if (i == oldMax) {
          jump++;
          oldMax = newMax;
      }
  }
  return jump;
};
*/

// 13. Roman to Integer, Easy, 00:30
// Hash Table, Math, String
/*****************************************************************************/
/*
Roman numerals are represented by seven different symbols:

Symbol  Value
I       1
V       5
X       10
L       50
C       100
D       500
M       1000

Six instances where subtraction is used:
I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.
*/
// s = 'I' // Output: 1
// s = 'III' // Output: 3
// s = 'LVIII' // Output: 58
// s = 'MCMXCIV' // Output: 1994
/**
 * @param {string} s
 * @return {number}
 */
// Alternative solution https://leetcode.com/problems/roman-to-integer/solutions/326345/simple-javascript-solution-easy-understanding/?envType=study-plan-v2&envId=top-interview-150
var romanToInt = function (s) {
  const symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let res = 0

  for (let i = 0; i < s.length; i++) {
    symbols[s[i]] < symbols[s[i + 1]] ? (res -= symbols[s[i]]) : (res += symbols[s[i]])
  }

  return res
}
// console.log(romanToInt(s))

// My solution
// var romanToInt = function (s) {
//   let res = 0
//   for (let i = 0; i < s.length; i++) {
//     switch (s[i]) {
//       case 'I':
//         if (s[i + 1] != undefined && (s[i + 1] == 'V' || s[i + 1] == 'X')) {
//           res -= 1
//         } else {
//           res += 1
//         }
//         break
//       case 'V':
//         res += 5
//         break
//       case 'X':
//         if (s[i + 1] != undefined && (s[i + 1] == 'L' || s[i + 1] == 'C')) {
//           res -= 10
//         } else {
//           res += 10
//         }
//         break
//       case 'L':
//         res += 50
//         break
//       case 'C':
//         if (s[i + 1] != undefined && (s[i + 1] == 'D' || s[i + 1] == 'M')) {
//           res -= 100
//         } else {
//           res += 100
//         }
//         break
//       case 'D':
//         res += 500
//         break
//       case 'M':
//         res += 1000
//         break
//     }
//   }
//   return res
// }
// console.log(romanToInt(s))

// 12. Integer to Roman, Medium
// Hash Table, Math, String
/*****************************************************************************/
// num = 1 // Output: "I"
// num = 4 // Output: "IV"
// num = 3 // Output: "III"
// num = 58 // Output: "LVIII"
// num = 1994 // Output: "MCMXCIV"
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  // Consider 4,9,40,90,400,900 - as separate values
  const symbols = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }

  let res = []

  while (num > 0) {
    function loop() {
      for (let i in symbols) {
        if (num - symbols[i] >= 0) {
          res.push(i)
          num -= symbols[i]
          // Break the loop, thus start looking for symbols from beginning after each found value
          return
        }
      }
    }
    loop()
  }

  res = res.join('')
  return res
}
// console.log(intToRoman(num))

// 274. H-Index, Medium
// Array, Sorting, Counting Sort
/*****************************************************************************/
/*
Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index.
h-index(f) = max{i є N : f(i) >_ i}

Example:
Articles Citations
  1        33
  2        30
  3        20
  4        15
  5        7
  6        6 <-
  ----------
  7        5
  8        4
An h-index of 6 means that this author has published at least 6 papers that have each received at least 6 citations.
https://subjectguides.uwaterloo.ca/calculate-academic-footprint/YourHIndex
*/
// citations = [3, 0, 6, 1, 5] // Output: 3
// citations = [1, 3, 1] // Output: 1
// citations = [100] // Output: 1
// citations = [0] // Output: 0
// citations = [0, 1] // Output: 1
// citations = [1, 0] // Output: 1
// citations = [11, 15] // Output: 2
// citations = [10, 8, 5, 4, 3] // 4
// citations = [25, 8, 5, 3, 3] // 3
/**
 * @param {number[]} ciktations
 * @return {number}
 */
var hIndex = function (citations) {
  let res = 0
  // Sort descending
  citations.sort((a, b) => a - b).reverse()
  // If number of citations less then total publication number -> not count. Thus we count only most cited publications, starting in descending order
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] > i) {
      res++
    }
  }

  return res
}
// console.log(hIndex(citations))

// 380. Insert Delete GetRandom O(1), Medium
// Array, Hash Table, Math, Design, Randomized
/*****************************************************************************/
/*
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
*/
/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
class RandomizedSet {
  constructor() {
    this.map = new Map()
  }
  insert(val) {
    if (this.map.has(val)) return false
    this.map.set(val, val)
    return true
  }
  remove(val) {
    if (!this.map.has(val)) return false
    this.map.delete(val)
    return true
  }
  getRandom() {
    const arr = Array.from(this.map, ([name, value]) => value)
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }
}
// const randomizedSet = new RandomizedSet() //?
// randomizedSet.insert(1) //?
// randomizedSet.remove(2) //?
// randomizedSet.insert(2) //?
// randomizedSet.getRandom() //?
// randomizedSet.remove(1) //?
// randomizedSet.insert(2) //?
// randomizedSet.getRandom() //?
