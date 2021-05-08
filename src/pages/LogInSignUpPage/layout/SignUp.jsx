import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const SignUp = ({ toogleLogInForm }) => {
    const { signUp } = useAuthContext();

    const [registerUser, setRegisterUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setRegisterUser({ ...registerUser, [inputName]: inputValue });
    };

    const handleSubmit = () => {
        if (
            registerUser.password.length > 5 &&
            registerUser.password === registerUser.confirmPassword
        )
            signUp(registerUser.email, registerUser.password);

        setRegisterUser({
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                direction="column"
                style={{ width: "100%" }}
            >
                <Grid item>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="email"
                        label="Email"
                        type="email"
                        value={registerUser.email}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="password"
                        label="Password"
                        type="password"
                        value={registerUser.password}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={registerUser.confirmPassword}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item container direction="column" alignItems="center">
                    <Button color="primary" onClick={handleSubmit}>
                        Join
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Typography>Already have an Account? </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={toogleLogInForm}
                    >
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

SignUp.propTypes = { toogleLogInForm: PropTypes.func };

export default SignUp;
