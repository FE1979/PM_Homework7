const { fetchData } = require('./requests');
const { usersUrl, getOptions } = require('./api_config');


const getUser = (user) => {
    const url = `${usersUrl}/${user}`;
    return fetchData(url, getOptions)
}

const getRepos = (reposUrl) => {
    return fetchData(reposUrl, getOptions)
}

const getFollowers = (followersUrl) =>{
    return fetchData(followersUrl, getOptions)
}

module.exports = { getUser, getRepos, getFollowers }