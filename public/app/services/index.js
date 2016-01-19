'use strict';

var app = angular.module('MyApp');

app.service('authToken', require('./authtoken'));
app.service('authInterceptor', require('./authinspector'));
app.service('dataMessage', require('./datamessage'));
