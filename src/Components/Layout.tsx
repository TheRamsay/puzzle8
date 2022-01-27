import React from "react";

type WrapperProps = { children: Array<JSX.Element> };

export const Wrapper = ({children}: WrapperProps) => {
    return (
        <div className={"wrapper"}>
            {children}
        </div>
    )
}

