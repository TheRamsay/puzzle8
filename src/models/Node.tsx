import { BoardArray } from "../types";

export default class Node {
    board: BoardArray;
    parent: Node | null;
    depth: number

    constructor(start: BoardArray, parent: Node | null, depth: number) {
        this.board = start;
        this.parent = parent;
        this.depth = depth;
    }

    getChildren(x: number, y: number): Array<[number, number]> {
        const offsets: Array<[number, number]> = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const res: Array<[number, number]> = [];

        offsets.forEach(([ox, oy]) => {
            const newX = ox + x;
            const newY = oy + y;

            if (newX < 0 || newY < 0 || newX >= this.board[0].length || newY >= this.board.length) {
                return;
            }

            res.push([newX, newY]);

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

    createChild(): Node {
        const newBoard = this.copyBoard();
        return new Node(newBoard, this, this.depth + 1);
    }

    copyBoard(): BoardArray {
        return this.board.map((arr) => {
            return arr.slice();
        });
    }

    isSolvable(goal: Node): boolean {
        return this.getManhattanDistance(goal) % 2 === 0;
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

        return new Node(arr, parent, depth);
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

}
