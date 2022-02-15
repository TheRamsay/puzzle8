import Node from "./Node";
import BFSSolver from "./BFSSolver";
import {useReferredState} from "../hooks";

const start = new Node([
    [8, 6, 7],
    [2, 5, 4],
    [3, 0, 1]
], null, 0, "");

const end = new Node([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
], null, -1, "");

const startTime = Date.now();
const solver = new BFSSolver(start, end);
const [node, explored, generated] = solver.solve();
const elapsedTime = (Date.now() - startTime) / 1000;


// console.log(node, explored, generated);
console.log(elapsedTime);