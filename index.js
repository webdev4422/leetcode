'use strict'

// My helper functions, speed up debugging
import { arrayToLinkedList } from './helper.js'

// 1306. Jump Game III, Medium
// Array, Depth-first search, Breadth-first search
/*****************************************************************************/
/*
Positioned at start index of the array, check if you can reach to any index with value 0 ?
TODO: Use DFS for undirected unweighted acyclic graph to find target.
Steps:
1. build graph with all indexes (hash map)
[4, 2, 3, 0, 3, 1, 2] values
[0, 1, 2, 3, 4, 5, 6] indicesk
Map { 0 => [ 4, null ], each record corespond to jump indicies: jump from index 0 to index -4(null) and 4
      1 => [ 3, null ],
      2 => [ 5, null ],
      3 => [ 3, 3 ],
      4 => [ null, 1 ],
      5 => [ 6, 4 ],
      6 => [ null, 4 ] }
2. traverse the graph to find if it containt target
*/
// ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 5) // Output: true
// ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 0) // Output: true
// ;(arr = [3, 0, 2, 1, 2]), (start = 2) // Output: false
// ;(arr = [0, 1]), (start = 1) // true
// ;(arr = [47, 26, 216, 78, 179, 101, 42, 233, 185, 56, 303, 310, 169, 338, 51, 104, 308, 162, 81, 82, 169,41, 106, 150, 285, 298, 33, 251, 289, 236, 256, 227, 197, 186, 267, 326, 268, 243, 89, 347, 72, 0,89, 157, 90, 333, 327, 76, 106, 68, 355, 124, 234, 70, 43, 248, 259, 280, 199, 201, 312, 327, 217,278, 330, 258, 348, 351, 223, 240, 143, 244, 64, 343, 339, 101, 193, 18, 140, 312, 71, 225, 111,79, 199, 226, 321, 344, 31, 177, 362, 115, 341, 79, 146, 303, 348, 291, 250, 169, 78, 307, 325,33, 338, 316, 201, 343, 37, 37, 0, 15, 341, 38, 44, 67, 280, 128, 31, 106, 220, 172, 349, 142,339, 181, 102, 351, 81, 209, 41, 181, 59, 216, 230, 170, 257, 52, 5, 338, 28, 75, 208, 307, 108,103, 34, 342, 82, 233, 263, 12, 167, 358, 316, 150, 337, 158, 78, 231, 26, 22, 147, 81, 12, 319,161, 12, 75, 129, 54, 119, 131, 334, 292, 253, 255, 98, 39, 67, 146, 15, 329, 120, 80, 347, 89,124, 303, 315, 235, 55, 1, 100, 290, 187, 333, 326, 87, 138, 48, 41, 153, 118, 192, 152, 279, 69,154, 71, 152, 273, 61, 153, 267, 51, 106, 225, 204, 327, 50, 15, 202, 244, 328, 3, 150, 355, 240,240, 188, 92, 107, 244, 280, 102, 265, 273, 328, 115, 70, 221, 357, 101, 186, 251, 116, 24, 125,58, 185, 34, 356, 21, 108, 221, 169, 208, 230, 226, 235, 336, 304, 315, 334, 329, 229, 190, 20,104, 348, 132, 66, 265, 55, 212, 102, 167, 52, 2, 328, 114, 101, 196, 99, 155, 158, 337, 191, 119,14, 347, 127, 305, 142, 156, 92, 340, 358, 58, 7, 178, 79, 355, 289, 199, 251, 233, 351, 57, 115,306, 179, 31, 42, 123, 87, 101, 218, 71, 193, 205, 300, 180, 42, 19, 280, 233, 293, 181, 147, 359,190, 168, 191, 5, 58, 198, 154, 139, 29, 342, 261, 245, 141, 26, 251, 162, 360, 219, 233, 297,287, 262, 112, 87, 261, 21, 205, 131, 98, 161, 103, 57,]), (start = 313) // true
// ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 5) // true
// ;(arr = [4, 4, 1, 3, 0, 3]), (start = 2) // true
// ;(arr = [5, 11, 18, 16, 21, 3, 19, 0, 16, 4, 9, 20, 2, 13, 0, 2, 23, 8, 19, 22, 16, 19, 19, 25, 25, 15, 7,]),(start = 18) // false
// ;(arr = [1, 1, 1, 1, 1, 1, 1, 1, 0]), (start = 3) // true
// ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 0) // true
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start) {
  // 1. Build graph as hash map
  const graph = new Map()
  function buildGraph() {
    // 1.1 Check if index lower/bigger than arr, if so return empty values
    function check(item) {
      let left = item - arr[item]
      let right = item + arr[item]
      if (left == right) return [item] // Target
      if (left < 0 && right > arr.length - 1) return [] // Empty
      if (left < 0) return [right] // Only right
      if (right > arr.length - 1) return [left] // Only left
      return [left, right] // Both values valid
    }
    // 1.2 Set each node in graph (index) to adjecent nodes (indices) = i [i + arr.at(i), i - arr.at(i)]
    // i.e. Make nodes and conections to other nodes
    for (let i = 0; i < arr.length; i++) {
      graph.set(i, check(i))
    }
  }
  buildGraph()
  // console.log(graph)

  // 2. BFS, DFS, DFS-Recursive
  // Breadth-first search on grpah
  function bfs() {
    const visited = new Set()
    const stack = [start]
    for (let i = 0; i < stack.length; i++) {
      const idx = stack[i]
      if (arr[idx] === 0) return true
      if (!visited.has(idx)) {
        visited.add(idx)
        stack.push(...graph.get(idx))
      }
    }
    return false
  }
  // return bfs()

  // Depth-first search on graph
  function dfs() {
    const visited = new Set()
    const stack = [start]
    while (stack.length > 0) {
      const idx = stack.pop() // Current index = last item in stack
      if (arr[idx] === 0) return true // Found target
      if (!visited.has(idx)) {
        visited.add(idx) // Add current item to visited, so won't execute same item later
        stack.push(...graph.get(idx)) // Get current node neighbors into stack
      }
    }
    return false
  }
  // return dfs()

  // Depth-first search recursive on graph
  const visited = new Set()
  const stack = []
  function dfsRecursive() {
    if (arr[start] === 0) return true
    visited.add(start)
    stack.push(...graph.get(start)) // Add adjacent nodes to stack
    for (let i = stack.length - 1; i >= 0; i--) {
      // Cycle from end to start
      start = stack[i]
      // 'arr' and 'start' taken from outer function, while 'visited' and 'stack' should be declared inside recursive function manullay. So this: 'recursive(visited, stack)' - also valid.
      if (!visited.has(start)) return dfsRecursive(arr, start, visited, stack)
    }
    return false
  }
  // return dfsRecursive()
}
// console.log(canReach(arr, start))

// 2648. Generate Fibonacci Sequence, Easy
// callCount = 5 // Output: [0,1,1,2,3]
// callCount = 0 // Output: []
/**
 * @return {Generator<number>}
 */
var fibGenerator = function* () {
  // Xn = Xn-1 + Xn-2
  let fib = [0, 1]
  for (let i = 1; i < fib.length; i++) {
    let curr = fib.at(-1) + fib.at(-2)
    fib.push(curr)
    yield fib[i - 1]
  }
}
// const gen = fibGenerator()
// console.log(gen.next().value) // 0
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3
// console.log(gen.next().value) // 5
// console.log(gen.next().value) // 8

// 206. Reverse Linked List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // Explanation:
  // 1) Declare basics. Add two pointers to watch for the list
  let p1 = null // Point pointer 1 to null
  let p2 = head // Point pointer 2 to head

  // 2) Move pointers and head references
  while (head) {
    p2 = p2.next // 1) Point p2 to next node
    head.next = p1 // 2) Point head to new node
    p1 = head // 3) Point p1 to old head
    head = p2 // 4) Point head to next node (thus head become new head)
  }

  // 3) Pointer 1 become new head, that points to reversed list
  return p1
}
// const head = arrayToLinkedList([1, 2, 3, 4, 5]) //?
// const expected = arrayToLinkedList([5, 4, 3, 2, 1]) //?
// console.log(reverseList(head))

// 2649. Nested Array Generator, Medium
/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  const flatArr = []

  function flatting(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatting(arr[i])
      } else {
        flatArr.push(arr[i])
      }
    }
  }
  flatting(arr)

  for (let i = 0; i < flatArr.length; i++) {
    yield flatArr[i]
  }
}
// const gen = inorderTraversal([1, [2, 3]])
// const gen = inorderTraversal([[[[[]]]]])
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3

// 2693. Call Function with Custom Context, Medium
/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function (context, ...args) {
  return this.bind(context)(...args)
}
// //prettier-ignore
// function increment() {return ++this.count}
// console.log(increment.callPolyfill({ count: 1 })) //2
// function tax(price, taxRate) {
//   const totalCost = price * (1 + taxRate)
//   console.log(`The cost of ${this.item} is ${totalCost}`)
// }
// console.log(tax.callPolyfill({ item: 'burger' }, 10, 1.1))

// 35. Search Insert Position, Easy
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let tmp = nums.indexOf(target)
  if (tmp === -1) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > target) return i
      if (i === nums.length - 1) return i + 1
    }
  } else {
    return tmp
  }
}
// let nums = [1, 3, 5, 6], target = 5 //2
// let nums = [1, 3, 5, 6],target = 2 // 1
// let nums = [1, 3, 5, 6], target = 7 //4
// console.log(searchInsert(nums, target))

// 70. Climbing Stairs, Easy
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // https://leetcode.com/problems/climbing-stairs/solutions/2810612/4-ways-to-solve-with-detailed-diagrams-no-memoization-beats-100-time-memory/
  // ways to reach given step = ways to reach last step + ways to reach second-last step

  let step = 1
  let previousStep = 0

  for (let i = 0; i < n; i++) {
    // ;[previousStep, step] = [step, previousStep + step]
    let tmp = previousStep
    previousStep = step
    step = tmp + step
  }

  return step
}
// console.log(climbStairs(1)) // 1
// console.log(climbStairs(2)) // 2
// console.log(climbStairs(3)) // 3
// console.log(climbStairs(4)) // 5
// console.log(climbStairs(5)) // 8

// 260. Single Number III, Medium
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      if (map.get(nums[i]).length < 1) map.get(nums[i]).push(nums[i])
      if (map.get(nums[i]).length === 1) map.delete(nums[i])
    } else {
      map.set(nums[i], [])
    }
  }

  // Destructure map iterator object
  const result = [...map.keys()]
  return result
}
// console.log(singleNumber([1, 2, 1, 3, 2, 5]))

// 83. Remove Duplicates from Sorted List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || head.next === null) return head

  let dummy = head

  while (dummy.next) {
    if (dummy.val === dummy.next.val) {
      dummy.next = dummy.next.next
    } else {
      dummy = dummy.next
    }
  }

  return head
}
// const head = arrayToLinkedList([1, 1, 2])
// const head2 = arrayToLinkedList([1,1,2,3,3])
// console.log(deleteDuplicates(head)) // Output [1,2]
// console.log(deleteDuplicates(head2)) // Output [1,2,3]

// 171. Excel Sheet Column Number, Easy
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  // Get UTF-16 code (ASCII table) value, by subtracting all characters before UPPERCASE UTF-16 index
  // I.e. 31 characters are reserved, so we start from ' ' (space) what correspond to 32
  // ' ' -> 32, '0' -> 48, 'A' -> 65, 'a' -> 97
  // So 'A' at 65 index minus 64 = 1, we got starting value to count from
  // Now simply count as it's base 26 integers that we should calculate

  let result = 0
  // Reverse string to start count from end
  columnTitle = columnTitle.split('').reverse().join('')

  for (let i = 0; i < columnTitle.length; i++) {
    // result += (columnTitle.charCodeAt(i) - 64) * Math.pow(26, i)
    let char = columnTitle.charCodeAt(i) - 64
    let pow = Math.pow(26, i)
    result += char * pow
  }
  return result
}
// console.log(titleToNumber('A')) // Output: 1
// console.log(titleToNumber('AB')) // Output: 28
// console.log(titleToNumber('ZY')) // Output: 701
// console.log(titleToNumber('AAE')) // Output: 707

// 168. Excel Sheet Column Title, Easy
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  let result = ''
  while (columnNumber > 0) {
    // Adjust columnNumber to 0-based index ? WHY ? So below reminder calculations is possible with 0, thus we start from 65 -> 'A'
    columnNumber--
    // Get the character corresponding to the remainder after dividing by 26
    let char = String.fromCharCode((columnNumber % 26) + 65)
    // Append character in front of result string
    result = char + result
    // Divide columnNumber by 26 to move forward
    columnNumber = Math.floor(columnNumber / 26)
  }
  return result
}
// console.log(convertToTitle(1)) // Output: "A"
// console.log(convertToTitle(28)) // Output: "AB"
// console.log(convertToTitle(701)) // Output: "ZY"
// console.log(convertToTitle(707)) // Output: "AAE"

// 344. Reverse String, Easy
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  // s.reverse()
  const length = s.length
  for (let i = 1; i < length + 1; i++) s.push(s.at(length - i))
  s.splice(0, length)
  return s
}
// reverseString(['h', 'e', 'l', 'l', 'o']) // Output: ["o","l","l","e","h"]
// reverseString(['H', 'a', 'n', 'n', 'a', 'h']) // Output: ["h","a","n","n","a","H"]

// 387. First Unique Character in a String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let tmp = []

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) {
        tmp.push(s[i])
        break
      }
    }
    // After inner loop ends, check for unique character
    if (tmp.includes(s[i])) continue
    else return i
  }

  return -1
}
// console.log(firstUniqChar('leetcode')) // Output: 0
// console.log(firstUniqChar('loveleetcode')) // Output: 2
// console.log(firstUniqChar('aabb')) // Output: -1
// console.log(firstUniqChar('z')) // Output: 0
// console.log(firstUniqChar('dddccdbba')) // Output: 8

// 412. Fizz Buzz, Easy
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  const answer = []

  for (let i = 1; i < n + 1; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      answer.push('FizzBuzz')
    } else if (i % 3 === 0) {
      answer.push('Fizz')
    } else if (i % 5 === 0) {
      answer.push('Buzz')
    } else {
      answer.push(i.toString())
    }
  }
  return answer
}
// console.log(fizzBuzz(3)) // Output: ["1","2","Fizz"]
// console.log(fizzBuzz(5)) // Output: ["1","2","Fizz","4","Buzz"]
// console.log(fizzBuzz(15)) // Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

// 521. Longest Uncommon Subsequence I, Easy
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
  // Set longest string
  let long = a.length >= b.length ? a : b
  // Return longest string length if no common subsequence (if uncommon is true)
  for (let i = 0; i < long.length; i++) {
    if (a[i] != b[i]) return long.length
  }
  return -1
}
// console.log(findLUSlength('aba', 'cdc')) // 3
// console.log(findLUSlength('aaa', 'bbb')) // 3
// console.log(findLUSlength('aaa', 'aaa')) // -1
// console.log(findLUSlength('aefawfawfawfaw', 'aefawfeawfwafwaef')) // 17

// 415. Add Strings, Easy
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // return (BigInt(num1) + BigInt(num2)).toString() // Alternative

  // Test PPP (Pseudocode Programming Process)

  // Decalare vars
  let ans = ''
  let len1 = num1.length - 1
  let len2 = num2.length - 1
  let carry = 0

  // Get longer string
  let longer = len1 >= len2 ? len1 : len2
  // Go through each character in longer string from end to start
  for (let i = longer; i > -1; i--) {
    // Get integer at index, but also check if index overflow below 0
    let int1 = len1 >= 0 ? parseInt(num1.at(len1)) : 0
    let int2 = len2 >= 0 ? parseInt(num2.at(len2)) : 0

    // Initialize sum and add integers
    let sum = 0

    // If carry
    if (carry) {
      sum = int1 + int2 + 1
      carry = 0 // reset carry
    } else {
      sum = int1 + int2
    }

    // If sum > 9 add 1 to carry and subtract 10
    if (sum > 9) {
      carry++
      sum = sum - 10
    }

    // Add sum to answer
    ans = sum + ans

    // Decrease len1 & len2
    len1--
    len2--
  }

  // Check if carry still exists
  if (carry) ans = carry + ans

  return ans
}
// console.log(addStrings('11', '123')) // Output: "134"
// console.log(addStrings('456', '77')) // Output: "533"
// console.log(addStrings('0', '0')) // Output: "0"
// console.log(addStrings('9333852702227987', '85731737104263')) // Output: "9419584439332250"
// console.log(addStrings('1', '9')) // Output: "10"

// 2769. Find the Maximum Achievable Number, Easy
// Math
/**
 * @param {number} num
 * @param {number} t
 * @return {number}
 */
var theMaximumAchievableX = function (num, t) {
  for (let i = 0; i < t; i++) {
    num += 1
  }
  return num + t
}
//prettier-ignore
// let num = 4, t = 1 // Output: 6
// let num = 3, t = 2 // Output: 7
// console.log(theMaximumAchievableX(num, t))

// 2469. Convert the Temperature, Easy, Math
/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function (celsius) {
  const kelvin = celsius + 273.15
  const fahrenheit = celsius * 1.80 + 32.00
  return [kelvin, fahrenheit]
}
// console.log(convertTemperature(36.5)) // Output: [309.65000,97.70000]
