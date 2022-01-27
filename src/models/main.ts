import Node from "./Node";
import AStartSolver from "./AStarSolver";
import BFSSearch from "./BFSSolver";

const start = new Node([
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8]
], null, 0);

const end = new Node([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
], null, -1);

if (start) {
    const solver = new AStartSolver(start, end);
    const [node, steps] = solver.solve();

    if (node) {
        solver.printPath(node);
        console.log("Unique nodes explored: " + steps);
    } else {
        throw new Error("Path not found");
    }
}
