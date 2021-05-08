import React, { useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import firebase from "library/api/firebaseConfig";
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
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_IN,
                    payload: user,
                });
            } else {
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_OUT,
                    payload: user,
                });
            }
        });
    }, []);

    const signUp = ({ username, email, password }) => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.firestore().collection("users").doc(res.user.uid).set({
                    username: username,
                });
                return res.user;
            })
            .then((user) => {
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_IN,
                    payload: user,
                });
            })
            .catch((err) => {
                console.error(err.code);
                console.error(err.message);
                authDispatch({
                    type: AuthConstants.ACTIONS.ERROR,
                });
            });
    };

    const logIn = ({ email, password }) => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .then((user) => {
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_IN,
                    payload: user,
                });
            })
            .catch((err) => {
                console.error(err.code);
                console.error(err.message);
                authDispatch({
                    type: AuthConstants.ACTIONS.ERROR,
                });
            });
    };

    const signOut = () => {
        authDispatch({
            type: AuthConstants.ACTIONS.LOADING,
        });
        firebase
            .auth()
            .signOut()
            .then((data) => {
                authDispatch({
                    type: AuthConstants.ACTIONS.LOGGED_OUT,
                });
            })
            .catch((err) => {
                console.error(err.code);
                console.error(err.message);
                authDispatch({
                    type: AuthConstants.ACTIONS.ERROR,
                });
            });
    };

    // const resetPasswordEmail = () => {};

    // const userNameChange = () => {};

    return (
        <AuthContext.Provider value={{ authState, logIn, signUp, signOut }}>
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
