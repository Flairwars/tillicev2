const fetch = require('node-fetch');

module.exports.GetCatDogImage = async (APIURL) => {
    const data = await fetch(APIURL)
    const json = await data.json()
    return json[0].url
}


module.exports.GetFoxImage = async (APIURL) => {
    const data = await fetch(APIURL)
    const json = await data.json()
    return json.image
}
