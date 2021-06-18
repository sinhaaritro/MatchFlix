import React from "react";
import Grid from "@material-ui/core/Grid";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";

const AllMovieList = () => {
    const { groupState } = useGroupContext();
    const { status, data: movieData } = useFetch(
        `/api/tmdbMoviesByIDs`,
        groupState.allCards
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
                <Grid container spacing={2}>
                    {movieData?.map((movie) => {
                        return <MovieCard key={movie.id || -1} item={movie} />;
                    })}
                </Grid>
            )}
        </>
    );
};

export default AllMovieList;
