import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const GroupListItem = ({ item }) => {
    return (
        <>
            <ListItem button onClick={() => {}}>
                <ListItemText
                    primary={item.groupName}
                    secondary={"Group ID: " + item.groupID}
                />
            </ListItem>
            <Divider />
        </>
    );
};

GroupListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default GroupListItem;
