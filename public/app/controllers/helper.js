'use strict';

module.exports = ['$scope', '$http', function($scope, $http) {

  console.log('hello from help controller');
    var successCallback = function(data) {
      $scope.faq = data.data;
    };
    var errorCallback = function (error) {
      console.log(error);
    };
  $http.get('http://localhost:3000/users/help').then(successCallback, errorCallback);
}];
