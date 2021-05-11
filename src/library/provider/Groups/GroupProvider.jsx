import React, { useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import reducer from "./GroupReducer";
import * as GroupConstants from "./GroupConstant";
// import { useAuthContext } from "library/provider/Authentication/AuthProvider";
import {
    getGroupData,
    updateGroupData,
    deleteGroupData,
} from "library/api/firebaseFirestore";

const GroupContext = React.createContext(null);

const GroupProvider = ({ children }) => {
    // const { authState } = useAuthContext();
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
                payload: {
                    selectedGroupID: groupId,
                    selectedGroupName: groupDetails.groupName,
                    selectedGroupUserList: groupDetails.userSelectedCard,
                    selectedGroupAllCards: groupDetails.allCard,
                    selectedGroupSelectedCards: groupDetails.selectedCard,
                },
            });
        } catch (error) {
            setError(error);
        }
    }, []);

    const removeUserFromGroupData = async ({ groupId, userID }) => {
        setLoading();
        try {
            const userSelectedCard = groupState.selectedGroupUserList.filter(
                (user) => user.userID !== userID
            );
            if (userSelectedCard.length === 0)
                return deleteGroupData({ documentID: groupId });

            const data = {
                groupName: groupState.selectedGroupName,
                allCard: groupState.selectedGroupAllCards,
                selectedCard: groupState.selectedGroupSelectedCards,
                userSelectedCard,
            };

            await updateGroupData({ documentID: groupId, data: data });
            selectNoGroup();
        } catch (error) {
            setError(error);
        }
    };

    const renameGroupName = async ({ groupId, newGroupName }) => {
        setLoading();
        try {
            const data = {
                groupName: newGroupName,
                allCard: groupState.selectedGroupAllCards,
                selectedCard: groupState.selectedGroupSelectedCards,
                userSelectedCard: groupState.selectedGroupUserList,
            };
            await updateGroupData({ documentID: groupId, data: data });
            groupDispatch({
                type: GroupConstants.ACTIONS.SELECTED_GROUP,
                payload: {
                    ...groupState,
                    selectedGroupName: newGroupName,
                },
            });
        } catch (error) {
            setError();
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
