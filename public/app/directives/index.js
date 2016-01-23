'use strict';

var app = angular.module('MyApp');

app.directive('calendar', require('./calendar.directive.js'));
app.directive('dayPick', require('./dayPick.directive.js'));
