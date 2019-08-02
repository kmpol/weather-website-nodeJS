const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/ab93576f45029e6a96bbbe51492e1be2/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect with forecast servies!', undefined)
        } else if (response.body.code === 400) {
            callback(response.body.error || 'Unable to fetch the weather data!', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability*100 + '% chance of rain.')
        }
    })
}

module.exports = forecast