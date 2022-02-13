import Node from "./Node";
import Solver from "./Solver";

export default class BFSSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number, number] {
        console.log("Solving with BFS");
        const queue: Array<Node> = [];
        queue.push(this.start);
        const visited: Set<string> = new Set();

        while (queue.length !== 0) {
            const node = queue.shift();

            if (!node) {
                continue;
            }

            visited.add(node.toString());

            if (node.isSame(this.end)) {
                return [node, visited.size, this.generated];
            }

            const [x, y] = node.find(0);
            node.getChildren(x, y).forEach(([ox, oy, direction]) => {
                this.generated++;
                const newNode = node.createChild(direction);
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (visited.has(newNode.toString())) {
                    return;
                }

                queue.push(newNode);
            })

        }

        return [null, -1, -1];
    }
}
