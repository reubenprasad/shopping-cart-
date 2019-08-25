var mongoose = require('mongoose')
var schema = mongoose.Schema;
var prodschema = new schema(
    {
    title:String,
    price:Number,
    id:String,
    image:String
    }
)
var productssmodel = mongoose.model("Products",prodschema,"Products");
module.exports = productssmodel;