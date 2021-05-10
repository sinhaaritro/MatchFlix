import React, { useContext, useReducer } from "react";
import PropTypes from "prop-types";
import reducer from "./GroupsReducer";
import * as GroupConstants from "./GroupsConstant";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const GroupContext = React.createContext(null);

const GroupsProvider = ({ children }) => {
    const { authState } = useAuthContext();
    const [groupsState, groupsDispacth] = useReducer(
        reducer,
        GroupConstants.Initial_State
    );

    return (
        <GroupContext.Provider value={{ groupsState }}>
            {children}
        </GroupContext.Provider>
    );
};

GroupsProvider.propTypes = {
    children: PropTypes.node,
};

const useGroupContext = () => {
    return useContext(GroupContext);
};

export { GroupsProvider, useGroupContext };
