'use strict';

var app = angular.module('MyApp');

app.service('authToken', require('./authtoken'));
app.service('authInterceptor', require('./authinspector'));
app.service('dataMessage', require('./datamessage'));

app.factory('dateBuilder', require('./date_builder'));
app.factory('calendar_factory', require('./calendar_factory'));
app.factory('messages_factory', require('./messages'));
