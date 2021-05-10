import React, { useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import firebase from "library/api/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signUserOut,
} from "library/api/firebaseAuth";
import {
    getUserData,
    createUserData,
    updateUserData,
    createGroupData,
} from "library/api/firebaseFirestore";
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

    const setError = (err) => {
        console.error(err.code);
        console.error(err.message);
        authDispatch({
            type: AuthConstants.ACTIONS.ERROR,
        });
    };

    useEffect(() => {
        setLoading();
        firebase.auth().onAuthStateChanged((user) => {
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
        } catch (err) {
            setError(err);
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
        } catch (err) {
            setError(err);
        }
    };

    const signOut = async () => {
        setLoading();
        try {
            await signUserOut();
            authDispatch({
                type: AuthConstants.ACTIONS.LOGGED_OUT,
            });
        } catch (err) {
            setError(err);
        }
    };

    // const resetPasswordEmail = async () => {};

    // const userNameChange = async () => {};

    const createGroup = async ({ groupName }) => {
        setLoading();
        try {
            const groupID = await createGroupData({
                data: {
                    groupName: groupName,
                    allCard: [],
                    selectedCard: [],
                    userSelectedCard: [
                        { selectedCard: [], userID: authState.currentUser.uid },
                    ],
                },
            });
            await setUpdateProfile({
                userProfile: {
                    groupList: [
                        ...authState.userProfile.groupList,
                        { groupID: groupID.id, groupName: groupName },
                    ],
                    username: authState.userProfile.username,
                },
            });
            return groupID.id;
        } catch (err) {
            setError(err);
        }
    };

    const joinGroup = async (groupName) => {
        setLoading();
        try {
        } catch (err) {
            setError(err);
        }
    };

    const removeGroup = async () => {};

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
        } catch (err) {
            setError(err);
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
        } catch (err) {
            setError(err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authState,
                logIn,
                signUp,
                signOut,
                createGroup,
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
