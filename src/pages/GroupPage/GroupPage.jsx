import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { NavLink, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import Typography from "@material-ui/core/Typography";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
import useFetch from "library/hooks/useFetch";
import TopAppBarWithTabs from "./layouts/TopAppBarWithTabs";
import AllMovieList from "./layouts/AllMovieList";
import * as Constants from "library/constants/constants";

function GroupPage(props) {
    const { id } = useParams();
    const { groupState, setSelectedGroupID } = useGroupContext();
    const { status, data: movieData } = useFetch(
        `/api/tmdbMoviesByIDs`,
        groupState.allCards
    );
    useEffect(() => {
        setSelectedGroupID({ groupId: id });
    }, [setSelectedGroupID, id]);

    return (
        <>
            <TopAppBarWithTabs groupName={groupState.name} />
            <Button
                fullWidth
                color="primary"
                component={NavLink}
                to={{
                    pathname: `/card-swipe/${id}`,
                    props: { movieDetails: movieData },
                }}
            >
                Start Swiping
            </Button>
            <Box my={2}>
                {status === Constants.apiStatus.LOADING && (
                    <Typography variant="caption" color="textSecondary">
                        Loading...
                    </Typography>
                )}
                {status === Constants.apiStatus.ERROR && (
                    <Typography variant="caption" color="textSecondary">
                        Error...
                    </Typography>
                )}
                {status === Constants.apiStatus.SUCCESS && (
                    <AllMovieList list={movieData} />
                )}
            </Box>
            <BottomNavigationBar />
        </>
    );
}

// GroupPage.propTypes = {};

export default GroupPage;
