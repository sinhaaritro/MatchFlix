import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

const SearchMovies = ({ searchText, onSearchClicked, searchTextChanged }) => {
    const searchRef = useRef(null);

    useEffect(() => {
        //TODO Based on searchText value, change icon sign.
    }, []);

    useEffect(() => {
        const enterKeyPressed = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                document.activeElement.blur(); // hide virtual keyboard
                onSearchClicked();
            }
        };
        const searchBase = searchRef.current;
        searchBase.addEventListener("keypress", enterKeyPressed);
        return () => {
            searchBase.removeEventListener("keypress", enterKeyPressed);
        };
    }, [onSearchClicked]);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Grid container justify="center" direction="row">
                        <IconButton aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            ref={searchRef}
                            id="search"
                            type="search"
                            value={searchText}
                            placeholder="Search Movies"
                            inputProps={{ "aria-label": "search movies" }}
                            onChange={(e) => searchTextChanged(e.target.value)}
                        />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

SearchMovies.propTypes = {
    searchText: PropTypes.string,
    onSearchClicked: PropTypes.func,
    searchTextChanged: PropTypes.func,
};

export default SearchMovies;
