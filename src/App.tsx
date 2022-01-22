import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './types';

const App = () => {
    useEffect(() => {
        console.log("Starting compute");
        // console.log(compareBoards(start, end));
        // compute(start, start, 0);
    });

    const start = [
        [0, 1, 3],
        [2, null, 6],
        [9, 7, 8]
    ]
    const width = start[0].length;
    const height = start.length;

    const end = [
        [0, 1, 3],
        [2, null, 6],
        [9, 7, 8]
    ]

    useEffect(() => {
        compareBoards(start, end);
    })

    // const compute = (board: Board, goal: Board, steps: number) => {
    //     console.log("Call");
    //     console.log(steps);
    //
    //     const offsets = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    //
    //     if (compareBoards(board, goal)) {
    //         console.log(steps)
    //         console.log("Doneee")
    //         return;
    //     }
    //
    //     if (steps === 10) {
    //         return;
    //     }
    //
    //
    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; j < board[0].length; j++) {
    //             offsets.forEach(([x, y]) => {
    //
    //                 const newX = j + x;
    //                 const newY = i + y;
    //                 console.log(`x: ${newX} y: ${newY}`);
    //
    //                 if (newX < 0 || newX > width || newY < 0 || newY > height) {
    //                     return;
    //                 }
    //
    //                 if (board[newX][newY] == null) {
    //                     const newBoard = deepCopyBoard(board);
    //                     newBoard[newX][newY] = board[i][j];
    //                     newBoard[i][j] = null;
    //                     compute(newBoard, goal, steps++);
    //                 }
    //             })
    //         }
    //     }
    //
    // }

    const compareBoards = (b1: Board, b2: Board): boolean => {
        console.log("jajajajaj");
        let same = true;
        for (let i = 0; i < b1.length; i++) {
            for (let j = 0; i < b1[0].length; j++) {
                if (b1[i][j] !== b2[i][j]) {
                    return false;
                }
            }
        }
        return same;
    }
    //
    // const deepCopyBoard = (board: Board): Board => {
    //     const newBoard: Board = [];
    //     board.forEach((row) => {
    //         const temp: Array<number | null> = [];
    //         row.forEach((value) => {
    //             temp.push(value)
    //         });
    //         newBoard.push(temp);
    //     });
    //
    //     return newBoard;
    // }


    return (
        <div className="App">
        </div>
    );
}

export default App;
