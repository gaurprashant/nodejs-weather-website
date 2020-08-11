const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3edd1d0a99e51875fd7e564c660d03b3&query='+latitude+','+longitude

    request ({url: url, json:true}, (error, {body}) => {
        if (error){
            callback('cannot connect with service', undefined)
        } else if(body.error){
            callback( 'entered location cannot found', undefined)
        }else {
            callback(undefined, {
                location: body.location.name,
                temp: body.current.temperature
            })
        }

    })

}

module.exports = forecast