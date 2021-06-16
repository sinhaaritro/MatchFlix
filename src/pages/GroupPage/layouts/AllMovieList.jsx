import React from "react";
import PropTypes from "prop-types";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";

const AllMovieList = ({ genreID }) => {
    const { status, data: movieList } = useFetch(
        `/api/tmdbMoviesByGenres?with_genres=${genreID}`
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
            {status === Constants.apiStatus.SUCCESS && movieList.results && (
                <Grid container spacing={2}>
                    {movieList.results.map((listItem) => {
                        return <MovieCard key={listItem.id} item={listItem} />;
                    })}
                </Grid>
            )}
        </>
    );
};

// AllMovieList.propTypes = {
//     genreID: PropTypes.number,
// };

// AllMovieList.defaultProps = {
//     query: "null",
//     language: "null",
//     region: "null",
//     page: "1",
//     year: "null",
//     primary_release_year: "null",
//     include_adult: "null",
// };

export default AllMovieList;
