import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";

import { useGroupContext } from "library/provider/Groups/GroupProvider";
import TopAppBarWithTabs from "./layouts/TopAppBarWithTabs";
import AllMovieList from "./layouts/AllMovieList";

function GroupPage(props) {
    const { id } = useParams();
    const { groupState, setSelectedGroupID } = useGroupContext();

    useEffect(() => {
        setSelectedGroupID({ groupId: id });
    }, [setSelectedGroupID, id]);

    return (
        <>
            <TopAppBarWithTabs groupName={groupState.name} />
            <Button fullWidth color="primary">
                Start Swiping
            </Button>
            <Box my={2}>
                <AllMovieList genreID={groupState.genres} />
            </Box>
            <BottomNavigationBar />
        </>
    );
}

GroupPage.propTypes = {};

export default GroupPage;
