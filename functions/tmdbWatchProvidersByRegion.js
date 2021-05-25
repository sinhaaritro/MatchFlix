require("dotenv").config();
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        const { watch_region } = event.queryStringParameters;

        const movieResponse = await fetch(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${process.env.TMDB_API}&watch_region=${watch_region}`
        );
        const movieData = await movieResponse.json();
        const tvResponse = await fetch(
            `https://api.themoviedb.org/3/watch/providers/tv?api_key=${process.env.TMDB_API}&watch_region=${watch_region}`
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
