import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";

import { useGroupContext } from "library/provider/Groups/GroupProvider";
import TopAppBarWithTabs from "./layouts/TopAppBarWithTabs";

function GroupPage(props) {
    const { id } = useParams();
    const { groupState, getSelectedGroupDetails } = useGroupContext();

    useEffect(() => {
        getSelectedGroupDetails({ groupId: id });
    }, [getSelectedGroupDetails, id]);

    return (
        <>
            <TopAppBarWithTabs groupName={groupState.name} />
            <Button fullWidth color="primary">
                Start Swiping
            </Button>
            <BottomNavigationBar />
        </>
    );
}

GroupPage.propTypes = {};

export default GroupPage;
