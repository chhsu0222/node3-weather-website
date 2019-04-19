const request = require('request')

const geocode = (address, callback) => {
    // For the cases of chinese input
    address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY2hoc3UiLCJhIjoiY2p0NTN3N3hjMDJldzQzcXh6bzJzczkycSJ9.UwfzfQ2ukbEZBkd7Mwmdcw&limit=1`

    request({ url, json: true }, (error, geoData) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (geoData.body.features.length === 0) {
            callback('Unable to find location. Please try another search.', undefined)
        } else {
            const data = geoData.body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode
