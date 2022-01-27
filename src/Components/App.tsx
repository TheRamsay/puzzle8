import React, {useEffect, useState} from 'react';
import './App.css';
import BFSSolver from "../models/BFSSolver";
import AStartSolver from "../models/AStarSolver";
import Node from "../models/Node";
import Board from "./board/Board";
import {BoardArray} from "../types";
import {getHashes} from "crypto";
import Dashboard from "./Dashboard";
import {Wrapper} from "./Layout";

const App = () => {
    const [start, setStart] = useState<Node>(new Node([
        [0, 1, 2],
        [8, 6, 4],
        [7, 5, 3]
    ], null, 0));

    const [end, setEnd] = useState<Node>(new Node([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ], null, -1));

    const [selectedCell, setSelectedCell] = useState();

    const handleSelect = (ev: React.MouseEvent<HTMLElement>) => {
        console.log(ev.target);
    }

    const solveBoard = () => {
        const solver = new BFSSolver(start, end);
        const [node, steps] = solver.solve();

        if (node) {
            solver.printPath(node);
            console.log("Unique nodes explored: " + steps);
        } else {
            throw new Error("Path not found");
        }
    }



    return (
        <div className="App">
            <Wrapper>
                <Board boardType={"start"} data={start.board}/>
                <Board boardType={"end"} data={end.board} clickHandler={handleSelect()}/>
                <Dashboard />
            </Wrapper>
        </div>
    );

}


export default App;
