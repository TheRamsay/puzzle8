import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './types';
import { BFSSolver } from "./BFSSolver";
import { Node } from "./Node";

const App = () => {
    useEffect(() => {
        const start = new Node([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ], null);

        const end = new Node([
            [1, 2, 3],
            [4, 5, 6],
            [0, 7, 8]
        ], null);

        const solver = new BFSSolver(start, end);
        const [node, steps] = solver.solve();

        if (node) {
            solver.printPath(node);
            console.log("Unique nodes explored: " + steps);
        } else {
            throw new Error("Path not found");
        }

    })

    return (
        <div className="App">
        </div>
    );
}

export default App;
