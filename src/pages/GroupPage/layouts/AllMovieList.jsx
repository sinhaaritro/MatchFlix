import React from "react";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
// import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";

const AllMovieList = ({ genreID }) => {
    const { groupState } = useGroupContext();
    return (
        <>
            {groupState.allCards && (
                <Grid container spacing={2}>
                    {groupState.allCards.map((movieID) => {
                        return <MovieCard key={movieID} item={movieID} />;
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
