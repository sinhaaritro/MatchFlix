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
    createGroupData,
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
    const [finalCard, setFinalCard] = useState({});
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

    const createGroup = async ({ groupName }) => {
        setLoading();
        try {
            const response = await fetch(`/api/tmdbDiscoverMoviesByFilter`);
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response");
            }
            const movieList = await response.json();
            let ml = movieList.results.map((movie) => movie.id);
            const groupID = await createGroupData({
                data: {
                    allCards: ml,
                    contentType: "movie",
                    genres: -1,
                    name: groupName,
                    providerList: [],
                    region: "ALL",
                    userList: {
                        [authState.currentUser.uid]: {
                            selectedCard: [],
                            userName: authState.userProfile.username,
                        },
                    },
                },
            });
            return groupID.id;
        } catch (error) {
            setError(error);
        }
    };

    const addUserToGroup = async ({ groupCode }) => {
        setLoading();
        try {
            //TODO: Conditional checking
            const updateProperty = `userList.${authState.currentUser.uid}`;
            await addUserToGroupData({
                documentID: groupCode,
                data: {
                    [updateProperty]: {
                        selectedCard: [],
                        userName: authState.userProfile.username,
                    },
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const removeUserFromGroupData = async () => {
        setLoading();
        try {
            if (Object.keys(groupState.userList).length === 0)
                return deleteGroupData({ documentID: groupID });

            await removeUserToGroupData({
                documentID: groupID,
                userID: authState.currentUser.uid,
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

    const updateUserToGroupData = async ({
        selectedCard = [],
        isDone = false,
    }) => {
        setLoading();
        try {
            const updateProperty = `userList.${authState.currentUser.uid}`;
            await addUserToGroupData({
                documentID: groupID,
                data: {
                    [updateProperty]: {
                        isDone: isDone,
                        selectedCard: selectedCard,
                        userName: authState.userProfile.username,
                    },
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const selectFinalCard = async () => {
        try {
            if (
                Object.entries(groupState.userList).filter(
                    ([key, user]) => user.isDone !== true
                ).length === 0
            ) {
                var finalCardList = {};
                Object.entries(groupState.userList).map(([key, user]) =>
                    user.selectedCard.map((card) => {
                        if (finalCardList[card])
                            finalCardList[card] = finalCardList[card] + 1;
                        else finalCardList[card] = 1;
                    })
                );
                var entries = Object.entries(finalCardList);
                var sorted = entries.sort((a, b) => b[1] - a[1]);
                setFinalCard(sorted);
                console.log(sorted);
            } else {
                setFinalCard({});
            }
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
                createGroup,
                addUserToGroup,
                selectNoGroup,
                removeUserFromGroupData,
                renameGroupName,
                updateGroupData,
                // addCards,
                updateUserToGroupData,
                finalCard,
                selectFinalCard,
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
