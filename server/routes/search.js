const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipeSchema = require('../modules/recipe-schema');

const Model = mongoose.model('Model', recipeSchema);

router.get('/', function(req, res) {
  Model.find({$text: {$search: req.query.query}}, function(err, data){
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.send(data);
    }
  });
});

router.get('/id', function(req, res) {
  Model.findById(req.query.query, function (err, data) {
    if (err) console.log(err);
    res.send(data);
  });
});

module.exports = router;
