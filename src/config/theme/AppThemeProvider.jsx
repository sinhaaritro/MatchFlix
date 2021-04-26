import React from "react";
import PropTypes from "prop-types";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

const AppThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

AppThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default AppThemeProvider;
