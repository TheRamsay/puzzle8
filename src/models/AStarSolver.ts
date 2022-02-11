import Node from "./Node";
import Solver from "./Solver";
import {PriorityQueue} from "typescript-collections";

export default class AStarSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number] {
        console.log("Solving with A*")
        const q: PriorityQueue<Node> = new PriorityQueue((a: Node, b: Node) => {
            if (a.getCost(this.end) < b.getCost(this.end)) {
                return 1;
            }
            if (a.getCost(this.end) > b.getCost(this.end)) {
                return -1;
            }

            return 0;
        });
        const closed: Set<string> = new Set();
        q.add(this.start);

        while (q.size() !== 0) {
            const node = q.dequeue();

            if (this.stop) {
                return [null, -1];
            }

            if (!node) {
                continue;
            }

            if (node.isSame(this.end)) {
                console.log("Found goal, exiting")
                return [node, closed.size];
            }

            const [x, y] = node.find(0);
            node.getChildren(x, y).forEach(([ox, oy, direction]) => {
                const newNode = node.createChild(direction);
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (closed.has(newNode.toString())) {
                    return;
                }

                q.add(newNode);
            })

            closed.add(node.toString());

        }

        return [null, -1];
    }
}
