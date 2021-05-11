import React, { useState } from "react";
// import PropTypes from "prop-types";
import {
    // Route,
    // Redirect,
    // Link,
    useParams,
    useHistory,
} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import CreateGroupDialog from "library/layouts/Dialogs/CreateGroupDialog";
import CopyGroupDialog from "library/layouts/Dialogs/CopyGroupDialog";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";
import { useGroupContext } from "library/provider/Groups/GroupProvider";

const MoreOptions = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const popoverOpen = open ? "simple-popover" : undefined;

    const { groupState, removeUserFromGroupData, renameGroupName } =
        useGroupContext();

    const { id } = useParams();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const openCreateDialogOpen = () => setIsCreateDialogOpen(true);
    const closeCreateDialogOpen = () => setIsCreateDialogOpen(false);
    const [inputText, setInputText] = useState(groupState.selectedGroupName);
    const textChange = (e) => setInputText(e.target.value);
    const renameGroup = async () => {
        openCreateDialogOpen();
        renameGroupName({ groupId: id, newGroupName: inputText });
        closeCreateDialogOpen();
    };

    const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
    const openCopyDialogOpen = () => setIsCopyDialogOpen(true);
    const closeCopyDialogOpen = () => setIsCopyDialogOpen(false);

    const { authState, removeGroup } = useAuthContext();

    const history = useHistory();
    const leaveGroup = () => {
        removeGroup({ groupCode: id });
        removeUserFromGroupData({
            groupId: id,
            userID: authState.currentUser.uid,
        });
        history.goBack();
    };

    return (
        <>
            <IconButton aria-describedby={popoverOpen} onClick={handleClick}>
                <MoreVertRoundedIcon />
            </IconButton>
            <Popover
                id={popoverOpen}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
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
                    <ListItem button onClick={openCreateDialogOpen}>
                        <ListItemText primary="Rename Group" />
                    </ListItem>
                    <ListItem button onClick={openCopyDialogOpen}>
                        <ListItemText primary="Invite Link" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Group Settings" />
                    </ListItem>
                    <ListItem button onClick={leaveGroup}>
                        <ListItemText primary="Leave Group" />
                    </ListItem>
                </List>
            </Popover>
            <CopyGroupDialog
                isOpen={isCopyDialogOpen}
                inputText={id}
                handleSecondaryAction={closeCopyDialogOpen}
            />
            <CreateGroupDialog
                isOpen={isCreateDialogOpen}
                inputText={inputText}
                textChange={textChange}
                handlePrimaryAction={renameGroup}
                handleSecondaryAction={closeCreateDialogOpen}
            />
        </>
    );
};

MoreOptions.propTypes = {};

export default MoreOptions;
