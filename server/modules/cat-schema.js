const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  "group": String,
  "category": String},
  {collection: "categories"});

module.exports = catSchema;
