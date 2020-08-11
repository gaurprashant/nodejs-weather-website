const request = require('request')


const geocode = (address, callback) =>{

    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGdhdXIyNzIiLCJhIjoiY2tkbGQxOGR0MHhkZzJ5cDNib3VhdnpidiJ9.zPpOWX5p85z91p759eNvGg&limit=1'
    request({url: url1, json:true}, (error, {body}) => {
      if(error){
        callback('mapbox service not working', undefined)
      } else if(body.features.length===0){
       callback('no address found', undefined)
      } else {
        callback(undefined, {
          location: body.features[0].place_name,
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
        })
      }
  
    })
  
  }

  module.exports = geocode