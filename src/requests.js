const getJSONorReject = (response) => {
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