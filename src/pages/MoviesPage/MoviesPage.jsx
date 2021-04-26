import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import useFetch from "library/hooks/useFetch";
import * as Constants from "library/constants/constants";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import SearchMovies from "./layouts/SearchMovies";
import MovieList from "./layouts/MovieList";

const MoviesPage = (props) => {
    const [searchText, setSearchText] = useState("");
    const [url, setUrl] = useState("");
    const { status, data } = useFetch(url);
    const movieList = data;

    const searchTextChanged = (newSearchText) => setSearchText(newSearchText);

    const onSearchClicked = () => setSearchText(searchText);

    useEffect(() => {
        if (searchText === "") return;
        setUrl(
            `${Constants.baseSearchApiURL}?api_key=${process.env.REACT_APP_TMDB_API}&query=${searchText}&page=0}&include_adult=true`
        );
    }, [searchText]);

    return (
        <>
            <SearchMovies
                searchText={searchText}
                onSearchClicked={onSearchClicked}
                searchTextChanged={searchTextChanged}
            />
            {data.results === undefined ? (
                "Nothing here"
            ) : (
                <MovieList list={movieList.results} />
            )}
            <BottomNavigationBar />
        </>
    );
};

MoviesPage.propTypes = {};

export default MoviesPage;
