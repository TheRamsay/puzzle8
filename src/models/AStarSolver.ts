import Node from "./Node";
import Solver from "./Solver";

export default class AStarSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number] {
        console.log("Solving with A*")
        let open: Map<string, Node> = new Map();
        const closed: Set<string> = new Set();
        open.set(this.start.toString(), this.start);

        while (open.size !== 0) {
            const node = this.getLowestCost(open);
            open.delete(node.toString());

            if (node.isSame(this.end)) {
                console.log("Found goal, exiting")
                return [node, closed.size];
            }

            const [x, y] = node.find(0);
            node.getChildren(x, y).forEach(([ox, oy]) => {
                const newNode = node.createChild();
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (closed.has(newNode.toString())) {
                    return;
                }

                const temp = open.get(newNode.toString())
                if (temp && temp.getCost(this.end) < newNode.getCost(this.end)) {
                    return;
                }

                open.set(newNode.toString(), newNode);
            })

            closed.add(node.toString());

        }

        return [null, -1];
    }

    getLowestCost(arr: Map<string, Node>): Node {
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
