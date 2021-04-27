import React, { useState } from "react";
// import PropTypes from "prop-types";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import SearchMovies from "./layouts/SearchMovies";
import MovieList from "./layouts/MovieList";

const MoviesPage = (props) => {
    const [searchText, setSearchText] = useState("");

    const searchTextChanged = (newSearchText) => setSearchText(newSearchText);

    const onSearchClicked = () => setSearchText(searchText);

    return (
        <>
            <SearchMovies
                searchText={searchText}
                onSearchClicked={onSearchClicked}
                searchTextChanged={searchTextChanged}
            />
            {!searchText && "Nothing here. Type in search to get results"}
            {searchText && <MovieList query={searchText} />}
            <BottomNavigationBar />
        </>
    );
};

MoviesPage.propTypes = {};

export default MoviesPage;
