const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//  All Employe data Schema 
var EmployeDataSchema = new Schema({
    Teacher_id: {type :Number, required: true},
    T_name : String,
    Salary : Number,
    address  : String,
    phone : Number,
    })
  var EmployeData = new mongoose.model("Employe", EmployeDataSchema); 

  module.exports = EmployeData;