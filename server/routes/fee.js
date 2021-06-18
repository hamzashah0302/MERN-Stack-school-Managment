const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// Render Models
const StdsFee = require("../models/fee");
const studentData = require("../models/student");

// const data = {student_id : '6039dc0723c97023d43f283c', amount : 500 , date : new Date}

router.get("/", async function (req, res) {
    try {
        // const allStd_fee = await StdsFee.find({});
        // console.log("FEE Here : " + allStd_fee)
        res.render("fee");
    } catch (err) {
        console.log("Error : " + err);
    }
});

// adding std Fee in db
router.post("/add_fee", async (req, res) => {
    let fee_data = { amount: req.body.amount, date: req.body.date };

    try {
        const std = await studentData.findOne({ "regNo": req.body.regNo });
        if (!std) {
            console.log("Student not registered ");
            return res.json("Student Not found");
        }
        const stdfee = new StdsFee(fee_data);
        stdfee.save();
        std.fee.push(stdfee._id);
        await studentData.findOneAndUpdate(
            { regNo: req.body.regNo },
            { $set: { fee: std.fee } }
        );
        res.json(stdfee)
    } catch (error) {
        console.log("Error occur" + error);
        res.send({ error: error });
    }
});

// find any student Fee
router.post("/find_fee", async function (req, res) {
    let { regNo } = req.body;
    try {
        const doc = await studentData.find({ regNo: regNo }).populate("fee");
        res.status(200).json(doc[0].fee);
    } catch (error) {
        console.log("Error : " + error);
        res.status(403).json(error);
    }
});

router.post("/delete_fee", async function(req ,res){
    const std = await studentData.findOne({ "regNo": req.body.regNo });
        if (!std) {
            return res.json("Student data Not found");
        }
        else{
            await StdsFee.findOneAndDelete({ _id: req.body._id },async function (err) {
            if (err) {
                console.log("error in Deleting Fee : " + err);
                res.json("Error in deletion student Fee Data : ", err);
            } else {
                let arry =std.fee
                console.log("sent ID : "+req.body._id)
                arry.pull(req.body._id)
                    console.log("updated array:",arry)
                    await studentData.findOneAndUpdate(
                    { regNo: req.body.regNo },
                    { $set: { fee: arry } }
                );
                res.status(200).json("Fee Deleted");
                }
            });
        }
    
});

module.exports = router;
