import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import * as Constants from "library/constants/constants";

const MovieList = ({ item }) => {
    return (
        <>
            <Grid item xs={4} key={item.id}>
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        src={`${Constants.baseImageUrl}w500${item.poster_path}`}
                    />
                    <CardContent>
                        <Typography noWrap variant="body1">
                            {item.original_title}
                        </Typography>
                        <Typography noWrap variant="caption">
                            {item.release_date.substring(0, 4)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

MovieList.propTypes = {
    item: PropTypes.object,
};

export default MovieList;
