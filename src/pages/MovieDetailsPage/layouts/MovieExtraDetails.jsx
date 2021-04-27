import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const MovieExtraDetails = ({ overview }) => {
    return <Typography color="textSecondary">{overview}</Typography>;
};

MovieExtraDetails.propTypes = {
    overview: PropTypes.string,
};

export default MovieExtraDetails;
