const apiUrl = "https://api.github.com";
const usersUrl = `${apiUrl}/users`;

const headers = {
    "Accept": "application/vnd.github.v3+json"
}

const getOptions = {
    method: 'GET',
    headers: headers,
    mode: 'cors'
}

module.exports = { usersUrl, getOptions };
