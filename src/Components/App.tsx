import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import BFSSolver from "../models/BFSSolver";
import AStarSolver from "../models/AStarSolver";
import Node from "../models/Node";
import Board from "./board/Board";
import { BoardArray } from "../types";
import { getHashes } from "crypto";
import Dashboard from "./Dashboard";
import { BoardWraper, Wrapper } from "./Layout";
import { PathBuilder } from '../models/PathBuilder';
import DFSSolver from '../models/DFSSolver';
import { useReferredState } from '../hooks';
import { DiagnosticCategory } from 'typescript';
import { SelectChangeEvent } from '@mui/material';
import Solver from '../models/Solver';

const App = () => {
    const [start, startRef, setStart] = useReferredState<Node>(new Node([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ], null, 0));

    const [end, endRef, setEnd] = useReferredState<Node>(new Node([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ], null, -1));

    const [path, setPath] = useState<PathBuilder>();

    const [selectedCell, selectedCellRef, setSelectedCell] = useReferredState<string | null>(null);
    const [algorithm, setAlgorithm] = useState<string>();

    // const algoMap: Map<string, BFSSolver | AStarSolver> = new Map([["bfs", BFSSolver], ["astar", AStarSolver]])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [])

    const handleKeyPress = (ev: KeyboardEvent) => {
        const newVal = +ev.key;

        if (!selectedCellRef.current || isNaN(newVal) || newVal > 8 || newVal < 0) {
            return;
        }

        const [_x, _y, boardType] = selectedCellRef.current.split("-");
        let originalNode;
        let depth;
        let dispatcher;
        switch (boardType) {
            case "start":
                originalNode = startRef.current;
                depth = 0
                dispatcher = setStart;
                break

            case "end":
                originalNode = endRef.current;
                depth = -1;
                dispatcher = setEnd;
                break;

            default:
                throw Error("No board type selected");

        }
        const newBoard = originalNode.copyBoard();
        const [x, y] = [Number(_x), Number(_y)];

        const originalVal = originalNode.getValue(x, y);
        const [newX, newY] = originalNode.find(newVal);

        const newNode = new Node(newBoard, null, depth);
        newNode.setValue(x, y, newVal);
        newNode.setValue(newX, newY, originalVal);

        dispatcher(newNode);

    }

    const handleSelect = (ev: MouseEvent<HTMLElement>) => {
        const target = ev.target as HTMLDivElement;
        if (target.id === selectedCell) {
            target.classList.remove("selected");
            setSelectedCell(null);
        } else {
            if (selectedCell === null) {
                target.classList.add("selected");
                setSelectedCell(target.id);
            } else {
                const oldTarget = document.getElementById(selectedCell);
                oldTarget?.classList.remove("selected");
                target.classList.add("selected");
                setSelectedCell(target.id);
            }
        }
    }

    const solveBoard = () => {
        if (!algorithm) {
            return;
        }

        clearSelectedElements();
        console.log(`Board is solvable: ${start.isSolvable(end)}`);

        const startTime = Date.now();

        const solver = algorithm === "astar" ? new AStarSolver(start, end) : new BFSSolver(start, end);
        const [node, steps] = solver.solve();

        if (node) {
            solver.printPath(node);
            setPath(new PathBuilder(solver.getPath(node)));
            console.log("Unique nodes explored: " + steps);
        } else {
            throw new Error("Path not found");
        }

        console.log("Elapsed time: " + (Date.now() - startTime) / 1000 + " seconds");
    }

    const goForward = () => {
        if (path) {
            setStart(path.next());
        }
    }

    const goBackward = () => {
        if (path) {
            setStart(path.prev());
        }
    }

    const handleAlgorithmSelection = (ev: SelectChangeEvent<unknown>) => {
        setAlgorithm((ev.target as HTMLSelectElement).value);
    }

    const clearSelectedElements = () => {
        const elements = document.getElementsByClassName("selected");
        [...elements].forEach((el) => {
            el.classList.remove("selected");
        })
        setSelectedCell(null);
    }

    return (
        <div className="App">
            <Wrapper>
                <BoardWraper title={"start"}>
                    <Board boardType={"start"} data={start.board} clickHandler={handleSelect} />
                </BoardWraper>
                <BoardWraper title={"end"}>
                    <Board boardType={"end"} data={end.board} clickHandler={handleSelect} />
                </BoardWraper>
                <Dashboard handleSolve={solveBoard} goBackward={goBackward} goForward={goForward} handleAlgoSelect={handleAlgorithmSelection} />
            </Wrapper>
        </div>
    );

}


export default App;
