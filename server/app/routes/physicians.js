/****   Physician Routes    ****/
/*
    This file is going to be managing all POST and GET requests that relate to the patients
   
*/

//Declarations

var express = require('express');
var router = express.Router();
var Physician = require("../models/physician");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();


//SIGN UP A PHYSICIAN
router.post("/signUp", function (req, res) {
   Physician.findOne({ email: req.body.email }, function (err, physician) {
       if (err) res.status(401).json({ success: false, err: err });
       else if (physician) {
           res.status(401).json({ success: false, msg: "This email already used" });
       }
       else {
           const passwordHash = bcrypt.hashSync(req.body.password, 10);
           const newPhysician = new Physician({
               email: req.body.email,
               password: passwordHash
           });

           newPhysician.save(function (err, physician) {
               if (err) {
                   res.status(400).json({ success: false, err: err });
               }
               else {
                   let msgStr = `Physician with (${req.body.email}), account has been created.`;
                   res.status(201).json({ success: true, message: msgStr });
                   console.log(msgStr);
               }
           });
       }
   });
});

//LOGIN A PHYSICIAN
router.post("/login", function (req, res) {
  // Get user from the database
    Physician.findOne({ email: req.body.email }, function (err, physician) {
        if (err) {
            res.status(400).send(err);
        }
        else if (!physician) {
            // Username not in the database
            res.status(401).json({ error: "Login failure!!" });
        }
        else {
            if (bcrypt.compareSync(req.body.password, physician.password)) {
                const token = jwt.encode({ email: physician.email }, secret);
                
                // Send back a token that contains the user's username
                res.status(201).json({ success: true, token: token, msg: "Login success" });
            }
            else {
                res.status(401).json({ success: false, msg: "Email or password invalid." });
            }
        }
    });
});

// Return a list of physicians
router.get("/list", function(req,res){
    Physician.find(function(err,physicians){
        if (err) {
            let msgStr = `Something wrong....`;
            res.status(201).json({ message: msgStr });
        }
        else {
            res.status(201).json(physicians);
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
        Physician.findOne({ email: decoded.email  }, function (err, physician) {
            if (err) {
                res.status(400).json({ success: false, message: "Error contacting DB. Please contact support." });
            }
            else {
                //console.log(patient.email);
                res.status(200).json({ success: true, email: physician.email, patients: physician.patients, message: "success" });
            }
        });
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Invalid JWT" });
    }
 });


module.exports = router;