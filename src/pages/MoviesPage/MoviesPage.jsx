import React, { useState } from "react";
// import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
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
            <Box my={2}>
                {!searchText && "Nothing here. Type in search to get results"}
                {searchText && <MovieList query={searchText} />}
            </Box>
            <Toolbar />
            <BottomNavigationBar />
        </>
    );
};

MoviesPage.propTypes = {};

export default MoviesPage;
