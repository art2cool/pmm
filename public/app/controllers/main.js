'use strict'

module.exports = ['$http', '$scope', '$timeout', '$rootScope', 'authToken', 'dataMessage', 'messages_factory', function ($http, $scope, $timeout, $rootScope, authToken, dataMessage, messages_factory) {
  $scope.username = authToken.getUser().split('@')[0];
  //$scope.dayMessages = [{"_id":"569b627c95e2e8062eec4238","subject":"New year ends","message":"Rly","date":"2016-01-01T22:00:00.000Z","author":"irapsdkiv@gmail.com","__v":0}];
  //console.log($scope.dayMessages);
  $scope.getMessages = function (day) {
      var messageurl = '?year=' + $scope.year + '&month=' +  $scope.month + '&day=' + day;
        messages_factory.getMesages(messageurl, function(error, data) {

           $scope.dayMessages = data;
      });
      console.log(day);
      //  console.log($scope.dayMessages)
  }

  $scope.submit = function () {
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
      $scope.dayMessages.push({
        subject: $scope.subject,
        message: $scope.message,
        date: $scope.date
        });
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
