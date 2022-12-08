/****   Patient Routes    ****/
/*
    This file is going to be managing all POST and GET requests that relate to the patients
    

    TODO 
    cant get the graphs to display for individual users

    Style for users right now
    user# pw#
    dr# pw#

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
const Physician = require('../models/physician');
const { compileClientWithDependenciesTracked } = require('jade');
const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();
var Particle = require('particle-api-js');
var particle = new Particle();


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
                id: uuid.v4(), // ex: "c438f870-f2b7-4b2c-a1c3-83bd88bb1d79"
                bpm: [,,,,87,81,88,87,90,91,91,100,80,87,88,79,90,88,87,,,,,],
                oxy: [,,,,99,99,99,99,98,98,98,98,98,99,99,99,97,99,99,,,,,]
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
              res.status(201).json({ success: true, token: token, id: patient.id, msg: "Login success" });
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



router.get("/home", function (req, res) {
    //console.log("recieved"); //TESTING
    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ success: false, msg: "Missing X-Auth header" });
    }
 
    // X-Auth should contain the token 
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        // Send back email and last access
        Patient.findOne({ email: decoded.email  }, function (err, patient) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                //console.log(patient.email);
                res.status(200).json({ success: true, email: patient.email, id: patient.id, physician: patient.physician, bpm: patient.bpm, oxy: patient.oxy, message: "success" });
            }
        });
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Invalid JWT" });
    }
 });

 router.post("/passwordChange", function(req,res){
    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ success: false, msg: "Missing X-Auth header" });
    }
 
    // X-Auth should contain the token 
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        // Send back email and last access
        Patient.findOneAndUpdate({ email: decoded.email  }, {password: passwordHash}, function (err, patient) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                res.status(201).json({ success: true, message: "password change success" });
            }
        });
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Invalid JWT" });
    }
 })
 
 router.post("/selectPhysician", function(req,res){
    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ success: false, msg: "Missing X-Auth header" });
    }
 
    // X-Auth should contain the token 
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        const filter = {email: decoded.email};
        const update = {physician: req.body.physician};
        console.log(req.body.physician);
        Patient.findOneAndUpdate(filter, update, function (err, patient) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                //console.log(patient.physician);
                //res.status(201).json({ success: true, physician: req.body.physician, message: "Physician Selection Success" });
                Physician.findOne({email: req.body.physician}, function(err,physician){
                    if (err) {
                        res.status(400).send(err);
                    }
                    else if (!physician) {
                        // ID not in the database
                        let msgStr = 'error: "Could not find physician!!"';
                        res.status(401).json({msgStr});
                        console.log(msgStr);
                    }
                    else {
                        
                        //save the patient to the physician's arrays
                        if(!physician.patients.includes(patient.email)){
                            physician.patients.push(patient.email);
                            physician.save();
                        }
                        res.status(200).json({message: "recieved"});
                        console.log(physician.patients);
                    }
                })
                
            }
        });
        
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Invalid JWT" });
    }
 });

 // physician uses this to get patient summaries
 router.post("/data", function (req, res) {
    //console.log("recieved"); //TESTING
    
        Patient.findOne({email: req.body.email}, function (err, patient) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                //console.log(patient.email);
                
                res.status(200).json({ success: true, patientObj: patient, message: "success" });
            }
        });
    
 });


 router.post("/particle", function(req,res){
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ success: false, msg: "Missing X-Auth header" });
    }
 
    // X-Auth should contain the token 
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        let filter = { email: decoded.email  };
        let update = { particleToken: req.body.particleToken  };
        Patient.findOneAndUpdate(filter, update, function (err) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                res.status(201).json({ success: true, message: "Particle Info Saved" });
            }
        });
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Invalid JWT" });
    }
 })

 //for sending a command to the particle device
 router.post("/particleUpdate", function(req,res){
    //We have the token and ID along with the start & end times, and frequencies
    console.log("ID: " + req.body.id + " Token:" + req.body.token )
    let ID = req.body.id;
    let token=req.body.token;
    let cmd = "on";
    // particle.callFunction({deviceIf: ID, name:'led', argument: cmd, auth:token}).then(
    //     function(data) {
    //       console.log('Function called succesfully:', data);
    //     }, function(err) {
    //       console.log('An error occurred:', err);
    //     });
    var devicesPr = particle.listDevices({ auth: token });

    devicesPr.then(
    function(devices){
        console.log('Devices: ', devices);
    },
    function(err) {
        console.log('List devices call failed: ', err);
    }
    );

 })

module.exports = router;