const apiUrl = "https://api.github.com"
const usersUrl = `${apiUrl}/users`;

const headers = {
    "Accept": "application/vnd.github.v3+json"
}

const get = {
    method: 'GET',
    headers: headers,
    mode: 'cors'
}

const getJSONorReject = (response) => {
    console.log(response)
    if (!response.ok) {
        return null;
    } else {
        return response.json()
    }
}

const fetchData = (url, options={}) => {
    return new Promise((resolve) => {
        fetch(url, options)
            .then(response => getJSONorReject(response))
            .then(json => resolve(json))
            .catch(err => console.error(err.message))
    })
}

module.exports = { getJSONorReject, fetchData }