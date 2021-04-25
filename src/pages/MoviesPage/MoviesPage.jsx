import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
import SearchMovies from "./layouts/SearchMovies";
import MovieList from "./layouts/MovieList";

const initailList = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

const MoviesPage = (props) => {
    const [searchText, setSearchText] = useState("");
    const [movieList, setMovieList] = useState(initailList);
    const pageNumber = 0;

    const searchTextChanged = (nextSearchText) => setSearchText(nextSearchText);

    const onSearchClicked = () => fetchMoviesList();

    const fetchMoviesList = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API}&query=${searchText}&page=${pageNumber}}&include_adult=true`
            );
            const data = await response.json();
            setMovieList((previousData) => {
                return {
                    ...previousData,
                    page: data.page,
                    results: data.results,
                    total_pages: data.total_pages,
                    total_results: data.total_results,
                };
            });
        } catch (e) {
            console.error(e);
        }
    }, [searchText]);

    useEffect(() => {
        if (searchText === "") return setMovieList(initailList);
        fetchMoviesList();
    }, [searchText, fetchMoviesList]);

    return (
        <>
            <SearchMovies
                searchText={searchText}
                onSearchClicked={onSearchClicked}
                searchTextChanged={searchTextChanged}
            />
            {movieList.results.length > 0 ? (
                <MovieList list={movieList.results} />
            ) : (
                "Nothing here"
            )}
        </>
    );
};

MoviesPage.propTypes = {};

export default MoviesPage;
