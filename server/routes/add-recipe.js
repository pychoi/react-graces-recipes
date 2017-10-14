const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipeSchema = require('../modules/recipe-schema');

const Model = mongoose.model('Model', recipeSchema);

router.post('/', function(req, res) {
  const newRecipe = new Model({
    "name": req.body.name,
    "source": req.body.source,
    "ingredients": req.body.ingredients,
    "instructions": req.body.instructions,
    "categories": req.body.categories
  });

  newRecipe.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.send(data);
  });
});

module.exports = router;
