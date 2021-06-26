import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";

const Movie = ({ finalCard }) => {
    const language = "null";
    const append_to_response = "watch%2Fproviders,credits";
    const { status, data: movieDetails } = useFetch(
        `/api/tmdbMoviesDetails?movieId=${finalCard[0][0]}&language=${language}&append_to_response=${append_to_response}`
    );
    return (
        <>
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
                    <Typography variant="h5" color="textSecondary">
                        Selected card
                    </Typography>
                    <img
                        alt="movie poster"
                        src={`${Constants.baseTMDbImageUrl}w500${movieDetails.poster_path}`}
                        style={{ width: "90%" }}
                    />
                </Box>
            )}
        </>
    );
};

Movie.propTypes = { finalCard: PropTypes.array };

export default Movie;
