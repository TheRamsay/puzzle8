import Node from "./Node";
import Solver from "./Solver";

export default class DFSSolver extends Solver {

    constructor(start: Node, end: Node) {
        super(start, end);
    }

    solve(): [Node | null, number] {
        return this.dfs(this.start, this.end, new Set());
    }

    dfs(node: Node, goal: Node, visited: Set<string>): [Node | null, number] {
        console.log(node);
        visited.add(node.toString());

        if (node.isSame(goal)) {
            console.log("GOool")
            return [node, visited.size];
        }

        const [x, y] = node.find(0);

        for (const [ox, oy] of node.getChildren(x, y)) {
            const newNode = node.createChild();
            newNode.setValue(x, y, node.getValue(ox, oy));
            newNode.setValue(ox, oy, 0);

            if (visited.has(newNode.toString())) {
                continue;
            }

            const ans = this.dfs(newNode, goal, visited);
            if (ans[1] !== -1) {
                return ans
            }
        }


        return [null, -1];

    }

}
