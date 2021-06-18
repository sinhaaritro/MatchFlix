import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { useHistory } from "react-router-dom";

function TopAppBar({
    appBarText,
    appBarExtraIcon,
    showTopBar = false,
    children,
}) {
    const history = useHistory();

    return (
        <>
            <AppBar color="inherit">
                <Toolbar>
                    {showTopBar && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => history.goBack()}
                        >
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    )}
                    <Grid container justify="space-between" alignItems="center">
                        <Typography variant="h6" color="textPrimary">
                            {appBarText}
                        </Typography>
                        {appBarExtraIcon}
                    </Grid>
                </Toolbar>
                {children}
            </AppBar>
            <Toolbar />
            {children && <Toolbar />}
        </>
    );
}

TopAppBar.propTypes = {
    appBarText: PropTypes.string,
    appBarExtraIcon: PropTypes.node,
    children: PropTypes.node,
};

export default TopAppBar;
