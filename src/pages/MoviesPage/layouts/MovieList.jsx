import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MovieCard from "./MovieCard";

const MovieList = ({ list }) => {
    return (
        <>
            <Grid container spacing={2}>
                {list.map((listItem) => {
                    return <MovieCard key={listItem.id} item={listItem} />;
                })}
            </Grid>
        </>
    );
};

MovieList.propTypes = {
    list: PropTypes.array,
};

export default MovieList;
