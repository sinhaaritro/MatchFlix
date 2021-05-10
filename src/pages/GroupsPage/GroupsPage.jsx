import React from "react";
// import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import GroupListItem from "./layouts/GroupListItem";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import CreateJoinGroupFAB from "./layouts/CreateJoinGroupFAB";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const GroupsPage = (props) => {
    const { authState } = useAuthContext();
    if (!authState.isLogin) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <TopAppBar appBarText="Groups" />
            {authState.userProfile.groupList.length ? (
                <List>
                    {authState.userProfile.groupList.map((item) => (
                        <GroupListItem item={item} key={item.groupName} />
                    ))}
                </List>
            ) : (
                "No list"
            )}

            <CreateJoinGroupFAB />
            <BottomNavigationBar />
        </>
    );
};

GroupsPage.propTypes = {};

export default GroupsPage;
