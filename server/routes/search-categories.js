const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const catSchema = require('../modules/cat-schema');

const CatModel = mongoose.model('CatModel', catSchema);

router.get('/', function(req, res) {
  CatModel.find({}, function(err, data){
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
