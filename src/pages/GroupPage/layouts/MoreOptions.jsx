import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import DialogModal from "library/layouts/Dialogs/DialogModal";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";
import { useGroupContext } from "library/provider/Groups/GroupProvider";

const MoreOptions = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverClick = (event) => setAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const popoverOpen = open ? "simple-popover" : undefined;

    const { groupState, removeUserFromGroupData, renameGroupName } =
        useGroupContext();

    const { id } = useParams();
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
    const openRenameDialogOpen = () => setIsRenameDialogOpen(true);
    const closeRenameDialogOpen = () => setIsRenameDialogOpen(false);
    const [inputText, setInputText] = useState(groupState.selectedGroupName);
    const textChange = (e) => setInputText(e.target.value);
    const renameGroup = async () => {
        openRenameDialogOpen();
        renameGroupName({ newGroupName: inputText });
        closeRenameDialogOpen();
    };

    const [isInviteLinkDialogOpen, setIsInviteLinkDialogOpen] = useState(false);
    const openInviteLinkDialog = () => setIsInviteLinkDialogOpen(true);
    const closeInviteLinkDialog = () => setIsInviteLinkDialogOpen(false);

    const { removeGroup } = useAuthContext();

    const history = useHistory();

    const openGroupConfigurationPage = () => {
        history.push(`/group-configuration/${id}`);
    };

    const leaveGroup = () => {
        removeGroup({ groupCode: id });
        removeUserFromGroupData();
        history.goBack();
    };

    return (
        <>
            <IconButton
                aria-describedby={popoverOpen}
                onClick={handlePopoverClick}
            >
                <MoreVertRoundedIcon />
            </IconButton>
            <Popover
                id={popoverOpen}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <List component="nav" aria-label="more action items">
                    <ListItem button onClick={openRenameDialogOpen}>
                        <ListItemText primary="Rename Group" />
                    </ListItem>
                    <ListItem button onClick={openInviteLinkDialog}>
                        <ListItemText primary="Invite Link" />
                    </ListItem>
                    <ListItem button onClick={openGroupConfigurationPage}>
                        <ListItemText primary="Group Settings" />
                    </ListItem>
                    <ListItem button onClick={leaveGroup}>
                        <ListItemText primary="Leave Group" />
                    </ListItem>
                </List>
            </Popover>
            <DialogModal
                isOpen={isRenameDialogOpen}
                dialogTitle="New Group Name"
                dialogContentText="Give your group a new interesing name."
                primaryActiontext="Rename"
                handlePrimaryAction={renameGroup}
                secondaryActionText="Cancel"
                handleSecondaryAction={closeRenameDialogOpen}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    label="New Group Name"
                    type="text"
                    value={inputText}
                    onChange={textChange}
                />
            </DialogModal>
            <DialogModal
                isOpen={isInviteLinkDialogOpen}
                dialogTitle="Invite Link"
                dialogContentText="Give this link to your friend, to join the group you
                        created."
                secondaryActionText="Close"
                handleSecondaryAction={closeInviteLinkDialog}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="name"
                    label="Group Link"
                    type="text"
                    value={id}
                />
            </DialogModal>
        </>
    );
};

MoreOptions.propTypes = {};

export default MoreOptions;
