// Babel ES6/JSX Compiler
require('babel-core/register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var logger = require('morgan');
var colors = require('colors');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');

var routes = require('./app/routes');

var app = express();

app.set('port', process.env.WEB_PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((req, res) => {
  Router.match({routes: routes.default, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
        var page = swig.renderFile('./views/index.html', {html: html});
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({message: err.message});
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
