import React from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useFetch from "library/hooks/useFetch";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import MovieMainDetails from "./layouts/MovieMainDetails";
import MovieExtraDetails from "./layouts/MovieExtraDetails";
import * as Constants from "library/constants/constants";

const MovieDetailsPage = (props) => {
    const language = "null";
    const append_to_response = "watch%2Fproviders,credits";
    const { id: movieId } = useParams();
    const { status, data: movieDetails } = useFetch(
        `/api/tmdbMoviesDetails?movieId=${movieId}&language=${language}&append_to_response=${append_to_response}`
    );

    return (
        <>
            <TopAppBar showTopRightBackIcon={true} />
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
                <Box my={2}>
                    <MovieMainDetails
                        {...movieDetails}
                        poster={`${Constants.baseTMDbImageUrl}w500${movieDetails.poster_path}`}
                    />
                    <MovieExtraDetails {...movieDetails} />
                </Box>
            )}
            <BottomNavigationBar />
        </>
    );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
