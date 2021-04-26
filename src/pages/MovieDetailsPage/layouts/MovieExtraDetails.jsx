import React from "react";
import PropTypes from "prop-types";

const MovieExtraDetails = ({ overview }) => {
    return <div>{overview}</div>;
};

MovieExtraDetails.propTypes = {
    overview: PropTypes.string,
};

export default MovieExtraDetails;
