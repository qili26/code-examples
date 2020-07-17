/**
 * @param {string} S
 * @return {string}
 */
export const reorganizeString = function(S) {
  // freq = { char: count };
  // sort by count and re-arrange the str
  // if any letter count is greater than S.length >> 1, then directly return ''
  // use a maxheap to organize the string.
  // '', [a: 3, b:1, c:1] => a, b
  // 'ab', [a: 2, c:1] => `abac`
  // 'abac', [a: 1]
  // 'abaca'

  // '', [a:3, b:3, c:1] => a,b [c:1], then push a, b, back to the heap [a:2,b:2,c:1]
  // 'ab', [a:2, b:2, c:1] => abab [a:1,b:1,c1];
  // 'abab', [a:1,b:1,c1] =>
  // 'abababc'

  if (!S) return '';

  // generate frequency map
  const freq = {};
  let maxCount = 0;
  for (const c of S) {
    freq[c] = freq[c] || 0;
    freq[c]++;

    maxCount = Math.max(maxCount, freq[c]);
  }

  const maxLimit = (S.length + 1) >> 1;
  if (maxLimit < maxCount) {
    return '';
  }

  const maxHeap = new PriorityQueue((a, b) => {
    const diff = b[1] - a[1];

    // count sort DESC
    if (diff !== 0) return diff;

    // letter sort ASC
    return a[0].charCodeAt(0) - b[0].charCodeAt(0);
  });

  for (const [letter, count] of Object.entries(freq)) {
    maxHeap.push([letter, count]);
  }

  const result = [];
  while (maxHeap.size > 1) {
    const letter1 = maxHeap.pop();
    const letter2 = maxHeap.pop();

    result.push(letter1[0]);
    result.push(letter2[0]);
    letter1[1]--;
    letter2[1]--;

    if (letter1[1] > 0) maxHeap.push(letter1);
    if (letter2[1] > 0) maxHeap.push(letter2);
  }

  const last = maxHeap.pop();
  if (last) result.push(last[0]);

  return result.join('');
};

class PriorityQueue {
  constructor(comparator) {
    this.arr = [];
    this.comparator = comparator || ((a, b) => a - b);
  }

  get size() {
    return this.arr.length;
  }

  push(value) {
    this.arr.push(value);
    this.moveUp(this.arr.length - 1);
  }

  peek() {
    return this.arr[0];
  }

  pop() {
    if (this.arr.length === 1) {
      return this.arr.pop();
    }

    const value = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.moveDown(0);
    return value;
  }

  delete(value) {
    const index = this.arr.findIndex(v => v === value);
    if (index < 0) {
      return false;
    }

    if (index === this.arr.length - 1) {
      this.arr.pop();
      return true;
    }

    this.arr[index] = this.arr.pop();
    const idx = this.moveUp(index);
    this.moveDown(idx);

    return true;
  }

  swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }

  moveUp(c) {
    const p = (c - 1) >> 1;

    if (p >= 0 && this.comparator(this.arr[p], this.arr[c]) > 0) {
      this.swap(p, c);
      return this.moveUp(p);
    }

    return c;
  }

  moveDown(p) {
    const left = p * 2 + 1;
    const right = p * 2 + 2;
    let next = p;

    if (left < this.arr.length && this.comparator(this.arr[next], this.arr[left]) > 0) {
      next = left;
    }

    if (right < this.arr.length && this.comparator(this.arr[next], this.arr[right]) > 0) {
      next = right;
    }

    if (next !== p) {
      this.swap(next, p);
      this.moveDown(next);
    }
  }
}
