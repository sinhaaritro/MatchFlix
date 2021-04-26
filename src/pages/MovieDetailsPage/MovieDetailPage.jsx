import React, { useEffect, useCallback, useState } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import IconButton from "@material-ui/core/IconButton";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import MovieMainDetails from "./layouts/MovieMainDetails";
import MovieExtraDetails from "./layouts/MovieExtraDetails";

const baseApiURL = "https://api.themoviedb.org/3/movie/";
const baseImageUrl = "http://image.tmdb.org/t/p/";

const MovieDetailsPage = (props) => {
    const [movieDetails, setMovieDetails] = useState({});
    const { id: movieId } = useParams();

    const fetchMovieDetails = useCallback(async () => {
        const response = await fetch(
            `${baseApiURL}${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`
        );
        const data = await response.json();
        setMovieDetails(data);
    }, [movieId]);

    useEffect(() => {
        if (movieId === null) return;
        fetchMovieDetails();
        return () => {};
    }, [movieId, fetchMovieDetails]);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton aria-label="search">
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <MovieMainDetails
                {...movieDetails}
                poster={`${baseImageUrl}w500${movieDetails.poster_path}`}
            />
            <MovieExtraDetails {...movieDetails} />
            <BottomNavigationBar />
        </>
    );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
