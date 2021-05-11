import React from "react";
// import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Typography from "@material-ui/core/Typography";

const CardTab = (props) => {
    return (
        <>
            {/* <Typography variant="h6">Custom Card List</Typography> */}
            <Box my={2}>
                <ButtonGroup fullWidth variant="outlined" color="primary">
                    <Button>Configure Cards</Button>
                    <Button>Add Custom Card</Button>
                </ButtonGroup>
            </Box>
        </>
    );
};

CardTab.propTypes = {};

export default CardTab;
