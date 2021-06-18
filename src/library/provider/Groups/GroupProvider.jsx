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
    removeGroupData,
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

            await removeGroupData({
                documentID: groupID,
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
