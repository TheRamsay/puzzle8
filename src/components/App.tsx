import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import BFSSolver from "../models/BFSSolver";
import AStarSolver from "../models/AStarSolver";
import Node from "../models/Node";
import Board from "./board/Board";
import Dashboard from "./Dashboard";
import {BoardWraper, Wrapper} from "./Layout";
import {PathBuilder} from '../models/PathBuilder';
import {useReferredState} from '../hooks';
import {Button, SelectChangeEvent} from '@mui/material';
import Solver from '../models/Solver';
import EditDialog from "./EditDialog";
import Results, {ResultsProps} from "./Results";
import Steps from "./steps/Steps";

const App = () => {
    const [start, startRef, setStart] = useReferredState<Node>(new Node([
        [8, 6, 7],
        [2, 5, 4],
        [3, 0, 1]
    ], null, 0, ""));

    const [end, endRef, setEnd] = useReferredState<Node>(new Node([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ], null, -1, ""));

    const [path, pathRef, setPath] = useReferredState<PathBuilder | null>(null);
    const [results, setResults] = useState<ResultsProps | null>(null);
    const [open, setOpen] = useState(false);
    const [solvable, setSolvable] = useState(false);
    const [selectedBoardType, setSelectedBoardType] = useState<string | null>(null);
    const [selectedCell, selectedCellRef, setSelectedCell] = useReferredState<string | null>(null);
    const [algorithm, setAlgorithm] = useState<string>("astar");
    const [instance, setInstance] = useState(new Worker(process.env.PUBLIC_URL + "/worker.js"));
    const [running, setRunning] = useState(false);

    useEffect(() => {
        const handler = (ev: KeyboardEvent) => {
            if (ev.key.includes("Arrow")) {
                handleArrowNavigation(ev);
            } else {
                handleKeyPress(ev);
            }
        }

        window.addEventListener("keydown", handler)

        return () => window.removeEventListener("keydown", handler);
    }, [])

    useEffect(() => {
        instance.onmessage = (event: MessageEvent) => {
            setRunning(false);
            let {node, explored, generated, elapsedTime} = event.data;
            if (node) {
                node = Node.fromObject(node);
                const solver = algorithm === "astar" ? new AStarSolver(start, end) : new BFSSolver(start, end);

                solver.printPath(node);
                const p = new PathBuilder(solver.getPath(node));
                if (!p) {
                    throw Error("Error while creating the path");
                }

                setPath(p);
                setResults({time: elapsedTime, explored: explored, length: p.size(), generated})
                console.log("Elapsed time: " + elapsedTime + " seconds");
                console.log("Unique nodes explored: " + explored);
                console.log("Nodes generated: " + generated);
            } else {
                throw new Error("Path not found");
            }
        }
    }, [instance])


    useEffect(() => {
        setSolvable(start.isSolvable(end))
    }, [start, end])

    useEffect(() => {
        if (path) {
            document.querySelector(`#step-${path.getPointer()}`)?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [start])


    const generateStart = () => {
        const [start, end] = Solver.generateProblem();
        console.log(start);
        console.log(end);
        setStart(start);
        setEnd(end);
    }

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

    const handleArrowNavigation = (ev: KeyboardEvent) => {
        console.log(path)
        if (pathRef.current === null) {
            return;
        }

        console.log(ev);

        if (ev.key === "ArrowLeft") {
            const prevNode = pathRef.current.prev();
            const newNode = new Node(prevNode.copyBoard(), null, 0, "");
            setStart(newNode);
        } else if (ev.key === "ArrowRight") {
            const nextNode = pathRef.current.next();
            const newNode = new Node(nextNode.copyBoard(), null, 0, "");
            setStart(newNode);
        }

    }

    const handleCellSelect = (ev: MouseEvent<HTMLElement>) => {
        ev.preventDefault();
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

    const handleCellMove = (ev: MouseEvent<HTMLElement>) => {
        const target = (ev.target) as HTMLDivElement;

        const [_x, _y, boardType] = target.id.split("-");
        const board = boardType === "start" ? start.copyNode() : end.copyNode();

        const newX = Number(_x);
        const newY = Number(_y);

        if (!board.getChildren(...board.find(0)).some(([ox, oy, dir]) => {
            return newX === ox && newY === oy;
        })) {
            return;
        }

        const [x, y] = board.find(0);

        board.setValue(x, y, board.getValue(newX, newY));
        board.setValue(newX, newY, 0);

        const dispatcher = boardType === "start" ? setStart : setEnd;
        dispatcher(board)


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

        setRunning(true);
        instance.postMessage({start, end, algorithm})
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

    }

    const handleStepSelect = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!path) {
            return;
        }

        const newPointer = Number((ev.currentTarget as HTMLDivElement).id.split("-")[1]);
        path.setPointer(newPointer);
        const currentNode = path.getCurrent();
        setStart(new Node(currentNode.copyBoard(), null, 0, ""));
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

    const openEditDialog = (ev: MouseEvent<HTMLElement>) => {
        setOpen(true);
        if ((ev.target as HTMLElement).id.includes("start")) {
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
        if (input.length !== 9 || [...input].some((val) => isNaN(+val)) || !Node.isValid(input)) {
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

    const handleStop = () => {
        instance.terminate();
        setInstance(new Worker("/worker.js"));
        console.log("Stopped");
    }


    return (
        <div className="App">
            <Wrapper>
                <div className={"boards"}>
                    <BoardWraper title={"start"} openDialog={openEditDialog}>
                        <Board
                            boardType={"start"}
                            data={start.board}
                            cellMoveHandler={handleCellMove}
                            cellSelectHandler={handleCellSelect}/>
                    </BoardWraper>
                    <BoardWraper title={"end"} openDialog={openEditDialog}>
                        <Board
                            boardType={"end"}
                            data={end.board}
                            cellMoveHandler={handleCellMove}
                            cellSelectHandler={handleCellSelect}/>
                    </BoardWraper>
                </div>
                <Dashboard
                    handleSolve={solveBoard}
                    handleStop={handleStop}
                    generate={generateStart}
                    handleAlgoSelect={handleAlgorithmSelection}
                    solvable={solvable}
                    executionTime={results ? results.time : 0}
                    explored={results ? results.explored : 0}
                    generated={results ? results.generated : 0}
                    pathLength={results ? results.length - 1 : 0}
                    running={running}
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
