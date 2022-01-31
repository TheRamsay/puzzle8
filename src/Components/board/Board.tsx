import React, { useEffect, useState, KeyboardEvent } from "react";
import { BoardArray } from "../../types";
import Cell from "./Cell";

type BoardProps = { boardType: "start" | "end", data: BoardArray, clickHandler: (ev: React.MouseEvent<HTMLElement>) => void, }

const Board: React.FC<BoardProps> = ({ boardType, data, clickHandler }) => {
    if (data) {
        return (
            <div className={"board"} >
                {
                    data.map((row, y) => {
                        return row.map((val, x) => {
                            if (val !== null) {
                                return <Cell
                                    onClick={clickHandler}
                                    key={`${x}-${y}-${boardType}`}
                                    id={`${x}-${y}-${boardType}`}
                                    value={val}
                                />;
                            }
                        })
                    })
                }
            </div>
        )
    }

    return <div>cc</div>
}

export default Board;
