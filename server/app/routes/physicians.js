var express = require('express');
var router = express.Router();
const app = express();

var User = require("../models/patient");
var Data = require("../models/physician");

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

router.post('/logIn',function (req,res) {
  let msgStr = `your login request has been recieved for (${req.body.email})`;
  res.status(201).json({ message: msgStr });
  console.log(msgStr);

});

module.exports = router;