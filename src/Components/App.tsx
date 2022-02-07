import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import BFSSolver from "../models/BFSSolver";
import AStarSolver from "../models/AStarSolver";
import Node from "../models/Node";
import Board from "./board/Board";
import {BoardArray} from "../types";
import {getHashes} from "crypto";
import Dashboard from "./Dashboard";
import {BoardWraper, Wrapper} from "./Layout";
import {PathBuilder} from '../models/PathBuilder';
import {useReferredState} from '../hooks';
import {DiagnosticCategory} from 'typescript';
import {SelectChangeEvent} from '@mui/material';
import Solver from '../models/Solver';
import EditDialog from "./EditDialog";
import Results, {ResultsProps} from "./Results";
import Steps from "./steps/Steps";

const App = () => {
    const [start, startRef, setStart] = useReferredState<Node>(new Node([
        [8, 5, 6],
        [7, 2, 3],
        [4, 1, 0]
    ], null, 0, ""));

    const [end, endRef, setEnd] = useReferredState<Node>(new Node([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ], null, -1, ""));

    const [path, setPath] = useState<PathBuilder | null>(null);
    const [results, setResults] = useState<ResultsProps | null>(null);
    const [open, setOpen] = useState(false);
    const [solvable, setSolvable] = useState(false);
    const [selectedBoardType, setSelectedBoardType] = useState<string | null>(null);
    const [selectedCell, selectedCellRef, setSelectedCell] = useReferredState<string | null>(null);
    const [algorithm, setAlgorithm] = useState<string>("astar");

    // const algoMap: Map<string, BFSSolver | AStarSolver> = new Map([["bfs", BFSSolver], ["astar", AStarSolver]])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [])

    useEffect(() => {
        setSolvable(start.isSolvable(end))
    }, [start, end])

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

        const newNode = new Node(newBoard, null, depth, "");
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
        setResults(null);
        setPath(null);

        const isSolvable = start.isSolvable(end);
        console.log(`Board is solvable: ${isSolvable}`);

        if (!isSolvable) {
            console.log("Exiting");
            return;
        }

        const startTime = Date.now();
        const solver = algorithm === "astar" ? new AStarSolver(start, end) : new BFSSolver(start, end);
        const [node, explored] = solver.solve();

        if (node) {
            solver.printPath(node);
            const p = new PathBuilder(solver.getPath(node));
            console.log(node)
            console.log(solver.getPath(node));

            if (!p) {
                throw Error("Error while creating the path");
            }

            console.log(p);

            const elapsedTime = (Date.now() - startTime) / 1000;
            setResults({time: elapsedTime, explored: explored, length: p.size()})
            console.log("Elapsed time: " + elapsedTime + " seconds");
            console.log("Unique nodes explored: " + explored);
            setPath(p);
            console.log(results)
            console.log(path)

        } else {
            throw new Error("Path not found");
        }
    }

    const walkPath = (direction: string) => {
        if (!path) {
            return;
        }

        if (direction === "forward") {
            const nextNode = path.next();
            const newNode = new Node(nextNode.copyBoard(), null, 0, "");
            setStart(newNode);
        } else {
            const prevNode = path.prev();
            const newNode = new Node(prevNode.copyBoard(), null, 0, "");
            setStart(newNode);
        }

        document.querySelector(`#step-${path.getPointer()}`)?.scrollIntoView({behavior: "smooth", block: "center"});
    }

    const handleStepSelect = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!path) {
            return;
        }

        const newPointer = Number((ev.currentTarget as HTMLDivElement).id.split("-")[1]);
        path.setPointer(newPointer);
        const currentNode = path.getCurrent();
        setStart(new Node(currentNode.copyBoard(), null, 0, ""));
        document.querySelector(`#step-${path.getPointer()}`)?.scrollIntoView({behavior: "smooth", block: "center"});
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

    const openEditDialog = (ev: MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        if ((ev.target as HTMLButtonElement).id.includes("start")) {
            setSelectedBoardType("start");
        } else {
            setSelectedBoardType("end");
        }
    }
    const closeEditDialog = () => {
        setOpen(false);
        setSelectedBoardType(null);
    }
    const saveEditDialog = (input: string) => {
        setOpen(false);
        if (input.length !== 9 || [...input].some((val) => isNaN(+val))) {
            return;
        }

        if (!selectedBoardType) {
            return;
        }

        const dispatch = selectedBoardType === "start" ? setStart : setEnd;
        const depth = selectedBoardType === "start" ? 0 : -1;

        dispatch(Node.fromString(input, depth));
        setSelectedBoardType(null);

    }

    return (
        <div className="App">
            <Wrapper>
                <div className={"boards"}>
                    <BoardWraper title={"start"} openDialog={openEditDialog}>
                        <Board boardType={"start"} data={start.board} clickHandler={handleSelect}/>
                    </BoardWraper>
                    <BoardWraper title={"end"} openDialog={openEditDialog}>
                        <Board boardType={"end"} data={end.board} clickHandler={handleSelect}/>
                    </BoardWraper>
                </div>
                <Dashboard
                    handleSolve={solveBoard}
                    handleAlgoSelect={handleAlgorithmSelection}
                    solvable={solvable}
                    executionTime={results ? results.time : 0}
                    explored={results ? results.explored : 0}
                    pathLength={results ? results.length - 1 : 0}
                />
                <Steps
                    path={path}
                    handleSelect={handleStepSelect}
                    handleWalk={walkPath}/>
            </Wrapper>
            <EditDialog open={open} handleClose={closeEditDialog} handleSave={saveEditDialog}/>
        </div>
    );

}


export default App;
