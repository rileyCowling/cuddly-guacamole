var express = require('express');
var router = express.Router();
var Physician = require("../models/physician");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const fs = require('fs');

// On AWS ec2, you can use to store the secret in a separate file. 
// The file should be stored outside of your code directory. 
// For encoding/decoding JWT
const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();



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



module.exports = router;