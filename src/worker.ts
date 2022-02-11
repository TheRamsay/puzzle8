import BFSSolver from "./models/BFSSolver";
import AStarSolver from "./models/AStarSolver";
import Node from "./models/Node";

self.onmessage = (message) => {
    let {data: {start, end, algorithm}} = message;

    const solverClass = algorithm === "astar" ? AStarSolver : BFSSolver;

    start = Node.fromObject(start);
    end = Node.fromObject(end);

    const startTime = Date.now();
    const solver = new solverClass(start, end);
    const [node, explored] = solver.solve();
    const elapsedTime = (Date.now() - startTime) / 1000;
    postMessage({node, explored, elapsedTime});
};