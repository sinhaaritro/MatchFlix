import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "library/provider/Authentication/AuthProvider";

const AppStores = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

AppStores.propTypes = {
    children: PropTypes.node,
};

export default AppStores;
