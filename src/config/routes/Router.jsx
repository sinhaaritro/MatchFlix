import React from "react";
// import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GroupsPage from "../../pages/GroupsPage/GroupsPage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

const AppRouter = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={GroupsPage} />
                <Route path="/movies" component={MoviesPage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        </BrowserRouter>
    );
};

AppRouter.propTypes = {};

export default AppRouter;
