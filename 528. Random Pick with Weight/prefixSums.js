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
