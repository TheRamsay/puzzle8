import React from "react";

type WrapperProps = { children: Array<JSX.Element> };

export const Wrapper = ({children}: WrapperProps) => {
    return (
        <div className={"wrapper"}>
            {children}
        </div>
    )
}

type BoardWrapperProps = { title: string };

export const BoardWraper: React.FC<BoardWrapperProps> = ({children, title}) => {

    return (
        <div className={"board-wrapper"}>
            <h3>{title}</h3>
            {children}
        </div>
    )

}
