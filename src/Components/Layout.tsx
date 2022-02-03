import React, {MouseEventHandler} from "react";
import {Button} from "@mui/material";

type WrapperProps = { children: Array<JSX.Element> };

export const Wrapper = ({children}: WrapperProps) => {
    return (
        <div className={"wrapper"}>
            {children}
        </div>
    )
}

type BoardWrapperProps = { title: string, openDialog: (ev: React.MouseEvent<HTMLButtonElement>) => void};

export const BoardWraper: React.FC<BoardWrapperProps> = ({children, title, openDialog }) => {

    return (
        <div className={"board-wrapper"}>
            <div className={"board-header"}>
                <h3>{title}</h3>
                <Button id={`edit-${title}`} onClick={openDialog}>edit</Button>
            </div>
            {children}
        </div>
    )

}
