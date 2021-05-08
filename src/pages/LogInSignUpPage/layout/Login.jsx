import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useAuthContext } from "library/provider/Authentication/AuthProvider";

const Login = ({ toogleLogInForm }) => {
    const { logIn } = useAuthContext();
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setLoginUser({ ...loginUser, [inputName]: inputValue });
    };

    const handleSubmit = () => {
        logIn(loginUser);
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
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item container direction="column" alignItems="center">
                    <Button color="primary" onClick={handleSubmit}>
                        Log in
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
                    <Typography>Do you have an account? </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={toogleLogInForm}
                    >
                        Join Now
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

Login.propTypes = { toogleLogInForm: PropTypes.func };

export default Login;
