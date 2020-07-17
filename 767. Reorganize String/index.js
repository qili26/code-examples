/**
 * @param {string} S
 * @return {string}
 */
export function reorganizeString(S) {
  // break the string into chars
  // sort based on count.
  // like bucket sort, put the num values in the arr to corresponding index.

  const freq = {};
  for (const letter of S) {
    freq[letter] = freq[letter] || 0;
    freq[letter]++;
  }

  const keys = Object.keys(freq).sort((k1, k2) => freq[k2] - freq[k1]);

  const maxCount = S.length % 2 === 1 ? (S.length >> 1) + 1 : S.length >> 1;
  if (freq[keys[0]] > maxCount) return '';

  const result = Array(S.length);
  let index = 0;

  while (keys.length) {
    const curKey = keys.shift();
    let count = freq[curKey];

    while (count) {
      result[index] = curKey;
      index += 2;

      if (index >= S.length) {
        index = 1;
      }

      count--;
    }
  }

  return result.join('');
}

/**
 * 方法二
 * 1 用priority queue 对letter count pair 排序。
 * 2 每次取出两个排序最大的值，然后count--，之后再放回去，一次循环
 * 3 如果能拼出来的话，最后一定会剩余一个，再push的result数组中即可
 */
