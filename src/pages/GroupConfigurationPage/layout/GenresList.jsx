import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const GenresList = ({ selectedGenres, handleChange, genresList }) => {
    genresList =
        genresList &&
        genresList
            .filter(
                (genre, index, array) =>
                    array.findIndex((val) => val.id === genre.id) === index
            )
            .sort((first, second) => first.name.localeCompare(second.name));

    return (
        <>
            <Box my={2}>
                {genresList ? (
                    <TextField
                        select
                        label="Genres"
                        value={selectedGenres}
                        onChange={handleChange}
                        helperText="Please select your genres"
                        variant="outlined"
                        fullWidth
                    >
                        {genresList &&
                            genresList.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                    </TextField>
                ) : (
                    <TextField
                        label="Genres"
                        helperText="Please select your genres"
                        variant="outlined"
                        fullWidth
                        disabled
                    ></TextField>
                )}
            </Box>
        </>
    );
};

GenresList.propTypes = {
    selectedCountry: PropTypes.string,
    handleChange: PropTypes.func,
    countryList: PropTypes.array,
};

export default GenresList;
