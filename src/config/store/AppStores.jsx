import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "library/provider/Authentication/AuthProvider";
import { GroupsProvider } from "library/provider/Groups/GroupsProvider";

const AppStores = ({ children }) => {
    return (
        <AuthProvider>
            <GroupsProvider>{children}</GroupsProvider>
        </AuthProvider>
    );
};

AppStores.propTypes = {
    children: PropTypes.node,
};

export default AppStores;
