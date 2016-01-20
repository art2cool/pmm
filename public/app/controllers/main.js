'use strict'

module.exports = ['$http', '$scope', '$timeout', '$compile', '$location', 'authToken', 'dataMessage', function ($http, $scope, $timeout, $compile, $location, authToken, dataMessage) {
  $scope.data;
  $scope.username = authToken.getUser().split('@')[0];
  $scope.messages = [];


  $scope.submit = function () {
    // var urlPath = $scope.date.getFullYear() + '-' + ( $scope.date.getMonth() + 1 )  + '-' + $scope.date.getDate();
    var messageObj = {
      user: authToken.getUser(),
      date: $scope.date,
      subject: $scope.subject,
      message: $scope.message
    };
    console.log(messageObj);

    var successCallback = function (resp) {
      console.log(resp);
      $scope.complit = 'New task Added';

      $timeout(function() {
        $scope.date = '';
        $scope.subject = '';
        $scope.message = '';
        $scope.complit = '';

      }, 2000 );
    }
    var errorCallback = function (error, status) {
      console.log(error);
    }

    $http.post('http://localhost:3000/message/create', messageObj)
      .then(successCallback, errorCallback)
  }
}]
