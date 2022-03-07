const request = require('postman-request')
const geocode = (address, callback) =>
{
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFqdS1jcyIsImEiOiJjbDBjMDFoc2swNmxjM2JzMTY5ZmthemU5In0.Xd5YSPVXTEH2fq4Vh21pNg'
    request({url: geourl,json: true},(error,response)=>{
     if(error)
     callback("Geocode: ERROR cannot connect",undefined)
     else if(response.body.features.length == 0)
     callback("Unable to find location, try another search",undefined)
     else
     {
                callback(undefined,  {
                'longitude':  response.body.features[2].center[0],
                'latitude': response.body.features[2].center[1],
                'place': response.body.features[0].place_name
           })
     }
    })
}
module.exports = geocode