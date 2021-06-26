import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MovieCard from "./MovieCard";

const AllMovieList = ({ list }) => {
    return (
        <>
            <Grid container spacing={2}>
                {list?.map((movie) => {
                    return <MovieCard key={movie.id || -1} item={movie} />;
                })}
            </Grid>
        </>
    );
};

AllMovieList.propTypes = {
    list: PropTypes.array,
};

export default AllMovieList;
