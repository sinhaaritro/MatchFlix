import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateJoinDialog = ({
    isOpen,
    dialogTitle,
    dialogContentText,
    secondaryAction,
    primaryAction,
    handlePrimaryAction,
    handleSecondaryAction,
    children,
}) => {
    return (
        <>
            <Dialog open={isOpen} aria-labelledby="create group dialog">
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleSecondaryAction}
                        color="primary"
                    >
                        {secondaryAction}
                    </Button>
                    <Button onClick={handlePrimaryAction} color="primary">
                        {primaryAction}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

CreateJoinDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContentText: PropTypes.string.isRequired,
    secondaryAction: PropTypes.string,
    primaryAction: PropTypes.string,
    handlePrimaryAction: PropTypes.func,
    handleSecondaryAction: PropTypes.func,
    children: PropTypes.node,
};

export default CreateJoinDialog;
