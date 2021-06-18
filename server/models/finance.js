const mongoose = require("mongoose")
const Schema = mongoose.Schema;
 
 // Finance data fee schema  
 var financeDataSchema = new Schema({
    student_id: {type :Number, required: true},
    amount : Number,
    discription : String,
    date : Date,
    }) 
var financeData = new mongoose.model("Finance",financeDataSchema);

module.exports = financeData;