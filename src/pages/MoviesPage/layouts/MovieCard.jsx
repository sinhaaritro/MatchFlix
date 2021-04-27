import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import * as Constants from "library/constants/constants";

const MovieList = ({ item }) => {
    return (
        <Grid item xs={4}>
            <NavLink
                to={`/movie/${item.id}`}
                style={{ textDecoration: "none" }}
            >
                <Grid container>
                    <Grid item>
                        <img
                            alt="movie poster"
                            src={`${Constants.baseTMDbImageUrl}w500${item.poster_path}`}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textPrimary">
                            {item.original_title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {item.release_date.substring(0, 4)}
                        </Typography>
                    </Grid>
                </Grid>
            </NavLink>
        </Grid>
    );
};

MovieList.propTypes = {
    item: PropTypes.object,
};

export default MovieList;
