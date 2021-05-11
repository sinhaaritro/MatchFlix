import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "library/provider/Authentication/AuthProvider";
import { GroupProvider } from "library/provider/Groups/GroupProvider";

const AppStores = ({ children }) => {
    return (
        <AuthProvider>
            <GroupProvider>{children}</GroupProvider>
        </AuthProvider>
    );
};

AppStores.propTypes = {
    children: PropTypes.node,
};

export default AppStores;
