const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/1a5e6c07f1fb77d34bdae5ba084e3168/${lat},${long}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currently = body.currently
            const summary = body.daily.data[0].summary
            callback(undefined, `${summary} It is currently ${currently.temperature} degree Celsius out. There is a ${currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast
