import React from "react";
// import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const CreditsList = (props) => {
    return (
        <>
            <ListSubheader>
                <Typography variant="inherit" color="primary">
                    Credits
                </Typography>
            </ListSubheader>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="TMDb" src="TMDb.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="THE MOVIE DB"
                    secondary="This product uses the TMDb API but is not endorsed or certified by TMDb."
                />
            </ListItem>
        </>
    );
};

CreditsList.propTypes = {};

export default CreditsList;
