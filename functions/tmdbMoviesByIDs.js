require("dotenv").config();
const { queryParameterCreator } = require("./utils/queryPrameterCreator.js");
const fetch = require("node-fetch").default;

const handler = async (event) => {
    try {
        const queryString = queryParameterCreator(event.queryStringParameters);

        let movieDetailsList = [];
        const movieIDList = event.body.split(",");

        await Promise.all(
            await movieIDList.map(async (movieId) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API}${queryString}`
                );
                const data = await response.json();

                movieDetailsList.push(data);
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(movieDetailsList),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
