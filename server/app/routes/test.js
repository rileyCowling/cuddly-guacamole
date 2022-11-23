var express = require('express');
var router = express.Router();
const app = express();

var User = require("../models/user");
var Data = require("../models/data");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/entry',function(req,res){
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
  });
  newUser.save(function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      let msgStr = `User (${req.body.name}) info has been saved.`;
      res.status(201).json({ message: msgStr });
      console.log(msgStr);
    }
  });
});

module.exports = router;
