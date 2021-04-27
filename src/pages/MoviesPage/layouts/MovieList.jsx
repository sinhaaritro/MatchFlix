import React from "react";
import PropTypes from "prop-types";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";
import Grid from "@material-ui/core/Grid";
import MovieCard from "./MovieCard";

const MovieList = ({ query }) => {
    const { status, data: movieList } = useFetch(
        `${Constants.baseSearchApiURL}?api_key=${process.env.REACT_APP_TMDB_API}&query=${query}&page=0}&include_adult=true`
    );

    return (
        <>
            {movieList.results && (
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
    list: PropTypes.array,
};

export default MovieList;
