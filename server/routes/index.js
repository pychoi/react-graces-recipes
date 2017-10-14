var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next){
    var file = req.params[0] || 'index.html';
    res.sendFile(path.join(__dirname, '/../dist/', file));
});

module.exports = router;
