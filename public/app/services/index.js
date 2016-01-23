'use strict';

var app = angular.module('MyApp');

app.service('authToken', require('./authtoken.service.js'));
app.service('authInterceptor', require('./authinspector.service.js'));
app.service('dataMessage', require('./dataMessage.service.js'));

app.factory('dateBuilder', require('./dateBuilder.factory.js'));
app.factory('calendarFactory', require('./calendar.factory.js'));
app.factory('messagesFactory', require('./messages.factory.js'));
