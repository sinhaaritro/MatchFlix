import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const CreateGroupDialog = ({
    isOpen,
    inputText,
    textChange,
    handlePrimaryAction,
    handleSecondaryAction,
}) => {
    return (
        <>
            <Dialog open={isOpen} aria-labelledby="create group dialog">
                <DialogTitle>Enter Group Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add group code from your friends, to join the group.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        id="name"
                        label="Group Code"
                        type="text"
                        value={inputText}
                        onChange={textChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleSecondaryAction}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handlePrimaryAction} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

CreateGroupDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    inputText: PropTypes.string,
    textChange: PropTypes.func,
    handlePrimaryAction: PropTypes.func,
    handleSecondaryAction: PropTypes.func,
};

export default CreateGroupDialog;
