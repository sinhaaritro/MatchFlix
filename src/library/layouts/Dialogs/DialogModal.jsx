import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DialogModal = ({
    isOpen,
    dialogTitle,
    dialogContentText,
    primaryActiontext,
    handlePrimaryAction,
    secondaryActionText,
    handleSecondaryAction,
    children,
}) => {
    return (
        <>
            <Dialog open={isOpen} aria-labelledby={dialogTitle}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    {secondaryActionText && (
                        <Button
                            variant="outlined"
                            onClick={handleSecondaryAction}
                            color="primary"
                        >
                            {secondaryActionText}
                        </Button>
                    )}
                    {primaryActiontext && (
                        <Button onClick={handlePrimaryAction} color="primary">
                            {primaryActiontext}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

DialogModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContentText: PropTypes.string.isRequired,
    primaryActiontext: PropTypes.string,
    handlePrimaryAction: PropTypes.func,
    secondaryActionText: PropTypes.string,
    handleSecondaryAction: PropTypes.func,
    children: PropTypes.node,
};

export default DialogModal;
