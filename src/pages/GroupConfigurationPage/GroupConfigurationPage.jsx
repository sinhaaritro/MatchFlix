import React, { useState } from "react";
// import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import useFetch from "library/hooks/useFetch";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
import RegionList from "./layout/RegionList";
import GenresList from "./layout/GenresList";
import ContentType from "./layout/ContentType";
import ProviderList from "./layout/ProviderList";

const GroupConfigurationPage = (props) => {
    const { groupState, updateGroupData } = useGroupContext();

    let regionList = [{ iso_3166_1: "ALL", english_name: "ALL" }];
    const { data: fetchedRegionList } = useFetch(`/api/tmdbConfigCountries`);
    if (fetchedRegionList.length)
        regionList = [...regionList, ...fetchedRegionList];
    const [selectedRegion, setSelectedRegion] = useState(groupState.region);
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        updateGroupData({
            dataName: "region",
            newDataValue: event.target.value,
        });
    };

    const { data: genresList } = useFetch(`/api/tmdbGenres`);
    const [selectedGenres, setSelectedGenres] = useState(groupState.genres);
    const handleGenresChange = (event) => {
        setSelectedGenres(event.target.value);
        updateGroupData({
            dataName: "genres",
            newDataValue: event.target.value,
        });
    };

    const [contentType, setContentType] = useState(groupState.contentType);
    const handleContentTypeChange = (event) => {
        setContentType(event.target.value);
        updateGroupData({
            dataName: "contentType",
            newDataValue: event.target.value,
        });
    };

    let { data: providerList } = useFetch(
        `/api/tmdbWatchProvidersByRegion?watch_region=${groupState.region}`
    );
    if (providerList && providerList.length) {
        providerList = providerList
            .filter(
                (provider, index, arr) =>
                    arr.findIndex(
                        (val) => val.provider_id === provider.provider_id
                    ) === index
            )
            .sort(
                (first, second) =>
                    first.display_priority - second.display_priority
            );
    }
    const [selectedProviderList, setSelectedProviderList] = useState(
        groupState.providerList
    );
    const handleProviderListChange = (newList) => {
        setSelectedProviderList(newList);
        updateGroupData({ dataName: "providerList", newDataValue: newList });
    };

    console.log("groupState", groupState);
    return (
        <>
            <TopAppBar appBarText="Group Configuration" />
            <RegionList
                selectedRegion={selectedRegion}
                handleChange={handleRegionChange}
                regionList={regionList}
            />
            <Divider />
            <GenresList
                selectedGenres={selectedGenres}
                handleChange={handleGenresChange}
                genresList={genresList.genre}
            />
            <Divider />
            <ContentType
                value={contentType}
                handleChange={handleContentTypeChange}
            />
            <Divider />
            {providerList && providerList.length ? (
                <ProviderList
                    providerList={providerList}
                    selectedProviderList={selectedProviderList}
                    handleProviderListChange={handleProviderListChange}
                />
            ) : (
                "loading"
            )}
            <BottomNavigationBar />
        </>
    );
};

GroupConfigurationPage.propTypes = {};

export default GroupConfigurationPage;
