import React from "react";
// import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
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
            <List>
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {}}>
                    <ListItemText primary="group name" secondary="people(3)" />
                </ListItem>
                <Divider />
            </List>
            <CreateJoinGroupFAB />
            <BottomNavigationBar />
        </>
    );
};

// GroupsPage.propTypes = {};

export default GroupsPage;
