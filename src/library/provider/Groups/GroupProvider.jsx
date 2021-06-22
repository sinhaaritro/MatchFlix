import React, {
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
} from "react";
import PropTypes from "prop-types";
import reducer from "./GroupReducer";
import * as GroupConstants from "./GroupConstant";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";
import {
    addUserToGroupData,
    removeUserToGroupData,
    updateFirestoreGroupData,
    deleteGroupData,
} from "library/utilities/firebaseFirestore";
import firebase from "library/api/firebaseConfig";

const GroupContext = React.createContext(null);

const GroupProvider = ({ children }) => {
    const { authState } = useAuthContext();
    const [groupID, setGroupID] = useState();
    const [groupState, groupDispatch] = useReducer(
        reducer,
        GroupConstants.Initial_State
    );

    const watchGroups = useCallback(() => {
        firebase
            .firestore()
            .collection("groups")
            .doc(groupID)
            .onSnapshot((doc) => {
                const groupDetails = doc.data();
                groupDispatch({
                    type: GroupConstants.ACTIONS.SELECTED_GROUP,
                    payload: { ...groupDetails },
                });
            });
    }, [groupID]);

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

    const setSelectedGroupID = ({ groupId }) => setGroupID(groupId);
    const getSelectedGroupID = () => groupID;

    const removeUserFromGroupData = async () => {
        setLoading();
        try {
            const userList = groupState.userList.filter(
                (user) => user.userID !== authState.currentUser.uid
            );
            if (userList.length === 0)
                return deleteGroupData({ documentID: groupID });

            const previousUserDetails = groupState.userList.filter(
                (user) => user.userID === authState.currentUser.uid
            );
            console.log(groupState.userList);
            console.log(previousUserDetails[0]);

            await removeUserToGroupData({
                documentID: groupID,
                data: previousUserDetails,
            });
            selectNoGroup();
        } catch (error) {
            setError(error);
        }
    };

    const renameGroupName = async ({ newGroupName }) =>
        // Rename group from group document
        // Rename group in each user
        await updateGroupData({ data: { name: newGroupName } });

    const updateGroupData = async ({ data }) => {
        setLoading();
        try {
            await updateFirestoreGroupData({
                documentID: groupID,
                data: data,
            });
        } catch (error) {
            setError(error);
        }
    };

    // const addCards = async () => {
    //     await updateGroupData({
    //         dataName: "allCards",
    //         newDataValue: newMovieList.results,
    //     });
    // };

    const updateUserToGroupData = async (selectedCard) => {
        setLoading();
        try {
            const previousUserDetails = groupState.userList.filter(
                (user) => user.userID === authState.currentUser.uid
            );
            console.log(groupState.userList);
            console.log(previousUserDetails[0]);
            await removeUserToGroupData({
                documentID: groupID,
                data: {
                    userID: authState.currentUser.uid,
                    userName: authState.userProfile.username,
                },
            });
            // await removeUserToGroupData({
            //     documentID: groupID,
            //     data: previousUserDetails,
            // });
            await addUserToGroupData({
                documentID: groupID,
                data: {
                    selectedCard: selectedCard,
                    isDone: true,
                    userID: authState.currentUser.uid,
                    userName: authState.userProfile.username,
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        console.log(groupID);
        if (!groupID) return;

        const unsbscribe = watchGroups();
        return () => unsbscribe;
    }, [watchGroups, groupID]);

    return (
        <GroupContext.Provider
            value={{
                groupState,
                setSelectedGroupID,
                getSelectedGroupID,
                selectNoGroup,
                removeUserFromGroupData,
                renameGroupName,
                updateGroupData,
                // addCards,
                updateUserToGroupData,
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
