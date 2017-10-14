const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// DATABASE MODULE
const db = require('./modules/db.js');

// APP CONFIG
app.set('port', process.env.PORT || 5000);

// MIDDLEWARE CONFIG
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com'],
    fontSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
    connectSrc: ["'self'", '*.googleapis.com']
  }
}));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTE MODULES
const addRecipe = require('./routes/add-recipe');
const editRecipe = require('./routes/edit-recipe');
const search = require('./routes/search');
const searchCat = require('./routes/search-categories');
const index = require('./routes/index');

// ROUTES
app.use('/add-recipe', addRecipe);
app.use('/edit-recipe', editRecipe);
app.use('/search', search);
app.use('/search-categories', searchCat);
app.use('/categories', index);
app.use('/recipe', index);
app.use('/results', index);
app.use('/add', index);
app.use('/edit', index);
app.use('/login', index);
app.use('/', index);

// LISTEN
app.listen(app.get("port"), function(){
  console.log("Listening on port: " + app.get("port"));
});

module.exports = app;
