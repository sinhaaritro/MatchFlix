import React from "react";
import AppThemeProvider from "config/theme/AppThemeProvider";
import AppRouter from "config/routes/Router";
import Container from "@material-ui/core/Container";
import AppStores from "./config/store/AppStores";

function App() {
    return (
        <Container maxWidth="sm">
            <AppStores>
                <AppThemeProvider>
                    <AppRouter />
                </AppThemeProvider>
            </AppStores>
        </Container>
    );
}

export default App;
