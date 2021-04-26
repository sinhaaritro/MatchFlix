import React from "react";
import AppThemeProvider from "config/theme/AppThemeProvider";
import AppRouter from "config/routes/Router";

function App() {
    return (
        <AppThemeProvider>
            <AppRouter />
        </AppThemeProvider>
    );
}

export default App;
