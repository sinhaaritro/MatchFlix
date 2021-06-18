import React, { useState } from "react";
// import PropTypes from 'prop-types'
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MoreOptions from "./MoreOptions";
import MemberTab from "./MemberTab";
import CardTab from "./CardTab";

const TopAppBarWithTabs = ({ groupName }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (e, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <TopAppBar
                appBarText={groupName}
                appBarExtraIcon={<MoreOptions />}
                showTopBar="true"
            >
                <Paper>
                    <Tabs
                        variant="fullWidth"
                        value={tabValue}
                        onChange={handleChange}
                    >
                        <Tab label="Cards" />
                        <Tab label="Members" />
                    </Tabs>
                </Paper>
            </TopAppBar>
            <Box hidden={tabValue !== 0}>
                <CardTab />
            </Box>
            <Box hidden={tabValue !== 1}>
                <MemberTab />
            </Box>
        </>
    );
};

TopAppBarWithTabs.propTypes = {};

export default TopAppBarWithTabs;
