import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const ContentType = ({ value, handleChange }) => {
    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Content Type</FormLabel>
                <RadioGroup
                    aria-label="content type"
                    name="content type"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="movie"
                        control={<Radio />}
                        label="Movie"
                    />
                    <FormControlLabel
                        value="tv"
                        control={<Radio />}
                        label="TV Show"
                    />
                </RadioGroup>
            </FormControl>
        </>
    );
};

ContentType.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
};

export default ContentType;
