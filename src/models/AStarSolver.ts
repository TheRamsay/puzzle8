import Node from "./Node";
import Solver from "./Solver";

export default class AStartSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number] {
        let queue: Array<Node> = [];
        queue.push(this.start);
        const closed: Set<string> = new Set();

        while (queue.length !== 0) {
            const node = this.getLowestCost(queue);
            // queue = this.removeFromOpenSet(node, queue);
            console.log(`Picking from open set: ${queue}`);
            console.log(`Node with lowest cost: ${node} \n cost: ${node.getCost(this.end)}`)

            if (node.isSame(this.end)) {
                console.log("Found goal, exiting")
                return [node, closed.size];
            }

            const [x, y] = node.findEmptyCell();
            node.getChildren(x, y).forEach(([ox, oy]) => {
                const newNode = node.createChild();
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (closed.has(newNode.toString())) {
                    return;
                }

                queue.push(newNode);
                console.log(`Pushing new node: ${newNode}`);
            })

            closed.add(node.toString());
            this.removeFromOpenSet(node, queue);

        }

        return [null, -1];
    }

    getLowestCost(arr: Array<Node>): Node {
        let lowest: Node | null = null

        arr.forEach((element) => {
            if (lowest === null) {
                lowest = element;
            }
            if (element.getCost(this.end) < lowest.getCost(this.end)) {
                lowest = element;
            }
        })

        if (lowest) {
            return lowest;
        }

        throw new Error("Couldn't find lowest element");
    }

    removeFromOpenSet(node: Node, open: Array<Node>) {
        return open.filter((element: Node) => element !== node);
    }
}
