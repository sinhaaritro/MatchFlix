import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const RegionList = ({ selectedRegion, handleChange, regionList }) => {
    regionList =
        regionList &&
        regionList.sort((first, second) =>
            first.english_name.localeCompare(second.english_name)
        );

    return (
        <>
            <Box my={2}>
                <TextField
                    select
                    label="Region"
                    value={selectedRegion}
                    onChange={handleChange}
                    helperText="Please select your region"
                    variant="outlined"
                    fullWidth
                >
                    {regionList.length &&
                        regionList.map((country) => (
                            <MenuItem
                                key={country.iso_3166_1}
                                value={country.iso_3166_1}
                            >
                                {country.english_name}
                            </MenuItem>
                        ))}
                </TextField>
            </Box>
        </>
    );
};

RegionList.propTypes = {
    selectedRegion: PropTypes.string,
    handleChange: PropTypes.func,
    regionList: PropTypes.array,
};

export default RegionList;
