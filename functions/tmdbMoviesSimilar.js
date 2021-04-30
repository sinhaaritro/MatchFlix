require("dotenv").config();
const { queryParameterCreator } = require("./utils/queryPrameterCreator.js");
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        const { movieId } = event.queryStringParameters;
        const queryString = queryParameterCreator(event.queryStringParameters);

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API}${queryString}`
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
