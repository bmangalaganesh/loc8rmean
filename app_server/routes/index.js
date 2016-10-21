var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

var homePageController = function(req,res,next){
 res.render('index', {title:'Express'});
};


/* GET home page. */
router.get('/', ctrlMain.homePage);


module.exports = router;
