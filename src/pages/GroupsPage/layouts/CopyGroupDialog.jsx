import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const CopyGroupDialog = ({ isOpen, inputText, handleSecondaryAction }) => {
    return (
        <>
            <Dialog open={isOpen} aria-labelledby="create group dialog">
                <DialogTitle>Group Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Give this link to your friend, to join the group you
                        created.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        id="name"
                        label="Group Link"
                        type="text"
                        value={inputText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleSecondaryAction}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

CopyGroupDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    inputText: PropTypes.string,
    handleSecondaryAction: PropTypes.func,
};

export default CopyGroupDialog;
