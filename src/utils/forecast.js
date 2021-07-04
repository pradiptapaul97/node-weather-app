const request = require('request');

const forecast = (lat,long,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=5450e5e1d5bcd92e6273e287ed1c9aea&query='+lat+','+ long +''

    request({ url, json:true },(error,{body})=>{
        
        if(error)
        {
            callback('Unable to connect to the weather service',undefined);
        }
        else if(body.error)
        {
            callback(body.error.info,undefined);
        }
        else
        {
            const currentw = body.current;
            callback(undefined,'City :- '+body.location.name+
            '. weather :- '+currentw.weather_descriptions[0] + 
            '. It is currently ' + currentw.temperature + ' degress out.'+
            ' It feels like ' + currentw.feelslike + ' degress out.' +
            'Wind speed ' + currentw.wind_speed + ' .'+
            'Wind degree ' + currentw.wind_degree + ' .'+
            'Humidity '+ currentw.humidity + ' .');


        }
        })

}

module.exports = forecast