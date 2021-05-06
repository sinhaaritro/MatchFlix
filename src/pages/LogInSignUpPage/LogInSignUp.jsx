import React, { useState } from "react";
// import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Login from "./layout/Login";
import SignUp from "./layout/SignUp";

const LogInSignUp = (props) => {
    const [isLogIn, setIsLogIn] = useState(true);

    const toogleLogIn = () => {
        if (isLogIn) setIsLogIn(false);
        else setIsLogIn(true);
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{ height: "95vh" }}
            >
                <Box my={4}>
                    <Grid container alignItems="center" justify="center">
                        <img
                            width="50%"
                            src={process.env.PUBLIC_URL + "/favicon-512.png"}
                            alt="app logo"
                        />
                    </Grid>
                </Box>
                {isLogIn ? (
                    <Login toogleLogIn={toogleLogIn} />
                ) : (
                    <SignUp toogleLogIn={toogleLogIn} />
                )}
            </Grid>
        </>
    );
};

LogInSignUp.propTypes = {};

export default LogInSignUp;
