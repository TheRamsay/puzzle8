import React, {useEffect, useState} from 'react';
import './App.css';
import BFSSolver from "../Models/BFSSolver";
import AStartSolver from "../Models/AStarSolver";
import {Node} from "../Models/Node";
import Board from "./Board/Board";
import {BoardArray} from "../types";

const App = () => {
    // const [start, setStart] = useState<Node| null>(null);

    useEffect(() => {
        const start = new Node([
            [6, 4, 1],
            [7, 0, 2],
            [5,3, 8]
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

    })

    // if (start) {
    //     return (
    //         <div className="App">
    //             <Board data={start.board}/>
    //         </div>
    //     );
    // }

    return <div>gg</div>
}


export default App;
