'use strict';

var app = angular.module('MyApp');

app.directive('calendar', require('./calendar.js'));
app.directive('dayPick', require('./day_pick.js'));
