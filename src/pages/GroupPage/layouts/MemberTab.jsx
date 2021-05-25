import React from "react";
// import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useGroupContext } from "library/provider/Groups/GroupProvider";

const MemberTab = (props) => {
    const { groupState } = useGroupContext();

    return (
        <>
            {groupState.userList.length ? (
                <List>
                    {groupState.userList.map((item) => (
                        <ListItem button key={item.userID}>
                            <ListItemText primary={item.userName} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                "No list"
            )}
        </>
    );
};

MemberTab.propTypes = {};

export default MemberTab;
