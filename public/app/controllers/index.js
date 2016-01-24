'use strict';

var app = angular.module('MyApp');

app.controller('LoginCtrl', require('./login.controller.js'));
app.controller('RegisterCtrl', require('./register.controller.js'));
app.controller('HeaderCtrl', require('./header.controller.js'));
app.controller('MainCtrl', require('./main.controller.js'));
app.controller('HelperCtrl', require('./helper.controller.js'));
app.controller('calendarCtrl', require('./calendar.controller.js'));
