const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipes';
const MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
