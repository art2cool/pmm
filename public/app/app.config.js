'use strict';

var app = angular.module('MyApp');

app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {


  $urlRouterProvider.otherwise('/messages/data');

  $stateProvider
  .state('main', {
    url: '/messages/data',
    templateUrl: '/templates/main.html',
    resolve: {
      auth: ["$q", "$location", 'authToken',function($q, $location, authToken) {
      var deferred = $q.defer();
      deferred.resolve();
      if (!authToken.isAuthenticated()) {
         $location.path('/users/login');
      }
      return deferred.promise;
    }]
  },
  controller: 'MainCtrl'
  })
  .state('login', {
    url: '/users/login',
    templateUrl: '/templates/login.html',
    controller: "LoginCtrl"
  })
  .state('register', {
    url: '/users/register',
    templateUrl: '/templates/register.html',
    controller: "RegisterCtrl"
  })
  .state('help', {
    url: '/users/help',
    templateUrl: '/templates/help.html',
    controller: 'HelperCtrl'
  });
  $httpProvider.interceptors.push('authInterceptor');


}]);
