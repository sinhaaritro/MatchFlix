import React from "react";
// import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountInformationListItem from "./AccountInformationListItem";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const AccountInformationList = (props) => {
    const { authState } = useAuthContext();

    return (
        <>
            <ListSubheader>
                <Typography variant="inherit" color="primary">
                    Account Information
                </Typography>
            </ListSubheader>
            <AccountInformationListItem
                listItemPrimaryText="Username"
                ListItemSecondaryText={authState.userProfile.username}
            />
            <AccountInformationListItem
                listItemPrimaryText="Email"
                ListItemSecondaryText={authState.currentUser.email}
            />
            <AccountInformationListItem
                listItemPrimaryText="Password"
                ListItemSecondaryText="********"
            />
        </>
    );
};

AccountInformationList.propTypes = {};

export default AccountInformationList;
