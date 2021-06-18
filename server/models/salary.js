const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//   Salary Schema 
      
var SalaryDataSchema = new Schema({
    Empolye_id : {type :Number , required: true},
    date : Date,
    description : String,
    amount : Number
  })

  var SalaryData = new mongoose.model("Salary", SalaryDataSchema);

  module.exports = SalaryData;