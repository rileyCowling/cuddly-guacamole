var express = require('express');
var router = express.Router();
const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/data',function(req,res){
  let msgStr = `HB = (${req.body.heartBeat})`;
  res.status(201).json({message: msgStr});
  console.log(msgStr);
});

module.exports = router;
