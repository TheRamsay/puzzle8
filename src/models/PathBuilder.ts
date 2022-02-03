import Node from "./Node";

export class PathBuilder {

    path: Array<Node>;
    pointer: number;

    constructor(path: Array<Node>) {
        this.path = path;
        this.pointer = 0;
    }

    next(): Node {
        this.pointer++;

        if (this.pointer >= this.path.length) {
            this.pointer--;
            throw new Error("Path out of range");
        }

        return this.path[this.pointer];
    }

    prev(): Node {
        this.pointer--;

        if (this.pointer < 0) {
            this.pointer++;
            throw new Error("Path out of range");
        }
        return this.path[this.pointer];
    }

    size(): number {
        return this.path.length;
    }
}
