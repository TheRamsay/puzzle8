(() => {
  // src/models/Node.ts
  var Node = class {
    board;
    parent;
    depth;
    direction;
    constructor(board, parent, depth, direction) {
      this.board = board;
      this.parent = parent;
      this.depth = depth;
      this.direction = direction;
    }
    getChildren(x, y) {
      const offsets = [[1, 0, "right"], [-1, 0, "left"], [0, 1, "down"], [0, -1, "up"]];
      const res = [];
      offsets.forEach(([ox, oy, direction]) => {
        const newX = ox + x;
        const newY = oy + y;
        if (newX < 0 || newY < 0 || newX >= this.board[0].length || newY >= this.board.length) {
          return;
        }
        res.push([newX, newY, direction]);
      });
      return res;
    }
    find(target) {
      let res = null;
      this.board.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val === target) {
            res = [x, y];
          }
        });
      });
      if (res) {
        return res;
      }
      throw new Error("Empty cell not found.");
    }
    getValue(x, y) {
      const num = this.board[y][x];
      if (num !== null) {
        return num;
      }
      throw new Error("Invalid coordinates");
    }
    setValue(x, y, val) {
      this.board[y][x] = val;
    }
    isSame(other) {
      return this.board.toString() === other.board.toString();
    }
    toString() {
      return this.board.flat().join("");
    }
    createChild(direction) {
      const newBoard = this.copyBoard();
      return new Node(newBoard, this, this.depth + 1, direction);
    }
    copyBoard() {
      return this.board.map((arr) => {
        return arr.slice();
      });
    }
    copyNode() {
      return new Node(this.copyBoard(), this.parent, this.depth, this.direction);
    }
    isSolvable(goal) {
      let inversions = 0;
      const flatten = this.board.flat();
      const values = new Array(9).fill(0);
      goal.board.flat().forEach((el, idx) => {
        if (el === null) {
          return;
        }
        values[el] = idx;
      });
      flatten.forEach((el, idx) => {
        for (let j = idx + 1; j < 9; j++) {
          if (!el || !flatten || !flatten[j]) {
            continue;
          }
          if (el !== 0 && flatten[j] !== 0 && values[el] > values[flatten[j]]) {
            inversions++;
          }
        }
      });
      return inversions % 2 === 0;
    }
    getManhattanDistance(goal) {
      let score = 0;
      this.board.forEach((row, y) => {
        row.forEach((val, x) => {
          if (!val) {
            return;
          }
          const [targetX, targetY] = goal.find(val);
          score += Math.abs(targetX - x) + Math.abs(targetY - y);
        });
      });
      return score;
    }
    getCost(goal) {
      const h = this.getManhattanDistance(goal);
      const g = this.depth;
      return g + h;
    }
    display() {
      this.board.forEach((row) => {
        let temp = "";
        row.forEach((val) => {
          temp += `${val} `;
        });
        console.log(temp);
      });
    }
    static fromString(input, depth, parent = null) {
      if (input.length !== 9) {
        throw new Error("Input length has to be 9 characters");
      }
      const arr = [];
      let temp = [];
      [...input].forEach((ch, idx) => {
        if (idx !== 0 && idx % 3 === 0) {
          arr.push(temp);
          temp = [];
        }
        temp.push(Number(ch));
      });
      arr.push(temp);
      return new Node(arr, parent, depth, "");
    }
    static fromObject(payload) {
      if (payload.parent === null) {
        return new Node(payload.board, payload.parent, payload.depth, payload.direction);
      }
      return new Node(payload.board, Node.fromObject(payload.parent), payload.depth, payload.direction);
    }
    static isValid(_board) {
      const occ = /* @__PURE__ */ new Set();
      for (const _val of [..._board]) {
        const val = Number(_val);
        if (occ.has(val)) {
          return false;
        }
        occ.add(val);
      }
      return true;
    }
  };
  var Node_default = Node;

  // src/models/Solver.ts
  var Solver = class {
    start;
    end;
    generated;
    constructor(start2, end2) {
      this.start = start2;
      this.end = end2;
      this.generated = 0;
    }
    printPath(end2) {
      let count = 0;
      this.getPath(end2).forEach((node2) => {
        console.log(JSON.stringify(node2.board));
        count++;
      });
      console.log(`Length of path is ${count - 1}`);
    }
    getPath(end2) {
      const path = [];
      while (end2.parent !== null) {
        path.push(end2);
        end2 = end2.parent;
      }
      path.push(end2);
      return path.reverse();
    }
    static generateProblem(goal) {
      let currentNode = goal;
      const n = Math.floor(Math.random() * 30);
      const buffer = [];
      for (let i = 0; i < 20; i++) {
        const [x, y] = currentNode.find(0);
        const moves = goal.getChildren(x, y);
        let idx = Math.floor(Math.random() * moves.length);
        let [ox, oy, _] = moves[idx];
        moves.splice(idx, 1);
        while (buffer.some(([bx, by]) => bx === ox && by === oy) && moves.length > 0) {
          idx = Math.floor(Math.random() * moves.length);
          [ox, oy, _] = moves[idx];
          moves.splice(idx, 1);
        }
        buffer.push([ox, oy]);
        if (buffer.length > 4) {
          buffer.shift();
        }
        const _node = new Node_default(currentNode.copyBoard(), null, 0, "");
        _node.setValue(x, y, currentNode.getValue(ox, oy));
        _node.setValue(ox, oy, 0);
        currentNode = _node;
      }
      return currentNode;
    }
  };

  // src/models/BFSSolver.ts
  var BFSSolver = class extends Solver {
    constructor(start2, end2) {
      super(start2, end2);
    }
    solve() {
      console.log("Solving with BFS");
      const queue = [];
      queue.push(this.start);
      const visited = /* @__PURE__ */ new Set();
      while (queue.length !== 0) {
        const node2 = queue.shift();
        if (!node2) {
          continue;
        }
        visited.add(node2.toString());
        if (node2.isSame(this.end)) {
          return [node2, visited.size, this.generated];
        }
        const [x, y] = node2.find(0);
        node2.getChildren(x, y).forEach(([ox, oy, direction]) => {
          this.generated++;
          const newNode = node2.createChild(direction);
          newNode.setValue(x, y, node2.getValue(ox, oy));
          newNode.setValue(ox, oy, 0);
          if (visited.has(newNode.toString())) {
            return;
          }
          queue.push(newNode);
        });
      }
      return [null, -1, -1];
    }
  };

  // src/models/main.ts
  var start = new Node_default([
    [8, 6, 7],
    [2, 5, 4],
    [3, 0, 1]
  ], null, 0, "");
  var end = new Node_default([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ], null, -1, "");
  var startTime = Date.now();
  var solver = new BFSSolver(start, end);
  var [node, explored, generated] = solver.solve();
  var elapsedTime = (Date.now() - startTime) / 1e3;
  console.log(elapsedTime);
})();
