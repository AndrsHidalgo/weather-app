const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3794acb4b31ab7b9ebe8170876f537e0&query=${latitude},${longitude}`
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ( body.success === false ){
            callback(body.error.info, undefined)
        } else {
            let { weather_descriptions, temperature, feelslike, wind_speed, humidity, precip, pressure, visibility } = body.current
            callback(undefined, { info : {
                    weather_descriptions, 
                    temperature: `It's currently ${ temperature } degrees out, it's feel like ${ feelslike } degrees.`, 
                    wind_speed: `Winds of ${ wind_speed } kmph.`, 
                    humidity: `${ humidity } % humidity.`, 
                    precip: `${ precip } mm precipitation.`, 
                    pressure: `An atmospheric pressure of ${ pressure } mb.`, 
                    visibility: `${ visibility } mi visibility.` 
                }}) 
        }
    })
}

module.exports = forecast