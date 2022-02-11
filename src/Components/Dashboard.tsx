import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React, {PointerEvent, ChangeEvent, useState} from "react";
import {BoxWrapper} from "./Layout";

type DashboardProps = {
    handleSolve: () => void,
    handleStop: () => void,
    handleAlgoSelect: (event: SelectChangeEvent<unknown>) => void,
    solvable: boolean,
    explored: number,
    pathLength: number,
    executionTime: number,
};

const Dashboard: React.FC<DashboardProps> = ({
                                                 handleSolve,
                                                 handleStop,
                                                 handleAlgoSelect,
                                                 solvable,
                                                 executionTime,
                                                 pathLength,
                                                 explored
                                             }) => {

    const [value, setValue] = useState("astar");

    const handleChange = (ev: SelectChangeEvent<unknown>) => {
        setValue((ev.target as HTMLSelectElement).value);
    }

    return (
        <div className={"dashboard-wrapper"}>
            <BoxWrapper>
                <div className={"dashboard"}>

                    <div className={"dashboard-box"}>
                        <p>algorithm: </p>
                        <Select
                            label="Age"
                            onChange={(ev) => {
                                handleAlgoSelect(ev);
                                handleChange(ev)
                            }}
                            value={value}
                            color={"secondary"}
                            sx={{"background-color": "#282C34", color: "#979494"}}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: "#282C34",
                                        '& .MuiMenuItem-root': {
                                            padding: 2,
                                        },
                                        "*": {
                                            outline: "none",
                                            border: "none",
                                        }

                                    },
                                },
                            }}
                        >
                            <MenuItem value={"bfs"}>BFS</MenuItem>
                            <MenuItem value={"astar"}>A*</MenuItem>
                        </Select>
                    </div>
                    <div className={"dashboard-box"}>
                        <p>nodes explored: </p>
                        <p> {explored + " nodes"}</p>
                    </div>
                    <div className={"dashboard-box"}>
                        <p>is solvable: </p>
                        <p className={solvable ? "solvable" : "unsolvable"}> {solvable + ""}</p>
                    </div>
                    <div className={"dashboard-box"}>
                        <p>path length: </p>
                        <p> {pathLength + " nodes"}</p>
                    </div>
                    <div className={"dashboard-btn"}>
                        <Button variant="contained" onClick={handleSolve}>solve</Button>
                        <Button variant="contained" onClick={handleStop}>stop</Button>
                    </div>
                    <div className={"dashboard-box"}>
                        <p>execution time: </p>
                        <p> {executionTime + " seconds"}</p>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

export default Dashboard
