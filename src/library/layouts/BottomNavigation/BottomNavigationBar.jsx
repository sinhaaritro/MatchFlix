import React, { useState } from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import MovieRoundedIcon from "@material-ui/icons/MovieRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const BottomNavigationBar = (props) => {
    const [value, setValue] = useState(window.location.pathname);

    return (
        <AppBar
            component="nav"
            position="fixed"
            color="primary"
            style={{ top: "auto", bottom: 0 }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    component={NavLink}
                    to="/"
                    value="/"
                    label="Groups"
                    icon={<GroupRoundedIcon />}
                />
                <BottomNavigationAction
                    component={NavLink}
                    to="/movies"
                    value="/movies"
                    label="Movies"
                    icon={<MovieRoundedIcon />}
                />
                <BottomNavigationAction
                    component={NavLink}
                    to="/profile"
                    value="/profile"
                    label="Profile"
                    icon={<AccountCircleRoundedIcon />}
                />
            </BottomNavigation>
        </AppBar>
    );
};

BottomNavigationBar.propTypes = {};

export default BottomNavigationBar;
