528. Random Pick with Weight

Medium

Given an array w of positive integers, where w[i] describes the weight of index i, write a function pickIndex which randomly picks an index in proportion to its weight.

Note:

1. 1 <= w.length <= 10000
2. 1 <= w[i] <= 10^5
3. pickIndex will be called at most 10000 times.

Example 1:

```
Input:
["Solution","pickIndex"]
[[[1]],[]]
Output: [null,0]
```

Example 2:

```
Input:
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
Output: [null,0,1,1,1,0]
```

Explanation of Input Syntax:

1. The input is two lists: the subroutines called and their arguments. Solution's constructor has one argument, the array w. pickIndex has no arguments. Arguments are always wrapped with a list, even if there aren't any.

```js
/**
 * @param {number[]} w
 */
const Solution = function(w) {
  this.prefixSums = [];

  let prefixSum = 0;
  for (const weight of w) {
    prefixSum += weight;
    this.prefixSums.push(prefixSum);
  }

  this.totalSum = prefixSum;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
  const target = Math.ceil(this.totalSum * Math.random());

  let left = 0;
  let right = this.prefixSums.length;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (this.prefixSums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
```
