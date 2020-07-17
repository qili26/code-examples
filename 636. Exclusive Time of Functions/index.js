/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
export const exclusiveTime = function(n, logs) {
  // 1. map string to array
  // 1.1 id -> number, type: str, time -> number, for end time, need to plus 1
  // 2. for loop the times and save to stack if it's start, and pop if it's end
  // 2.1 when stack is not empty, for the stack top, we need to save the time elapsed for it's id.
  // by using the current time in log to subtract the value in the stack top.

  const times = Array(n).fill(0);
  const mapper = log => {
    const [id, type, time] = log.split(':');
    return type === 'start' ? [Number(id), type, Number(time)] : [Number(id), type, Number(time) + 1];
  };
  const stack = [];

  for (let i = 0; i < logs.length; i++) {
    const cur = mapper(logs[i]);

    if (stack.length) {
      const pre = mapper(logs[i - 1]);
      const diff = cur[2] - pre[2];
      const id = stack[stack.length - 1][0];
      times[id] += diff;
    }

    if (cur[1] === 'start') {
      stack.push(cur);
    } else {
      stack.pop();
    }
  }

  return times;
};
