var express = require("express");
var router = express.Router();


router.get('/', function(req,res){
  
    res.render("index");
});
router.get('/user/:id', function(req,res){
   
    res.render("index");
    
});

router.post('/index', function(req,res){
     

})















module.exports = router;

