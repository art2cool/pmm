'use strict';

module.exports = ['$http', '$state', '$scope', '$timeout', 'authToken', 'dataMessage', 'messagesFactory', function ($http, $state, $scope, $timeout, authToken, dataMessage, messagesFactory) {
  $scope.username = authToken.getUser().split('@')[0];
  $scope.getMessages = function (day) {

      $state.go('main.data', {'year': $scope.year, 'month' : $scope.month, 'day' : day });
  };

  $scope.dayMessages = messagesFactory.get();

$scope.removeMessage = function(messId) {
  messagesFactory.deleteMessage(messId);
};

  $scope.submit = function () {

    var messageObj = {
      user: authToken.getUser(),
      date: $scope.date,
      subject: $scope.subject,
      message: $scope.message
    };

  messagesFactory.setMessages(messageObj, function () {
       $scope.complit = 'New task Added';
        $scope.dayMessages = messagesFactory.get();
        $timeout(function() {
          $scope.date = '';
          $scope.subject = '';
          $scope.message = '';
          $scope.complit = '';

        }, 2000 );
  });
};

}];
