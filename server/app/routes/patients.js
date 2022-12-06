/****   Patient Routes    ****/
/*
    This file is going to be managing all POST and GET requests that relate to the patients
    
    TODO
    - 
    -
    -
*/

//Declarations
var express = require('express');
var router = express.Router();
var Patient = require("../models/patient");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const uuid = require('uuid');
const { json } = require('express');
const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();

//SIGN UP A NEW PATIENT
router.post("/signUp", function (req, res) {
    //Search data base to make sure two users don't share an email
    Patient.findOne({ email: req.body.email }, function (err, patient) {
        if (err) res.status(401).json({ success: false, err: err });
        else if (patient) {
            res.status(401).json({ success: false, msg: "This email already used" });
        }
        else {   //No Users founds so we can proceed and make a new account
            //Create a hashed password
            const passwordHash = bcrypt.hashSync(req.body.password, 10);
            const newPatient = new Patient({
                email: req.body.email,
                password: passwordHash,  
                //Creating an ID# for the patient
                id: uuid.v4() // ex: "c438f870-f2b7-4b2c-a1c3-83bd88bb1d79"
            });
            //Save the new patient to the database
            newPatient.save(function (err, patient) {
                if (err) {
                    res.status(400).json({ success: false, err: err });
                }
                else {
                    let msgStr = `Patient with (${req.body.email}), account has been created.\nID#: ${newPatient.id}`;
                    res.status(201).json({ success: true, message: msgStr });
                    console.log(msgStr);
                }
            });
        }
    });
});

router.post("/login", function (req, res) {
  // Get user from the database
  Patient.findOne({ email: req.body.email }, function (err, patient) {
      if (err) {
          res.status(400).send(err);
      }
      else if (!patient) {
          // Username not in the database
          res.status(401).json({ error: "Login failure!!" });
      }
      else {
          if (bcrypt.compareSync(req.body.password, patient.password)) {
              const token = jwt.encode({ email: patient.email }, secret);
              // Send back a token that contains the user's username
              res.status(201).json({ success: true, token: token, msg: "Login success" });
          }
          else {
              res.status(401).json({ success: false, msg: "Email or password invalid." });
          }
      }
  });
});


router.post("/dataEntry", function (req, res) {
    Patient.findOne({ id: req.body.id }, function (err, patient) {
        if (err) {
            res.status(400).send(err);
        }
        else if (!patient) {
            // ID not in the database
            let msgStr = 'error: "Could not find ID!!"';
            res.status(401).json({msgStr});
            console.log(msgStr);
        }
        else {
            const dataObj = JSON.parse(req.body.data);
            //save the data to the patient's arrays
            patient.bpm.push(dataObj.heartRate);
            patient.oxy.push(dataObj.spo2);
            patient.save();
            res.status(200).json({message: "recieved"});
            console.log("Just received a HR of " + dataObj.heartRate + "BPM and SPO2 of " + dataObj.spo2 + "% at " + dataObj.time);
        }
    });
});


module.exports = router;