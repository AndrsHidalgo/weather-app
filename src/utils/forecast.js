const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3794acb4b31ab7b9ebe8170876f537e0&query=${latitude},${longitude}`
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ( body.success === false ){
            callback(body.error.info, undefined)
        } else {
            let { weather_descriptions, temperature, precip, weather_icons } = body.current
            callback(undefined, { message : `${ weather_descriptions }. It is currently ${ temperature } degress out. There is a ${ precip }% chance of rain.`, icon: weather_icons }) 
        }
    })
}

module.exports = forecast