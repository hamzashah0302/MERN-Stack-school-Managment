const express = require("express");
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", function(req, res){
    res.render('login');
 })


 module.exports = router;