import Node from "./Node";
import Solver from "./Solver";

export default class BFSSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number] {
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
                console.log(`Open queue length is ${queue.length}`);
                return [node, visited.size];
            }

            const [x, y] = node.find(0);
            node.getChildren(x, y).forEach(([ox, oy]) => {
                const newNode = node.createChild();
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (visited.has(newNode.toString())) {
                    return;
                }

                queue.push(newNode);
            })

        }

        return [null, -1];
    }
}
