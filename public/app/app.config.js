'use strict';

var app = angular.module('MyApp');

app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {


  $urlRouterProvider.otherwise('/messages');

  $stateProvider
  .state('main', {
    url: '/messages',
    views: {
      'header': {
        templateUrl: '/templates/header.html',
        controller: "HeaderCtrl"
      },
      'content': {
        templateUrl: '/templates/main.html',
        controller: 'MainCtrl'
      },
    },
    resolve: {
      auth: ["$q", "$location", 'authToken',function($q, $location, authToken) {
        var deferred = $q.defer();
        deferred.resolve();

        if (!authToken.isAuthenticated()) {
          $location.path('/users/login');
        }
      return deferred.promise;
    }],
      messages: ['dataMessage', function (dataMessage) {
        
        return dataMessage.getMesagesServer();
      }]
    }
  })
  .state('login', {
    url: '/users/login',
      views: {
      'header': {
        templateUrl: '/templates/header.html',
        controller: "HeaderCtrl"
      },
      'content': {
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('register', {
    url: '/users/register',
    views: {
      'header': {
        templateUrl: '/templates/header.html',
        controller: "HeaderCtrl"
      },
      'content': {
        templateUrl: '/templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  .state('help', {
    url: '/users/help',
    views: {
      'header': {
        templateUrl: '/templates/header.html',
        controller: "HeaderCtrl"
      },
      'content': {
        templateUrl: '/templates/help.html',
        controller: 'HelperCtrl'
      }
    }
  });

  $httpProvider.interceptors.push('authInterceptor');


}]);
