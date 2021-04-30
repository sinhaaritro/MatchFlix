const queryParameterCreator = (queryParametObject) => {
    let queryParametString = "";
    for (var key in queryParametObject) {
        if (
            queryParametObject.hasOwnProperty(key) &&
            queryParametObject[key] !== "null"
        ) {
            queryParametString += `&${key}=${queryParametObject[key]}`;
        }
    }
    return queryParametString;
};

module.exports = { queryParameterCreator };
