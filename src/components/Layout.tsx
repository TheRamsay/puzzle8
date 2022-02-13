import React, { MouseEventHandler } from "react";
import { Button } from "@mui/material";

type WrapperProps = { children: Array<JSX.Element> };

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className={"wrapper"}>
            {children}
        </div>
    )
}

type BoardWrapperProps = { title: string, openDialog: (ev: React.MouseEvent<HTMLDivElement>) => void };

export const BoardWraper: React.FC<BoardWrapperProps> = ({ children, title, openDialog }) => {

    return (
        <div className={"board-wrapper"}>
            <div className={"board-header"}>
                <h2 className={`board-title`} id={`${title}-headline`} onClick={openDialog}>{title}</h2>
            </div>
            {children}
        </div>
    )

}

export const BoxWrapper: React.FC = ({ children }) => {
    return (
        <div className={"box-wrapper"}>

            {children}
        </div>
    )
}
