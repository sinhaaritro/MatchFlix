import React from "react";
import AppThemeProvider from "./config/theme/AppThemeProvider";
import AppRouter from "./config/routes/Router";
import BottomNavigationBar from "./library/layouts/BottomNavigation/BottomNavigationBar";

function App() {
    return (
        <AppThemeProvider>
            <AppRouter childrenBelow={<BottomNavigationBar />} />
        </AppThemeProvider>
    );
}

export default App;
