require("dotenv").config();
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        const { region } = event.queryStringParameters;

        const response = await fetch(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${process.env.TMDB_API}&watch_region=${region}`
        );
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
