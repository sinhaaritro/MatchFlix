import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import BottomNavigationBar from "library/layouts/BottomNavigation/BottomNavigationBar";
import useFetch from "library/hooks/useFetch";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
import * as groupConstants from "library/constants/groupConstants";
import RegionList from "./layout/RegionList";
import GenresList from "./layout/GenresList";
import ContentType from "./layout/ContentType";
import ProviderList from "./layout/ProviderList";

const GroupConfigurationPage = (props) => {
    const { groupState, updateGroupData } = useGroupContext();

    const [selectedRegion, setSelectedRegion] = useState(groupState.region);
    const handleRegionChange = (event) => setSelectedRegion(event.target.value);

    const [selectedGenres, setSelectedGenres] = useState(groupState.genres);
    const handleGenresChange = (event) => setSelectedGenres(event.target.value);

    const [contentType, setContentType] = useState(groupState.contentType);
    const handleContentTypeChange = (event) =>
        setContentType(event.target.value);

    let { data: providerList } = useFetch(
        `/api/tmdbWatchProvidersByRegion?watch_region=${selectedRegion}`
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
    const handleProviderListChange = (newList) =>
        setSelectedProviderList(newList);

    const saveGroupData = async () => {
        try {
            const response = await fetch(
                `/api/tmdbDiscoverMoviesByFilter?watch_region=${selectedRegion}&with_genres=${selectedGenres}&include_adult=true`
            );
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response");
            }
            const movieList = await response.json();
            const ml = movieList.results.map((movie) => movie.id);
            updateGroupData({
                data: {
                    allCards: ml,
                    region: selectedRegion,
                    genres: selectedGenres,
                    contentType: contentType,
                    providerList: selectedProviderList,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <TopAppBar appBarText="Group Configuration" showTopBar="true" />
            <RegionList
                selectedRegion={selectedRegion}
                handleChange={handleRegionChange}
                regionList={groupConstants.regionList}
            />
            <Divider />
            <GenresList
                selectedGenres={selectedGenres}
                handleChange={handleGenresChange}
                genresList={groupConstants.genresList}
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
            <br />
            {(groupState.region !== selectedRegion ||
                groupState.genres !== selectedGenres ||
                groupState.contentType !== contentType ||
                groupState.providerList !== selectedProviderList) && (
                <Button color="primary" onClick={saveGroupData}>
                    Save
                </Button>
            )}

            <BottomNavigationBar />
        </>
    );
};

export default GroupConfigurationPage;
