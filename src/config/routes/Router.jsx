import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GroupsPage from "../../pages/GroupsPage/GroupsPage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

const AppRouter = ({ childrenAbove, childrenBelow }) => {
    return (
        <BrowserRouter>
            {childrenAbove}
            <Switch>
                <Route exact path="/" component={GroupsPage} />
                <Route path="/movies" component={MoviesPage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
            {childrenBelow}
        </BrowserRouter>
    );
};

AppRouter.propTypes = {
    childrenAbove: PropTypes.node,
    childrenBelow: PropTypes.node,
};

export default AppRouter;
