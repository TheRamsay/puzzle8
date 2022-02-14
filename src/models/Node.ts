import {BoardArray} from "../types";

class Node {
    board: BoardArray;
    parent: Node | null;
    depth: number
    direction: string

    constructor(board: BoardArray, parent: Node | null, depth: number, direction: string) {
        this.board = board;
        this.parent = parent;
        this.depth = depth;
        this.direction = direction
    }

    getChildren(x: number, y: number): Array<[number, number, string]> {
        const offsets: Array<[number, number, string]> = [[1, 0, "right"], [-1, 0, "left"], [0, 1, "down"], [0, -1, "up"]];
        const res: Array<[number, number, string]> = [];

        offsets.forEach(([ox, oy, direction]) => {
            const newX = ox + x;
            const newY = oy + y;

            if (newX < 0 || newY < 0 || newX >= this.board[0].length || newY >= this.board.length) {
                return;
            }

            res.push([newX, newY, direction]);

        })

        return res;
    }

    find(target: number): [number, number] {
        let res = null;
        this.board.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val === target) {
                    res = [x, y];
                }
            })
        })

        if (res) {
            return res;
        }

        throw new Error("Empty cell not found.");
    }

    getValue(x: number, y: number): number {
        const num = this.board[y][x];
        if (num !== null) {
            return num;
        }

        throw new Error("Invalid coordinates");
    }

    setValue(x: number, y: number, val: number) {
        this.board[y][x] = val;

    }

    isSame(other: Node): boolean {
        return this.board.toString() === other.board.toString();
    }

    toString(): string {
        return this.board.flat().join("");
    }

    createChild(direction: string): Node {
        const newBoard = this.copyBoard();
        return new Node(newBoard, this, this.depth + 1, direction);
    }

    copyBoard(): BoardArray {
        return this.board.map((arr) => {
            return arr.slice();
        });
    }

    copyNode(): Node {
        return new Node(this.copyBoard(), this.parent, this.depth, this.direction)
    }

    isSolvable(goal: Node): boolean {
        let inversions = 0;
        const flatten = this.board.flat();
        const values = new Array(9).fill(0);

        goal.board.flat().forEach((el, idx) => {
            if (el === null) {
                return;
            }
            values[el] = idx;
        })

        flatten.forEach((el, idx) => {
            for (let j = idx + 1; j < 9; j++) {
                if (!el || !flatten || !flatten[j]) {
                    continue;
                }

                // @ts-ignore
                if (el !== 0 && flatten[j] !== 0 && values[el] > values[flatten[j]]) {
                    inversions++;
                }

            }
        })

        return inversions % 2 === 0;
    }

    getManhattanDistance(goal: Node): number {
        let score = 0;
        this.board.forEach((row, y) => {
            row.forEach((val, x) => {
                if (!val) {
                    return;
                }
                const [targetX, targetY] = goal.find(val);
                score += Math.abs(targetX - x) + Math.abs(targetY - y);

            })
        })

        return score;
    }


    getCost(goal: Node) {
        const h = this.getManhattanDistance(goal);
        const g = this.depth;
        return g + h;
    }

    display() {
        this.board.forEach((row) => {
            let temp = ""
            row.forEach((val) => {
                temp += `${val} `;
            });
            console.log(temp);
        })
    }

    public static fromString(input: string, depth: number, parent: Node | null = null): Node {

        if (input.length !== 9) {
            throw new Error("Input length has to be 9 characters");
        }

        const arr: BoardArray = [];
        let temp: Array<number> = [];
        [...input].forEach((ch: string, idx) => {
            if (idx !== 0 && idx % 3 === 0) {
                arr.push(temp)
                temp = [];
            }
            temp.push(Number(ch))
        })
        arr.push(temp)

        return new Node(arr, parent, depth, "");
    }

    public static fromObject(payload: { board: BoardArray, parent: Node | null, depth: number, direction: string }): Node {

        if (payload.parent === null) {
            return new Node(payload.board, payload.parent, payload.depth, payload.direction);
        }

        return new Node(payload.board, Node.fromObject(payload.parent), payload.depth, payload.direction);

    }

    public static isValid(_board: string): boolean {
        const occ: Set<number> = new Set();
        for (const _val of [..._board]) {
            const val = Number(_val);
            if (occ.has(val)) {
                return false;
            }
            occ.add(val)
        }
        return true;
    }

}


export default Node;