import React, { useState } from "react";
import { Dialog, DialogActions, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

type EditDialogProps = { open: boolean, handleClose: () => void, handleSave: (input: string) => void };

const EditDialog: React.FC<EditDialogProps> = ({ open, handleClose, handleSave }) => {
    const [boardInput, setBoardInput] = useState("");

    return (
        <div>
            <Dialog open={open} PaperProps={{
                style: {
                    backgroundColor: "#282C34",
                }
            }} >
                <DialogTitle>Enter board</DialogTitle>
                <DialogContent>
                    <TextField
                        InputProps={{
                            style: {
                                color: "#979494",
                                fontWeight: "bold"
                            }
                        }}
                        autoFocus
                        onChange={(ev) => setBoardInput(ev.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave(boardInput)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditDialog;
