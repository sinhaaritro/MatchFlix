import React, { useState } from "react";
// import PropTypes from "prop-types";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import theme from "config/theme/theme";
import Fab from "@material-ui/core/Fab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import TextField from "@material-ui/core/TextField";
import CreateJoinDialog from "./CreateJoinDialog";

const initialDialogState = {
    isOpen: false,
    dialogTitle: "",
    dialogContentText: "",
    primaryAction: "",
    secondaryAction: "Cancel",
    handleSecondaryAction: null,
    children: null,
};

const CreateJoinGroupButtons = (props) => {
    const [dialog, setDialog] = useState(initialDialogState);

    const closeDialog = () => {
        setDialog(initialDialogState);
    };

    const toggleCreateGroupClick = () => {
        if (dialog.isOpen === false)
            setDialog({
                ...dialog,
                isOpen: true,
                dialogTitle: "Create New Group",
                dialogContentText:
                    "Create a group to add your friends for movie selecting.",
                primaryAction: "Create",
                secondaryAction: "Cancel",
                // handlePrimaryAction: toggleGroupClick,
                children: (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group Name"
                        type="text"
                        fullWidth
                    />
                ),
            });
    };

    const toggleJoinGroupClick = () => {
        if (dialog.isOpen === false)
            setDialog({
                ...dialog,
                isOpen: true,
                dialogTitle: "Enter Group Code",
                dialogContentText:
                    "Add group code from your friends, to join the group.",
                primaryAction: "Join",
                secondaryAction: "Cancel",
                // handlePrimaryAction: toggleGroupClick,
                children: (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group Code"
                        type="text"
                        fullWidth
                    />
                ),
            });
    };

    return (
        <>
            <CreateJoinDialog {...dialog} handleSecondaryAction={closeDialog} />
            <Fab
                size="medium"
                aria-label="create group"
                onClick={toggleCreateGroupClick}
                style={{
                    bottom: theme.spacing(20),
                    right: theme.spacing(4.5),
                }}
            >
                <AddRoundedIcon />
            </Fab>
            <Fab
                size="medium"
                aria-label="join group"
                onClick={toggleJoinGroupClick}
                style={{
                    bottom: theme.spacing(29),
                    right: theme.spacing(4.5),
                }}
            >
                <GroupRoundedIcon />
            </Fab>
        </>
    );
};

CreateJoinGroupButtons.propTypes = {};

export default CreateJoinGroupButtons;
