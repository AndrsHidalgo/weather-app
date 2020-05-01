const request = require('request')

const geocode = (place, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoiYW5kcmVzaGlkYWxnbyIsImEiOiJjazlidWlpYmcyNjh0M3FvNWJyOWx5dXYxIn0.MIEqvfRvU8UGjHPTCeE6Lg&limit=1`

    request({ url: geoCodeURL, json: true}, (error, { body }) => {
        const { features } = body
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location, Try another search!', undefined)
        } else {
            const [{ place_name:location, center }] = features, longitude = center[0], latitude = center[1]
            callback(undefined, { location, latitude, longitude})
        }
    })
}

module.exports = geocode