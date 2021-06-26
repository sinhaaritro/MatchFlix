import React, { useState } from "react";
import PropTypes from "prop-types";
import TopAppBar from "library/layouts/TopAppBar/TopAppBar";
import Button from "@material-ui/core/Button";
import * as Constants from "library/constants/constants";
import { useGroupContext } from "library/provider/Groups/GroupProvider";
import { useHistory } from "react-router-dom";

const CardSwipePage = ({ location }) => {
    const history = useHistory();
    const { groupState, updateUserToGroupData, selectFinalCard } =
        useGroupContext();
    const movieList = location.props.movieDetails;
    const [currentCard, setCurrentCard] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);

    const nextCard = () => {
        setCurrentCard((c) => (c = c + 1));
    };

    const addToSelectedCards = () => {
        setSelectedCards((l) => [...l, movieList[currentCard].id]);
        if (groupState.allCards.length - 1 > currentCard) nextCard();
        else finish();
    };

    const finish = async () => {
        console.log("selectedCards", selectedCards);
        await updateUserToGroupData({
            selectedCard: selectedCards,
            isDone: true,
        });
        selectFinalCard();
        redirectToFinalResult();
    };

    const redirectToFinalResult = () => {
        history.push("/final-result-page");
    };

    return (
        <>
            <TopAppBar appBarText="Swipe Cards" showTopRightBackIcon={true} />

            {movieList[currentCard].poster_path !== "" ? (
                <img
                    alt="movie poster"
                    src={`${Constants.baseTMDbImageUrl}w500${movieList[currentCard].poster_path}`}
                    style={{ width: "90%" }}
                />
            ) : (
                "No Image"
            )}

            <Button onClick={addToSelectedCards}>Select</Button>
            {groupState.allCards.length - 1 > currentCard ? (
                <Button onClick={nextCard}>Next</Button>
            ) : (
                <Button onClick={finish}>Finish</Button>
            )}
        </>
    );
};

CardSwipePage.propTypes = { location: PropTypes.object };

export default CardSwipePage;
