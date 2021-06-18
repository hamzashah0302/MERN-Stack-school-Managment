const express = require("express");
const app = express();
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var path = require('path');
var helpers = require('handlebars-helpers')();
const bodyParser = require('body-parser');
const url = "mongodb://localhost/school";
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true,useFindAndModify: false});
const port = 3003;
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

     // routing
const home = require('./routes/home');
const login = require('./routes/login');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const classes = require('./routes/classes');
const fee = require('./routes/fee');

app.use('/', home);
app.use('/student',student);
app.use('/teacher', teacher);
app.use('/login', login);
app.use('/classes',classes);
app.use('/fee', fee);


    const db = mongoose.connection
    db.once('open', _ => {
      console.log('Database connected:', url)
    })
    
    db.on('error', err => {
      console.error('connection error:', err)
    })

app.listen(port,"localhost",()=>{
console.log("App running on : http://localhost:3003");
})
  