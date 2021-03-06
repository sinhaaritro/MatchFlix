import React from "react";
// import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetailsPage from "pages/MovieDetailsPage/MovieDetailPage";
import GroupsPage from "pages/GroupsPage/GroupsPage";
import MoviesPage from "pages/MoviesPage/MoviesPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import LogInSignUp from "pages/LogInSignUpPage/LogInSignUp";
import GroupPage from "pages/GroupPage/GroupPage";
import GroupConfigurationPage from "pages/GroupConfigurationPage/GroupConfigurationPage";
import CardSwipePage from "pages/CardSwipePage/CardSwipePage";
import FinalResultPage from "pages/FinalResultPage/FinalResultPage";

const AppRouter = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={GroupsPage} />
                <Route path="/group/:id" component={GroupPage} />
                <Route
                    path="/group-configuration/:id"
                    component={GroupConfigurationPage}
                />
                <Route path="/card-swipe" component={CardSwipePage} />
                <Route path="/final-result-page" component={FinalResultPage} />
                <Route path="/login" component={LogInSignUp} />
                <Route path="/movies" component={MoviesPage} />
                <Route path="/movie/:id" component={MovieDetailsPage} />
                <Route path="/profile" component={ProfilePage} />
                {/* <Route path="*" component={Error} /> */}
            </Switch>
        </BrowserRouter>
    );
};

AppRouter.propTypes = {};

export default AppRouter;
