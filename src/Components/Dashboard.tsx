import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { PointerEvent, ChangeEvent} from "react";

type DashboardProps = { handleSolve: () => void, goBackward: () => void, goForward: () => void, handleAlgoSelect: (event: SelectChangeEvent<unknown>) => void };

const Dashboard: React.FC<DashboardProps> = ({ handleSolve, goBackward, goForward, handleAlgoSelect}) => {

    return (
        <div className={"dashboard"}>
            <div>
                <p>Algorithm</p>
                <Select
                    label="Age"
                    onChange={handleAlgoSelect}
                >
                    <MenuItem value={"bfs"}>BFS</MenuItem>
                    <MenuItem value={"astar"}>A*</MenuItem>
                </Select>
            </div>
            <Button variant="contained" onClick={handleSolve}>start</Button>
            <Button variant="contained" onClick={goBackward}> {"<<"}</Button>
            <Button variant="contained" onClick={goForward}>{">>"}</Button>
        </div>
    )
}

export default Dashboard
