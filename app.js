var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Setting up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting public directory
app.use(express.static(__dirname + '/public'));

//Setting view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Setting routes
var routes = require('./routes/index');
app.use('/', routes);

//404
app.use((res, req, next) => {
  var err = new Error('File not found!');
  err.status = 404;
  next(err);
});

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: {}
  });
});

//Listening
app.listen(process.env.PORT || 5000);
