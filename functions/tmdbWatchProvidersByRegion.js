require("dotenv").config();
const { queryParameterCreator } = require("./utils/queryPrameterCreator.js");
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        let queryString = queryParameterCreator(event.queryStringParameters);

        let movieResponse = await fetch(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${process.env.TMDB_API}${queryString}`
        );
        let movieData = await movieResponse.json();

        if (movieData.results.length === 0) {
            queryString = "";
            movieResponse = await fetch(
                `https://api.themoviedb.org/3/watch/providers/movie?api_key=${process.env.TMDB_API}${queryString}`
            );
            movieData = await movieResponse.json();
        }

        const tvResponse = await fetch(
            `https://api.themoviedb.org/3/watch/providers/tv?api_key=${process.env.TMDB_API}${queryString}`
        );
        const tvData = await tvResponse.json();

        const data = [...tvData.results, ...movieData.results];

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
