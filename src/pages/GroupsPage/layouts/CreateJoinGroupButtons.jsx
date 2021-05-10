import React, { useState } from "react";
// import PropTypes from "prop-types";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import theme from "config/theme/theme";
import Fab from "@material-ui/core/Fab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CreateGroupDialog from "./CreateGroupDialog";
import CopyGroupDialog from "./CopyGroupDialog";
import JoinGroupDialog from "./JoinGroupDialog";
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
        //const groupID = await joinGroup({ groupName: inputText });
    };

    return (
        <>
            <CreateGroupDialog
                isOpen={isCreateDialogOpen}
                inputText={inputText}
                textChange={textChange}
                handlePrimaryAction={createNewGroup}
                handleSecondaryAction={closeCreateDialogOpen}
            />
            <CopyGroupDialog
                isOpen={isCopyDialogOpen}
                inputText={inputText}
                textChange={textChange}
                handleSecondaryAction={closeCopyDialogOpen}
            />
            <JoinGroupDialog
                isOpen={isJoinDialogOpen}
                inputText={inputText}
                textChange={textChange}
                handlePrimaryAction={createJoinGroup}
                handleSecondaryAction={closeJoinDialogOpen}
            />
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
