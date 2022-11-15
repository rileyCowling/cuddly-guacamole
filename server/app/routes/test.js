var express = require('express');
var router = express.Router();
const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res){
    res.sendFile("/Users/rileycowling/Documents/GitHub/cuddly-guacamole/server/app/public/login.html");
});

router.post('/login',function(req,res){
    console.log("Recieved Post Request");
    res.end("yes");
});

module.exports = router;
