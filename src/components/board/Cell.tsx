import React, {MouseEvent} from "react";

type CellProps = {
    value: number,
    selectHandler: (ev: MouseEvent<HTMLElement>) => void,
    moveHandler: (ev: MouseEvent<HTMLElement>) => void,
    id: string
};

const Cell: React.FC<CellProps> = ({value, selectHandler, moveHandler, id}) => {

    return (
        <div className={"cell-wrapper"}>
            <div id={id} className={"cell"} onClick={moveHandler} onContextMenu={selectHandler}>
                {value !== 0 ? value : ""}
            </div>
        </div>

    )
}

export default Cell;
