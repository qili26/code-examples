/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

/**
 * Use queue as a bfs and link the nodes
 * @param {Node} node
 * @return {Node}
 */
export const cloneGraph = function(root) {
  if (root === null) return null;

  const queue = [root];
  const map = [];
  const visited = new Array(101).fill(false);

  visited[root.val] = true;

  while (queue.length > 0) {
    const cur = queue.shift();
    map[cur.val] = map[cur.val] || new Node(cur.val);

    cur.neighbors.forEach(n => {
      // create the node if it is never created before
      map[n.val] = map[n.val] || new Node(n.val);
      // clone the cur's neighbor
      map[cur.val].neighbors.push(map[n.val]);

      // if it is not visited before, add to queue
      if (!visited[n.val]) {
        // map[n.val] must be available
        queue.push(n);
        visited[n.val] = true;
      }
    });
  }

  return map[root.val];
};
