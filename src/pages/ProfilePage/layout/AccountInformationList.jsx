import React from "react";
// import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountInformationListItem from "./AccountInformationListItem";

const AccountInformationList = (props) => {
    return (
        <>
            <ListSubheader>
                <Typography variant="inherit" color="primary">
                    Account Information
                </Typography>
            </ListSubheader>
            <AccountInformationListItem
                listItemPrimaryText="Username"
                ListItemSecondaryText="AAA#1234"
            />
            <AccountInformationListItem
                listItemPrimaryText="Email"
                ListItemSecondaryText="abc@mail.com"
            />
            <AccountInformationListItem
                listItemPrimaryText="Password"
                ListItemSecondaryText="*****"
            />
        </>
    );
};

AccountInformationList.propTypes = {};

export default AccountInformationList;
