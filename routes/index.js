var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
    res.render('login');
});

router.get('/sobre', function(req, res, next){
    res.render('proposta');
});

module.exports = router;
