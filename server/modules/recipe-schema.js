const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipSchema = new Schema({
    "name": String,
    "source": String,
    "ingredients": String,
    "instructions": String,
    "categories": Array},
    {collection: "recipes"});

recipSchema.index({'$**': 'text'});

module.exports = recipSchema;
