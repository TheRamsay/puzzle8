import Node from "./Node";

export default abstract class Solver {

    start: Node;
    end: Node;

    constructor(start: Node, end: Node) {
        this.start = start;
        this.end = end;
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

}
