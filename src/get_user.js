const { fetchData } = require('./requests')

const apiUrl = "https://api.github.com"
const usersUrl = `${apiUrl}/users`;

const getUser = (user, options) => {
    const url = `${usersUrl}/${user}`;
    return fetchData(url, options)
}

const getRepos = (reposUrl, options) => {
    return fetchData(reposUrl, options)
}

const getFollowers = (followersUrl, options) =>{
    return fetchData(followersUrl, options)
}

module.exports = { getUser, getRepos, getFollowers }