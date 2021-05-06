import React, { useState } from "react";
// import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CreateJoinGroupButtons from "./CreateJoinGroupButtons";

const CreateJoinGroupFAB = (props) => {
    const [openFAB, setOpenFAB] = useState(false);

    const toggleFAB = () => {
        if (openFAB === false) setOpenFAB(true);
        else setOpenFAB(false);
    };

    return (
        <>
            {openFAB && <CreateJoinGroupButtons />}
            <Fab aria-label="fab" onClick={toggleFAB}>
                {openFAB === false ? <AddRoundedIcon /> : <CloseRoundedIcon />}
            </Fab>
        </>
    );
};

CreateJoinGroupFAB.propTypes = {};

export default CreateJoinGroupFAB;
