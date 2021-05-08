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
    createDataWithDocumentID,
} from "library/api/firebaseFirestore";
import reducer from "./AuthReducer";
import * as AuthConstants from "./AuthConstants";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(
        reducer,
        AuthConstants.Initial_State
    );

    useEffect(() => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
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
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });

        try {
            const createdUser = await createUserWithEmailAndPassword(
                email,
                password
            );
            await createDataWithDocumentID({
                collectionName: "users",
                documentID: createdUser.user.uid,
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
            console.error(err.code);
            console.error(err.message);
            authDispatch({
                type: AuthConstants.ACTIONS.ERROR,
            });
        }
    };

    const logIn = async ({ email, password }) => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
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
            console.error(err.code);
            console.error(err.message);
            authDispatch({
                type: AuthConstants.ACTIONS.ERROR,
            });
        }
    };

    const signOut = async () => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
        try {
            await signUserOut();
            authDispatch({
                type: AuthConstants.ACTIONS.LOGGED_OUT,
            });
        } catch (err) {
            console.error(err.code);
            console.error(err.message);
            authDispatch({
                type: AuthConstants.ACTIONS.ERROR,
            });
        }
    };

    // const resetPasswordEmail = async () => {};

    // const userNameChange = async () => {};

    const updateProfile = async () => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
        try {
            const userData = await getUserData(authState.currentUser.uid);
            authDispatch({
                type: AuthConstants.ACTIONS.UPDATE_USER,
                payload: {
                    userProfile: userData,
                },
            });
        } catch (err) {
            console.error(err.code);
            console.error(err.message);
            authDispatch({
                type: AuthConstants.ACTIONS.ERROR,
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{ authState, logIn, signUp, signOut, updateProfile }}
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
