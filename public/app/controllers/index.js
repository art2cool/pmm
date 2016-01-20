'use strict';

var app = angular.module('MyApp');



app.controller('LoginCtrl', require('./login.js'));
app.controller('RegisterCtrl', require('./register.js'));
app.controller('HeaderCtrl', require('./header.js'));
app.controller('MainCtrl', require('./main.js'));
app.controller('HelperCtrl', require('./helper.js'));
