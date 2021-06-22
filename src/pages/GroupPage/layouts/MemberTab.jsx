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
            {groupState?.userList && (
                <List>
                    {Object.entries(groupState.userList).map(([key, value]) => (
                        <ListItem button key={key}>
                            <ListItemText primary={value.userName} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
};

MemberTab.propTypes = {};

export default MemberTab;
