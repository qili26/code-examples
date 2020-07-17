/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
export const lengthOfLongestSubstringKDistinct = function(s, k) {
  if (k === 0) return 0;

  if (k > s.length) k = s.length;

  const window = {};
  let start = 0;
  let maxLen = 0;

  for (let end = start; end < s.length; end++) {
    const right = s[end];
    window[right] = end;

    while (Object.keys(window).length > k) {
      const left = s[start];

      // if current letter is the position of start, then we shall remove it from the window
      if (window[left] === start) {
        delete window[left];
      }

      start++; // shrink window
    }

    maxLen = Math.max(end - start + 1, maxLen);
  }

  return maxLen;
};
