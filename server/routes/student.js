const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
// Render Models
const studentData = require("../models/student");
const { response } = require("express");
const { data } = require("jquery");

const router = express.Router();
// getting student fee data from db
//     function GetStudents() {
//     studentData.find({}, function (err, stds) {
//     Students = stds;
//   });
// }

// Home directory
router.get("/", function (req, res) {
  studentData
    .find({})
    .lean()
    .exec(function (error, stds) {
      var date;
      // condition to prevent error when there is no data

      stds.forEach((element) => {
        if (element.dob != undefined) date = element.dob.toDateString();
        element.dob = date;
      });
      res.json(stds);
      // res.render("student", { stds });
    });
});

router.post("/saveSTD", function (req, res) {
  //   create and add Student data in db
  var regNo = 0;
  studentData  //only to increment reg NO with +1  automatically 
    .find({})
    .lean()
    .exec(function (error, stds) {
      stds.forEach((element) => {
        element.regNo > regNo ? (regNo = element.regNo) : regNo;
      });
      let student = {
        regNo: regNo + 1,
        student_id: req.body.Rollno,
        name: req.body.stdname,
        Father_name: req.body.fathername,
        address: req.body.address,
        dob: req.body.dob,
        class: req.body.class,
        contact: req.body.contactNo,
      };

      studentData.create(student, function (err, data) {
        if (err) {
          console.log("err", err);
          res.status(400).send("Cant Inserted");
        } else {
          res.json(data);
        }
      });
    });
});

// deleting  Student
router.post("/delete_std", async function (req, res) {
  let rollno = JSON.parse(req.body.rollno);
  await studentData.findOneAndDelete({ student_id: rollno }, function (err) {
    if (err) {
      console.log("error here : " + err);
      res.json("Error in deletion student : ", err);
    } else {
      console.log("Student Data deleted :");
      res.status(200).json(rollno);
    }
  });
});
// Find Student data to be Updated
router.post("/find_update_std", async function (req, res) {
  let rollno = JSON.parse(req.body.rollno);
  await studentData.findOne({ student_id: rollno }, function (err, data) {
    if (err) console.log("error here : " + err);

    res.send(data);
  });
});

// Update student data /update_std
router.post("/update_std", async function (req, res) {
  const rollno = { student_id: req.body.Rollno };
  const update = {
    name: req.body.stdname,
    Father_name: req.body.fathername,
    address: req.body.address,
    dob: req.body.dob,
    class: req.body.class,
    contact: req.body.ContactNo,
  };
  try {
    let doc = await studentData.findOneAndUpdate(rollno, update);
    res.status(200).json({ user: "Student Updated" });
  } catch (err) {
    console.log("Error in Promise : " + err);
    res.status(404).json("Sorry, cant find that");
  }
});

module.exports = router;
