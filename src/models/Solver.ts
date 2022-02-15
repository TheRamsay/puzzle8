import Node from "./Node";
import {shuffleArray} from "./utils";

export default abstract class Solver {

    start: Node;
    end: Node;
    generated: number;

    constructor(start: Node, end: Node) {
        this.start = start;
        this.end = end;
        this.generated = 0;
    }

    abstract solve(): void

    printPath(end: Node) {
        let count = 0
        this.getPath(end).forEach((node) => {
            console.log(JSON.stringify(node.board));
            count++;
        })

        console.log(`Length of path is ${count - 1}`);
    }

    getPath(end: Node): Array<Node> {
        const path: Array<Node> = [];

        while (end.parent !== null) {
            path.push(end);
            end = end.parent as Node;
        }
        path.push(end);

        return path.reverse();
    }

    public static generateProblem(): Array<Node> {
        // Create random goal
        const _goalBoard = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        const goalBoard: Array<Array<number>> = [];
        let temp: Array<number> = [];
        [..._goalBoard].forEach((el: number, idx) => {
            if (idx !== 0 && idx % 3 === 0) {
                goalBoard.push(temp);
                temp = [];
            }
            temp.push(el)
        })
        goalBoard.push(temp)

        const goal = new Node(goalBoard, null, -1, "");

        let currentNode = goal;
        const n = Math.floor(Math.random() * (40 - 15) + 15);
        const buffer: Array<[number, number]> = []
        for (let i = 0; i < n; i++) {
            const [x, y] = currentNode.find(0);
            const moves = goal.getChildren(x, y);
            let idx = Math.floor(Math.random() * moves.length)
            let [ox, oy, _]: [number, number, string] = moves[idx];
            moves.splice(idx, 1);
            while (buffer.some(([bx, by]) => bx === ox && by === oy) && moves.length > 0) {
                idx = Math.floor(Math.random() * moves.length);
                [ox, oy, _] = moves[idx];
                moves.splice(idx, 1);
            }
            buffer.push([ox, oy])
            if (buffer.length > 4) {
                buffer.shift();
            }
            const _node = new Node(currentNode.copyBoard(), null, 0, "");
            _node.setValue(x, y, currentNode.getValue(ox, oy));
            _node.setValue(ox, oy, 0);
            currentNode = _node;
        }

        return [currentNode, goal];
    }

}
