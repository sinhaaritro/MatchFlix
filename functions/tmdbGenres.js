require("dotenv").config();
const { queryParameterCreator } = require("./utils/queryPrameterCreator.js");
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        const queryString = queryParameterCreator(event.queryStringParameters);

        const movieResponse = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API}${queryString}`
        );
        const movieData = await movieResponse.json();
        const tvResponse = await fetch(
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API}${queryString}`
        );
        const tvData = await tvResponse.json();

        const data = [...tvData.genres, ...movieData.genres];

        return {
            statusCode: 200,
            body: JSON.stringify({ genre: data }),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
