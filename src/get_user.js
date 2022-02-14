const { fetchData } = require('./requests');
const { usersUrl, getOptions } = require('./api_config');

const getUser = (user) => {
    const url = `${usersUrl}/${user}`;
    return fetchData(url, getOptions)
}

const getData = (reposUrl) => {
    return fetchData(reposUrl, getOptions)
}

module.exports = { getUser, getData }