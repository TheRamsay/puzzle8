import React, { MouseEvent } from "react";

type CellProps = { value: number, onClick: (ev: MouseEvent<HTMLElement>) => void, id: string };

const Cell: React.FC<CellProps> = ({ value, onClick, id }) => {

    return (
        <div className={"cell-wrapper"}>
            <div id={id} className={"cell"} onClick={onClick}>
                {value !== 0 ? value : ""}
            </div>
        </div>

    )
}

export default Cell;
