const express = require("express");
const app = express();
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Render Models
const studentData = require('../models/student');

const router = express.Router();

// Home directory
router.get("/", function(req, res){
    console.log(' Teacher Url Here :'+ __dirname)
    res.render('teachers');
 })


//  router.post('/login',function(req , res ){
//     res.render('login')
//  })

 
 // create and add Student data in db

// studentData.create({student_id: 1,name: "Hamza", }, function (err, data) {
//   if (err) {
//     console.log('could not insert')
//     throw err
//   }
//   console.log('inserted account : ' +data)
// })

module.exports = router;