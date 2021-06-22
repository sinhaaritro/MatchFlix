import React, { useState } from "react";
// import PropTypes from "prop-types";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import Button from "@material-ui/core/Button";
import * as Constants from "library/constants/constants";
import { useGroupContext } from "library/provider/Groups/GroupProvider";

const CardSwipePage = ({ location }) => {
    const { groupState, updateUserToGroupData } = useGroupContext();
    const movieList = location.props.movieDetails;
    const [currentCard, setCurrentCard] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);

    const nextCard = () => {
        setCurrentCard((c) => (c = c + 1));
    };

    const addToSelectedCards = () => {
        setSelectedCards((l) => [...l, movieList[currentCard].id]);
        nextCard();
        updateUserToGroupData(selectedCards);
    };

    return (
        <>
            <TopAppBar appBarText="Swipe Cards" showTopRightBackIcon={true} />

            <img
                alt="movie poster"
                src={`${Constants.baseTMDbImageUrl}w500${movieList[currentCard].poster_path}`}
                style={{ width: "90%" }}
            />

            <Button onClick={nextCard}>Next</Button>
            <Button onClick={addToSelectedCards}>Select</Button>
        </>
    );
};

CardSwipePage.propTypes = {};

export default CardSwipePage;
