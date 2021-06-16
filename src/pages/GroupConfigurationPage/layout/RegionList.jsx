import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const RegionList = ({ selectedRegion, handleChange, regionList }) => {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    if (regionList.length > 1 && isButtonEnabled === false)
        setIsButtonEnabled(true);

    regionList =
        regionList &&
        regionList.sort((first, second) =>
            first.english_name.localeCompare(second.english_name)
        );

    return (
        <>
            <Box my={2}>
                <TextField
                    disabled={!isButtonEnabled}
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
