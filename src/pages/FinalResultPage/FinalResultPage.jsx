import React from "react";
import Typography from "@material-ui/core/Typography";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import Movie from "./layouts/Movie";
import { useGroupContext } from "library/provider/Groups/GroupProvider";

const FinalResultPage = (props) => {
    const { finalCard } = useGroupContext();
    return (
        <>
            <TopAppBar appBarText="Results" showTopRightBackIcon="true" />
            {Object.keys(finalCard).length === 0 ? (
                <Typography variant="caption" color="textSecondary">
                    Waiting for others...
                </Typography>
            ) : (
                <Movie finalCard={finalCard} />
            )}
            <BottomNavigationBar />
        </>
    );
};

export default FinalResultPage;
