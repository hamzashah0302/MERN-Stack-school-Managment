const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// student data Schema
var studentDataSchema = new Schema({
    regNo : Number,
    student_id: {type: Number, required: true, unique: true},
    name: String,
    Father_name: String,
    address: String,
    dob: {type: Date},
    class: String,
    contact: Number,
    fee: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fee'}]
    },{collation : 'Student'})

var studentData = mongoose.model('Student', studentDataSchema);


module.exports = studentData;