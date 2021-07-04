const request = require('request');

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHByYWRpcHRhNjUiLCJhIjoiY2txNnJnbndmMXY3aTMybzdpY2ljbG0wYiJ9.hd2cub6mIsddt2d2CX6kgQ&limit=1'

    request({url, json:true},(error,{body:location})=>{
        // const location = response.body;
        if(error)
        {
            callback('Unable to connect to the Geo service',undefined);
        }
        else if(location.features.length === 0)
        {
            callback('Please specify a valid Addess',undefined);
        }
        else
        {
            const long = location.features[0].center[0]
            const latt = location.features[0].center[1]
            callback(undefined, 
                {
                    location:location.features[0].place_name,
                    latitude:latt,
                    longitude:long
                });
        }
    })

}

module.exports = geocode