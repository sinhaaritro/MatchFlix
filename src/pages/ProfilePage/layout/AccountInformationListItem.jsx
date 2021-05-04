import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const AccountInformationListItem = ({
    listItemPrimaryText,
    ListItemSecondaryText,
}) => {
    return (
        <>
            <ListItem button onClick={(e) => {}}>
                <ListItemText>
                    <Typography variant="inherit">
                        {listItemPrimaryText}
                    </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="inherit" color="textSecondary">
                            {ListItemSecondaryText}
                        </Typography>
                        <ArrowForwardIosRoundedIcon />
                    </Grid>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

AccountInformationListItem.propTypes = {
    listItemPrimaryText: PropTypes.string,
    ListItemSecondaryText: PropTypes.string,
};

export default AccountInformationListItem;
