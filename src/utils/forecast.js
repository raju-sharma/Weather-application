const request = require('postman-request')

const forecast = (longitude, latitude, callback) =>
{
const weatherurl = 'http://api.weatherstack.com/current?access_key=fb73525636830027bc5ef76cb32ab56c&query='+longitude+','+latitude
request({url: weatherurl,json: true},(error,response) =>
{
 if(error)  { callback("Forecast: ERROR cannot connect",undefined) }
 else if(response.body.error) 
 { callback("Forecast: ERROR broken link",undefined)  }
  else
  { 
    callback(undefined, {
        'descriptions': response.body.current.weather_descriptions[0],
        'current_temperature': response.body.current.temperature,
        'feels_temperature':+response.body.current.feelslike
    })
  }
})
}
module.exports = forecast