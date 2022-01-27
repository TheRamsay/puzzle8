import React from "react";

type CellProps = { value: number };

const Cell = ({value}: CellProps) => {

    if (value === 0) {
        return (
            <div className={"cell"}>
            </div>
        )
    }
    return (
        <div className={"cell"}>
            {value}
        </div>
    )
}

export default Cell;