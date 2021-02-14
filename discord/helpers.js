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

module.exports.GetJoke = async (APIURL) => {
    var headers = {
        "Accept": "application/json",
        "User-Agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
    }
    const data = await fetch(APIURL, {headers: headers})
    const json = await data.json()
    return json.joke
}
