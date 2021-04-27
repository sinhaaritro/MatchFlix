import React from "react";
import AppThemeProvider from "config/theme/AppThemeProvider";
import AppRouter from "config/routes/Router";
import Container from "@material-ui/core/Container";

function App() {
    return (
        <Container maxWidth="sm">
            <AppThemeProvider>
                <AppRouter />
            </AppThemeProvider>
        </Container>
    );
}

export default App;
