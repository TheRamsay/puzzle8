import React, {useEffect, useState} from "react";
import {BoardArray} from "../../types";
import Cell from "./Cell";

type BoardProps = { boardType: "start" | "end", data: BoardArray, clickHandler: }

const Board = ({boardType, data}: BoardProps) => {
    const [board, setBoard] = useState<BoardArray | null>(null);

    useEffect(() => {
        setBoard(data);
    }, [])


    if (board) {
        return (
            <div className={"board-wrapper"}>
                <div className={"board"}>
                    {
                        board.map((row, y) => {
                            return row.map((val, x) => {
                                if (val !== null) {
                                    return <Cell
                                        key={`${x}-${y}-${boardType}`}
                                        value={val}
                                    />;
                                }
                            })
                        })
                    }
                </div>
            </div>
        )
    }

    return <div>cc</div>
}

export default Board;