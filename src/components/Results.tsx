import React from "react";

export type ResultsProps = { time: number, explored: number, length: number, generated: number};

const Results: React.FC<ResultsProps> = ({time, explored, length}) => {

    return (
        <div>
            <p>Total time: {time} seconds</p>
            <p>Unique nodes explored: {explored}</p>
            <p>Length of path: {length}</p>
        </div>
    )

}

export default Results;