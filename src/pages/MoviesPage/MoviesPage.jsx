import React, { useState } from "react";
// import PropTypes from "prop-types";
import SearchMovies from "./layouts/SearchMovies";
import { Button } from "@material-ui/core";

const MoviesPage = (props) => {
    const [searchText, setSearchText] = useState("");
    const searchTextChanged = (nextSearchText) => {
        setSearchText(nextSearchText);
    };

    const onSearchClicked = () => {
        console.log(searchText);
    };

    return (
        <>
            <SearchMovies
                searchText={searchText}
                onSearchClicked={onSearchClicked}
                searchTextChanged={searchTextChanged}
            />
            <div>Movie Page</div>
            <Button
                onClick={() => {
                    console.log(searchText);
                }}
            >
                Click
            </Button>
        </>
    );
};

MoviesPage.propTypes = {};

export default MoviesPage;
