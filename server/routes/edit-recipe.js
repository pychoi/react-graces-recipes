const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipeSchema = require('../modules/recipe-schema');

const Model = mongoose.model('Model', recipeSchema);

router.put('/', function(req, res) {
  const updatedRecipe = {
    "name": req.body.name,
    "source": req.body.source,
    "ingredients": req.body.ingredients,
    "instructions": req.body.instructions,
    "categories": req.body.categories
  }
  Model.update({ _id: req.body._id }, updatedRecipe, function(err, data) {
    if (err) console.log(err);
    res.send(data);
  });
});

module.exports = router;
