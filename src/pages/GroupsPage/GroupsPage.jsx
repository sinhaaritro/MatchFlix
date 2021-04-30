import React from "react";
// import PropTypes from "prop-types";
import useFetch from "library/hooks/useFetch";
import Toolbar from "@material-ui/core/Toolbar";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";

const GroupsPage = (props) => {
    const { status, data } = useFetch(`/api/test?name=ari`);
    console.log(data);
    return (
        <>
            <div>Groups Page</div>
            <div>{data.message}</div>
            <Toolbar />
            <BottomNavigationBar />
        </>
    );
};

// GroupsPage.propTypes = {};

export default GroupsPage;
