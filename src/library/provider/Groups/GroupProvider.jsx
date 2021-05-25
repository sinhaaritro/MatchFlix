import React, { useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import reducer from "./GroupReducer";
import * as GroupConstants from "./GroupConstant";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";
import {
    getGroupData,
    removeGroupData,
    updateFirestoreGroupData,
    deleteGroupData,
} from "library/utilities/firebaseFirestore";

const GroupContext = React.createContext(null);

const GroupProvider = ({ children }) => {
    const { authState } = useAuthContext();
    const [groupState, groupDispatch] = useReducer(
        reducer,
        GroupConstants.Initial_State
    );

    const selectNoGroup = () => {
        groupDispatch({ type: GroupConstants.ACTIONS.NO_GROUP_SELECTED });
    };

    const setLoading = () => {
        groupDispatch({ type: GroupConstants.ACTIONS.LOADING });
    };

    const setError = (error) => {
        console.log(error);
        groupDispatch({ type: GroupConstants.ACTIONS.ERROR });
    };

    const getSelectedGroupDetails = useCallback(async ({ groupId }) => {
        setLoading();
        try {
            const groupDetails = await getGroupData({
                documentID: groupId,
            });

            groupDispatch({
                type: GroupConstants.ACTIONS.SELECTED_GROUP,
                payload: { selectedGroupID: groupId, ...groupDetails },
            });
        } catch (error) {
            setError(error);
        }
    }, []);

    const removeUserFromGroupData = async () => {
        setLoading();
        try {
            const userList = groupState.userList.filter(
                (user) => user.userID !== authState.currentUser.uid
            );
            if (userList.length === 0)
                return deleteGroupData({
                    documentID: groupState.selectedGroupID,
                });

            await removeGroupData({
                documentID: groupState.selectedGroupID,
                data: {
                    userID: authState.currentUser.uid,
                    userName: authState.userProfile.username,
                },
            });
            selectNoGroup();
        } catch (error) {
            setError(error);
        }
    };

    const renameGroupName = async ({ newGroupName }) =>
        // Rename group from group document
        // Rename group in each user
        await updateGroupData({
            dataName: "name",
            newDataValue: newGroupName,
        });

    const updateGroupData = async ({ dataName, newDataValue }) => {
        setLoading();
        try {
            const data = { [dataName]: newDataValue };
            await updateFirestoreGroupData({
                documentID: groupState.selectedGroupID,
                data: data,
            });
            groupDispatch({
                type: GroupConstants.ACTIONS.SELECTED_GROUP,
                payload: { ...groupState, ...data },
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <GroupContext.Provider
            value={{
                groupState,
                getSelectedGroupDetails,
                selectNoGroup,
                removeUserFromGroupData,
                renameGroupName,
                updateGroupData,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

GroupProvider.propTypes = {
    children: PropTypes.node,
};

const useGroupContext = () => {
    return useContext(GroupContext);
};

export { GroupProvider, useGroupContext };
