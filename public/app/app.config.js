'use strict';

var app = angular.module('MyApp');

app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider) {

  var day = new Date();
  $urlRouterProvider.otherwise('/messages/data' + '?year=' + day.getFullYear() + '&month=' + day.getMonth() + '&day=' + day.getDate());

  $stateProvider
     $stateProvider
    .state('admin', {
      url: '/admin',
      resolve: {
        auth: ["$q", "$location", '$state', 'authToken',function($q, $location, $state, authToken) {
          var deferred = $q.defer();
            deferred.resolve();

          if (!authToken.isAuthenticated()) {
            $location.path('/users/login');
          }
        return deferred.promise;
       }]
      },
      views: {
        'header': {
          templateUrl: '/templates/header.html',
          controller: "HeaderCtrl"
        },
        'content': {
          templateUrl: '/templates/admin.html',
          controller: "AdminCtrl"
        },
      },
    })
  .state('main', {
    url: '/messages',
    resolve: {
      auth: ["$q", "$location", '$state', 'authToken',function($q, $location, $state, authToken) {
        var deferred = $q.defer();
          deferred.resolve();

        if (!authToken.isAuthenticated()) {
          $location.path('/users/login');
        }
      return deferred.promise;
     }],
      messages: ['dataMessage', function (dataMessage) {
        return dataMessage.getMesagesServer();
      }],

    },
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
  })
  .state('main.data', {
    url: '^/messages/data?year&month&day',
    resolve: {
      auth: ["$q", "$location", '$state', 'authToken',function($q, $location, $state, authToken) {
        var deferred = $q.defer();
          deferred.resolve();

        if (!authToken.isAuthenticated()) {
          deferred.reject();
          $location.path('/users/login');
        }
      return deferred.promise;
      }],
      data: ['$stateParams','messagesFactory', function($stateParams, messagesFactory) {
        return messagesFactory.getMesagessServer($stateParams);
        }
      ],
    },
    views: {
      'messages': {
        templateUrl: '/templates/messages.html',
        controller: "MainCtrl"
      },
      'calendar': {
        templateUrl: 'templates/calendar.html',
        controller: 'calendarCtrl'
      }
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
