340. Longest Substring with At Most K Distinct Characters

Hard

Given a string, find the length of the longest substring T that contains at most k distinct characters.

Example 1:

```
Input: s = "eceba", k = 2
Output: 3
```

Explanation: T is "ece" which its length is 3.

Example 2:

```
Input: s = "aa", k = 1
Output: 2
```

Explanation: T is "aa" which its length is 2.

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
export const lengthOfLongestSubstringKDistinct = function(s, k) {
  if (k === 0) return 0;

  if (k > s.length) k = s.length;

  const slidingWindow = {};
  let start = 0;
  let maxLen = 0;

  for (let end = start; end < s.length; end++) {
    const right = s[end];
    slidingWindow[right] = end;

    while (Object.keys(slidingWindow).length > k) {
      const left = s[start];

      // if current letter is the position of start, then we shall remove it from the slidingWindow
      if (slidingWindow[left] === start) {
        delete slidingWindow[left];
      }

      start++; // shrink slidingWindow
    }

    maxLen = Math.max(end - start + 1, maxLen);
  }

  return maxLen;
};
```
