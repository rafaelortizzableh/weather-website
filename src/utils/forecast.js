const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=18b2ebabb41242de9b5353f8b78aa6b4&query=' + longitude + ',' + latitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,  body.current.weather_descriptions[0]+'. Right now, the temperature is ' + body.current.temperature + ' Degrees Celsius. It feels like ' + body.current.feelslike + ' degrees.          Humidity💧: ' + body.current.humidity + "%.")
            }
    })
}


module.exports = forecast