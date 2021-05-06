import React, { useContext, useReducer } from "react";
import PropTypes from "prop-types";
import reducer from "./AuthReducer";
import * as AuthConstants from "./AuthConstants";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(
        reducer,
        AuthConstants.Initial_State
    );

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
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

export { AuthProvider, AuthContext, useAuthContext, AuthConstants };
