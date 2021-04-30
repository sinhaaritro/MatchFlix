import React from "react";
import PropTypes from "prop-types";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";

const MovieList = ({
    language,
    query,
    page,
    include_adult,
    region,
    year,
    primary_release_year,
}) => {
    const { status, data: movieList } = useFetch(
        `/api/tmdbMoviesSearch?query=${query}&page=${page}&include_adult=${include_adult}&language=${language}&region=${region}&year=${year}&primary_release_year=${primary_release_year}`
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

MovieList.propTypes = {
    query: PropTypes.string,
    language: PropTypes.string,
    region: PropTypes.string,
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    primary_release_year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    include_adult: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

MovieList.defaultProps = {
    query: "null",
    language: "null",
    region: "null",
    page: "1",
    year: "null",
    primary_release_year: "null",
    include_adult: "null",
};

export default MovieList;
