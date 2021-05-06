import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function TopAppBar({ appBarText, appBarExtraIcon }) {
    return (
        <>
            <AppBar color="inherit">
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography variant="h6" color="textPrimary">
                            {appBarText}
                        </Typography>
                        {appBarExtraIcon}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}

TopAppBar.propTypes = {
    appBarText: PropTypes.string,
    appBarExtraIcon: PropTypes.func,
};

export default TopAppBar;
