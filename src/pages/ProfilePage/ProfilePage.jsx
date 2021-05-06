import React from "react";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import CreditsList from "./layout/CreditsList";
import AccountInformationList from "./layout/AccountInformationList";

const ProfilePage = (props) => {
    return (
        <>
            <TopAppBar
                appBarText="User Settings"
                appBarExtraIcon={
                    <IconButton>
                        <ExitToAppRoundedIcon />
                    </IconButton>
                }
            />
            <Box my={2}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Avatar alt="Abc" src="1.jpg" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Profile Name</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <List>
                <AccountInformationList />
                <Divider />
                <CreditsList />
            </List>
            <BottomNavigationBar />
        </>
    );
};

ProfilePage.propTypes = {};

export default ProfilePage;
