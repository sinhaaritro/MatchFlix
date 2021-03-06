import React, { useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import firebase from "library/api/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signUserOut,
} from "library/utilities/firebaseAuth";
import {
    getUserData,
    createUserData,
    updateUserData,
    getGroupData,
} from "library/utilities/firebaseFirestore";
import reducer from "./AuthReducer";
import * as AuthConstants from "./AuthConstants";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(
        reducer,
        AuthConstants.Initial_State
    );

    const setLoading = () => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
    };

    const setError = (error) => {
        console.log(error);
        authDispatch({
            type: AuthConstants.ACTIONS.ERROR,
        });
    };

    useEffect(() => {
        setLoading();
        const authChangeListner = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUserData(user.uid).then((userData) => {
                    authDispatch({
                        type: AuthConstants.ACTIONS.LOGGED_IN,
                        payload: {
                            currentUser: user,
                            userProfile: userData,
                        },
                    });
                });
            } else {
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_OUT,
                    payload: user,
                });
            }
        });

        return () => authChangeListner();
    }, []);

    const signUp = async ({ username, email, password }) => {
        setLoading();
        try {
            const createdUser = await createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserData({
                id: createdUser.user.uid,
                data: {
                    username: username,
                    groupList: [],
                },
            });
            authDispatch({
                type: AuthConstants.ACTIONS.LOGGED_IN,
                payload: {
                    currentUser: createdUser.user,
                    userProfile: { groupList: [], username },
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const logIn = async ({ email, password }) => {
        setLoading();
        try {
            const currentUser = await signInWithEmailAndPassword(
                email,
                password
            );
            const userData = await getUserData(currentUser.user.uid);
            authDispatch({
                type: AuthConstants.ACTIONS.LOGGED_IN,
                payload: {
                    currentUser: currentUser.user,
                    userProfile: userData,
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const signOut = async () => {
        setLoading();
        try {
            await signUserOut();
            authDispatch({
                type: AuthConstants.ACTIONS.LOGGED_OUT,
            });
        } catch (error) {
            setError(error);
        }
    };

    // const resetPasswordEmail = async () => {};

    // const userNameChange = async () => {};

    const joinGroup = async ({ groupCode }) => {
        setLoading();
        try {
            const filteredList = authState.userProfile.groupList.filter(
                (group) => group.groupID === groupCode
            );
            if (filteredList.length !== 0) throw new Error("Already in group");

            const groupData = await getGroupData({ documentID: groupCode });

            await setUpdateProfile({
                userProfile: {
                    groupList: [
                        ...authState.userProfile.groupList,
                        { groupID: groupCode, groupName: groupData.name },
                    ],
                    username: authState.userProfile.username,
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const removeGroup = async ({ groupCode }) => {
        setLoading();
        try {
            const filteredList = authState.userProfile.groupList.filter(
                (group) => group.groupID !== groupCode
            );
            await setUpdateProfile({
                userProfile: {
                    groupList: filteredList,
                    username: authState.userProfile.username,
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    const setUpdateProfile = async ({ userProfile }) => {
        setLoading();
        try {
            await updateUserData({
                id: authState.currentUser.uid,
                data: userProfile,
            });
            authDispatch({
                type: AuthConstants.ACTIONS.UPDATE_USER,
                payload: { userProfile: userProfile },
            });
        } catch (error) {
            setError(error);
        }
    };

    const getUpdateProfile = async () => {
        setLoading();
        try {
            const userProfile = await getUserData(authState.currentUser.uid);
            authDispatch({
                type: AuthConstants.ACTIONS.UPDATE_USER,
                payload: {
                    userProfile: userProfile,
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authState,
                logIn,
                signUp,
                signOut,
                joinGroup,
                removeGroup,
                setUpdateProfile,
                getUpdateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
