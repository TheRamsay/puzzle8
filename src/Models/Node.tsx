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

    findEmptyCell(): [number, number] {
        let res = null;
        this.board.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val === 0) {
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
        const newBoard = this.board.map((arr) => {
            return arr.slice();
        });

        return new Node(newBoard, this, this.depth++);
    }

    getManhattanDistance(x: number, y: number): number {
        const [targetX, targetY] = this.findEmptyCell();
        return Math.abs(targetX - x) + Math.abs(targetY - y);
    }

    getCost(goal: Node) {
        const h = this.getManhattanDistance(...goal.findEmptyCell());
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
