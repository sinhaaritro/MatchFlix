import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Login = ({ toogleLogIn }) => {
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
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item container direction="column" alignItems="center">
                    <Button color="primary">Log in</Button>
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
                        onClick={toogleLogIn}
                    >
                        Join Now
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

Login.propTypes = { toogleLogIn: PropTypes.func };

export default Login;
