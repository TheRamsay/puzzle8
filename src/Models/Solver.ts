import { Node } from "./Node";

export default abstract class AStartSolver {

    start: Node;
    end: Node;

    constructor(start: Node, end: Node) {
        this.start = start;
        this.end = end;
    }

    abstract solve(): void

    printPath(end: Node) {
        let node = end;
        let count = 1;
        while (node.parent !== null) {
            console.log(JSON.stringify(node.board));
            node = node.parent;
            count++;
        }
        console.log(JSON.stringify(node.board));
        console.log(`Length of path is ${count}`);
    }
}
