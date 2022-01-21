import React from 'react';
import logo from './logo.svg';
import './App.css';
import { board } from './types';

const App = () => {
    const start = [
        [0, 1, 3],
        [2, null, 6],
        [9, 7, 8]
    ]
    const width = start[0].length;
    const height = start.length;

    const end = [
        [0, null, 3],
        [2, 1, 6],
        [9, 7, 8]
    ]

    const compute = (board: board, goal: board, steps: number) => {

        const offsets = [[-1, 0], [1, 0], [0, 1], [0, -1]];

        if (compareBoards(board, goal)) {
            console.log(steps)
        }


        board.forEach((row, i) => {
            row.forEach((val, j) => {
                offsets.forEach((pair) => {
                    const newX = i + pair[0];
                    const newY = j + pair[1];

                    if (board[newX][newY] == null) {

                    }

                })
            })
        })

    }

    const compareBoards = (b1: board, b2: board): boolean => {
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

    return (
        <div className="App">
        </div>
    );
}

export default App;
