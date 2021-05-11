import React, { useState } from "react";
// import PropTypes from "prop-types";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import theme from "config/theme/theme";
import Fab from "@material-ui/core/Fab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import TextField from "@material-ui/core/TextField";
import DialogModal from "library/layouts/Dialogs/DialogModal";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const CreateJoinGroupButtons = (props) => {
    const { createGroup, joinGroup } = useAuthContext();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [inputText, setInputText] = useState("");

    const openCreateDialogOpen = () => setIsCreateDialogOpen(true);
    const closeCreateDialogOpen = () => setIsCreateDialogOpen(false);

    const openCopyDialogOpen = () => setIsCopyDialogOpen(true);
    const closeCopyDialogOpen = () => {
        setIsCopyDialogOpen(false);
        setInputText("");
    };

    const openJoinDialogOpen = () => setIsJoinDialogOpen(true);
    const closeJoinDialogOpen = () => setIsJoinDialogOpen(false);

    const textChange = (e) => setInputText(e.target.value);

    const createNewGroup = async () => {
        closeCreateDialogOpen();
        const groupID = await createGroup({ groupName: inputText });
        setInputText(groupID);
        openCopyDialogOpen();
    };

    const createJoinGroup = async () => {
        closeJoinDialogOpen();
        await joinGroup({ groupCode: inputText });
        setInputText("");
    };

    return (
        <>
            <DialogModal
                isOpen={isCreateDialogOpen}
                dialogTitle="Create New Group"
                dialogContentText="Create a group to add your friends for movie selecting."
                primaryActiontext="Create"
                handlePrimaryAction={createNewGroup}
                secondaryActionText="Cancel"
                handleSecondaryAction={closeCreateDialogOpen}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    label="Group Name"
                    type="text"
                    value={inputText}
                    onChange={textChange}
                />
            </DialogModal>
            <DialogModal
                isOpen={isCopyDialogOpen}
                dialogTitle="Group Link"
                dialogContentText="Give this link to your friend, to join the group you
                        created."
                secondaryActionText="Close"
                handleSecondaryAction={closeCopyDialogOpen}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    label="Group Link"
                    type="text"
                    value={inputText}
                />
            </DialogModal>
            <DialogModal
                isOpen={isJoinDialogOpen}
                dialogTitle="Enter Group Code"
                dialogContentText="Add group code from your friends, to join the group."
                primaryActiontext="Join"
                handlePrimaryAction={createJoinGroup}
                secondaryActionText="Cancel"
                handleSecondaryAction={closeJoinDialogOpen}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    label="Group Name"
                    type="text"
                    value={inputText}
                    onChange={textChange}
                />
            </DialogModal>
            <Fab
                size="medium"
                aria-label="create group"
                onClick={openCreateDialogOpen}
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
                onClick={openJoinDialogOpen}
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
