'use strict';

module.exports = ['$http', '$location', '$state', '$scope', '$timeout', 'authToken', 'dataMessage', 'messagesFactory', function ($http, $location, $state, $scope, $timeout, authToken, dataMessage, messagesFactory) {
  $scope.username = authToken.getUser().split('@')[0];

  /**
  Getting messages for carrent day from messagesFacrory
  */
  $scope.dayMessages = messagesFactory.get();

  /**
  * @function This function removes target message
  * @param {string} This is message id of removed messages
  */

  $scope.removeMessage = function(messId) {
    messagesFactory.deleteMessage(messId);
  };

/**
* Getting data from location params
*/
  var selectedDay = new Date($location.search().year, $location.search().month, $location.search().day);
  $scope.selectedDayMessages = selectedDay;
  $scope.date = selectedDay;
  
/**
* @function This function adds new message to this selected day
*/

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
/**
* Clearing form after 2 sec
*/
      $timeout(function() {
        $scope.date = '';
        $scope.subject = '';
        $scope.message = '';
        $scope.complit = '';

      }, 2000 );
    });
  };

}];
