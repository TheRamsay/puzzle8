import React from "react";

type StepProps = { id: number, direction: string, current: boolean, handleClick: (ev: React.MouseEvent<HTMLDivElement>) => void };

const Step: React.FC<StepProps> = ({id, direction, current, handleClick}) => {
    return (
        <div id={`step-${id}`} className={current ? "step current-step" : "step"} onClick={handleClick}>
            <p>{id}</p>
            <p>{direction}</p>
        </div>
    )
}

export default Step;