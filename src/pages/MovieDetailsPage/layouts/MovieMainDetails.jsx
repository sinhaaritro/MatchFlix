import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const baseImageUrl = "http://image.tmdb.org/t/p/";

const MovieMainDetails = ({
    original_title,
    release_date,
    runtime,
    genres,
    popularity,
    vote_count,
    poster_path,
}) => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <img
                        src={`${baseImageUrl}w500${poster_path}`}
                        alt="movie poster"
                        style={{ width: "100%" }}
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item>
                        <Typography variant="h5">{original_title}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {release_date.substring(0, 4)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="caption" color="textSecondary">
                                {runtime} mins
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" color="textSecondary">
                                {popularity} | {vote_count}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

MovieMainDetails.propTypes = {
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
    genres: PropTypes.array,
    popularity: PropTypes.number,
    vote_count: PropTypes.number,
};

export default MovieMainDetails;
