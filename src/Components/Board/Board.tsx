import React, {useEffect, useState} from "react";
import {BoardArray} from "../../types";

type BoardProps = { data: BoardArray }

const Board = ({data}: BoardProps) => {
    const [board, setBoard] = useState<BoardArray | null>(null);

    useEffect(() => {
        setBoard(data);
    }, [])


    if (board)  {
        return (
            <div className={"board"}>
                {
                    board.map((row) => {
                        row.map((val) => {
                            <p>{val}</p>
                        })
                    })
                }
            </div>
        )
    }

    return <div>cc</div>
}

export default Board;