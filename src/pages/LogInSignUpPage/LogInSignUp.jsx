import React, { useState } from "react";
// import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Login from "./layout/Login";
import SignUp from "./layout/SignUp";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const LogInSignUp = (props) => {
    const [isLogInForm, setIsLogInForm] = useState(true);
    const { authState } = useAuthContext();

    if (authState.isLogin) {
        return <Redirect to="/" />;
    }

    const toogleLogInForm = () => {
        if (isLogInForm) setIsLogInForm(false);
        else setIsLogInForm(true);
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
                {isLogInForm ? (
                    <Login toogleLogInForm={toogleLogInForm} />
                ) : (
                    <SignUp toogleLogInForm={toogleLogInForm} />
                )}
            </Grid>
        </>
    );
};

LogInSignUp.propTypes = {};

export default LogInSignUp;
