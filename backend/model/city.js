const mongoose = require('mongoose');

var city = mongoose.model('city',{
    cityName : { type : String},
    code : { type : Number},
    country : { type : String},
    description : {type : String}
})

module.exports = city;