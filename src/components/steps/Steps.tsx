import React from "react";
import {BoxWrapper} from "../Layout";
import {Button} from "@mui/material";
import Step from "./Step";
import "./Steps.css"
import {PathBuilder} from "../../models/PathBuilder";

type StepsProps = { path: PathBuilder | null, handleWalk(direction: string): void, handleSelect(ev: React.MouseEvent<HTMLDivElement>): void };

const Steps: React.FC<StepsProps> = ({path, handleWalk, handleSelect}) => {

    return (
        <div className={"steps"}>
            <BoxWrapper>
                <h2>STEPS</h2>
                <div className={"steps-list-wrapper"}>
                    <div className={"steps-list"}>
                        {path ?
                            path.getPath().map((node, idx) => {
                                return <Step
                                    key={idx}
                                    current={path.getPointer() === idx}
                                    id={idx}
                                    direction={node.direction}
                                    handleClick={handleSelect}
                                />
                            }) : ""
                        }
                    </div>
                </div>
                <div className={"controls"}>
                    <Button id="step-back" onClick={() => handleWalk("backward")}>{"<<"}</Button>
                    <Button id="step-forward" onClick={() => handleWalk("forward")}>{">>"}</Button>
                </div>
            </BoxWrapper>
        </div>
    )

}

export default Steps;
