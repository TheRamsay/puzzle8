import { Node } from "./Node";

export class BFSSolver {

    start: Node;
    end: Node;

    constructor(start: Node, end: Node) {
        this.start = start;
        this.end = end;
    }

    solve(): [Node | null, number] {
        const queue: Array<Node> = [];
        queue.push(this.start);
        const visited: Set<string> = new Set();

        while (queue.length !== 0) {
            const node = queue.shift();
            if (!node) {
                continue;
            }

            if (node.isSame(this.end)) {
                return [node, visited.size];
            }

            const [x, y] = node.findEmptyCell();
            node.getChildren(x, y).forEach(([ox, oy]) => {
                const newNode = node.createChild();
                newNode.setValue(x, y, node.getValue(ox, oy));
                newNode.setValue(ox, oy, 0);

                if (visited.has(newNode.toString())) {
                    return;
                }

                visited.add(newNode.toString());
                queue.push(newNode);
            })

        }

        return [null, -1];
    }

    printPath(end: Node) {
        let node = end;
        while (node.parent !== null) {
            console.log(JSON.stringify(node.board));
            node = node.parent;
        }
        console.log(JSON.stringify(node.board));
    }
}
