import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import * as Constants from "library/constants/constants";
import useFetch from "library/hooks/useFetch";

const MovieList = ({ item }) => {
    const { data: movieDetails } = useFetch(
        `/api/tmdbMoviesDetails?movieId=${item}`
    );

    return (
        <Grid item xs={4}>
            <NavLink
                to={`/movie/${movieDetails.id}`}
                style={{ textDecoration: "none" }}
            >
                <Grid container>
                    <Grid item>
                        <img
                            alt="movie poster"
                            src={`${Constants.baseTMDbImageUrl}w500${movieDetails.poster_path}`}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textPrimary">
                            {movieDetails.original_title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {movieDetails?.release_date?.substring(0, 4)}
                        </Typography>
                    </Grid>
                </Grid>
            </NavLink>
        </Grid>
    );
};

MovieList.propTypes = {
    item: PropTypes.number,
};

export default MovieList;
