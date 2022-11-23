var express = require('express');
var router = express.Router();
const app = express();

var User = require("../models/patient");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//This works
router.post('/signUp',function(req,res){
  const newUser = new User({
    email: req.body.email,
    password: req.body.pw,
  });
  newUser.save(function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      let msgStr = `User with email: (${req.body.email}), has been saved.`;
      res.status(201).json({ message: msgStr });
      console.log(msgStr);
    }
  });
});

router.post('/logIn',function (req,res) { //expecting to recieve an email and password
  let msgStr = `your login request has been recieved for (${req.body.email})`;
  res.status(201).json({ message: msgStr });
  console.log(msgStr);

});

router.post('/dataEntry', function (req,res) { //expecting a heart rate and a spo2 percentage
  let msgStr = `your data has been recieved: HR = (${req.data}) and SPO2 = (${req.body.spo2})%`;
  res.status(201).json({ message: msgStr });
  console.log(msgStr);

})

module.exports = router;