const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// classes data schema 
var classes = new Schema({
    id :{type : Number , required : true},
    name: {type: String, required : true},
    fee_amount: {type : Number, required: true}
    },{collation : 'classes'})

var Classes = mongoose.model('classes', classes);

module.exports = Classes;