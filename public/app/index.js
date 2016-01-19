//require('bootsrap-webpack');
require('angular');
require('./stylesheets/style.css');
require('./stylesheets/datepickr.css');
require('angular-ui-router');



var MyApp = angular.module('MyApp', ['ui.router']);

require('./app.config.js');
require('./datepickr.js');
require('./controllers/index.js');
require('./directives/index.js');
require('./services/index.js');
