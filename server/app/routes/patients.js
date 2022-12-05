var express = require('express');
var router = express.Router();
var Patient = require("../models/patient");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const fs = require('fs');

// On AWS ec2, you can use to store the secret in a separate file. 
// The file should be stored outside of your code directory. 
// For encoding/decoding JWT
const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();



router.post("/signUp", function (req, res) {
   Patient.findOne({ email: req.body.email }, function (err, patient) {
       if (err) res.status(401).json({ success: false, err: err });
       else if (patient) {
           res.status(401).json({ success: false, msg: "This email already used" });
       }
       else {
           const passwordHash = bcrypt.hashSync(req.body.password, 10);
           const newPatient = new Patient({
               email: req.body.email,
               password: passwordHash
           });

           newPatient.save(function (err, patient) {
               if (err) {
                   res.status(400).json({ success: false, err: err });
               }
               else {
                   let msgStr = `Patient with (${req.body.email}), account has been created.`;
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
    let msgStr = `Recieved: Heart Rate (${req.body.heartRate})BPM, SPO2 = (${req.body.spo2})% `;
    res.status(201).json({ message: msgStr });
    console.log(msgStr);
  });


module.exports = router;