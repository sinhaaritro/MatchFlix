import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

function TopAppBar({ appBarText }) {
    return (
        <>
            <AppBar color="inherit">
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography variant="h6" color="textPrimary">
                            {appBarText}
                        </Typography>
                        <IconButton>
                            <ExitToAppRoundedIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}

TopAppBar.propTypes = { appBarText: PropTypes.string };

export default TopAppBar;
