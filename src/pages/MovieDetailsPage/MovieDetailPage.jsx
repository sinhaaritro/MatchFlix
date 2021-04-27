import React from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useFetch from "library/hooks/useFetch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import IconButton from "@material-ui/core/IconButton";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import MovieMainDetails from "./layouts/MovieMainDetails";
import MovieExtraDetails from "./layouts/MovieExtraDetails";
import * as Constants from "library/constants/constants";

const MovieDetailsPage = (props) => {
    const { id: movieId } = useParams();
    const { status, data: movieDetails } = useFetch(
        `${Constants.baseTMDbApiURL}movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`
    );

    return (
        <>
            <AppBar color="inherit">
                <Toolbar>
                    <IconButton aria-label="search">
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <MovieMainDetails
                {...movieDetails}
                poster={`${Constants.baseTMDbImageUrl}w500${movieDetails.poster_path}`}
            />
            <MovieExtraDetails {...movieDetails} />
            <BottomNavigationBar />
        </>
    );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
