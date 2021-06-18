const mongoose = require("mongoose")
const Schema = mongoose.Schema;


// Fee data Schema

var feeDataSchema = new Schema({
    amount: {type: Number},
    date: {type : Date, default: new Date}
    },{collation : 'Fee'})

var feeData = mongoose.model('Fee', feeDataSchema);

module.exports = feeData;