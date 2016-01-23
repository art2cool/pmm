'use strict';

module.exports = ['$http', '$q', 'authToken', function($http, $q, authToken) {
  var dayMessages= [];
  return {
    getMesagessServer: function (param) {

      var deferred = $q.defer();

      var user = {user: authToken.getUser()};

      var successCallback = function (data) {
        dayMessages = data.data;
        deferred.resolve();
      };
      var errorCallback = function (error) {
        console.log(error);
        deferred.reject();
      };

      $http.post('http://localhost:3000/messages/data' + '?year=' + param.year + '&month=' + param.month + '&day=' + param.day, user).then(successCallback, errorCallback);
      return deferred.promise;
    },
    get: function () {
      return dayMessages;
    },
    deleteMessage: function(messId) {

      var successCallback = function () {
        for(var i = 0; i < dayMessages.length; i++) {
          if(dayMessages[i]._id === messId ) {
            dayMessages.splice(i, 1);
          }
        }
      };
      var errorCallback = function (error) {
        console.log(error);
      };

      $http.post('http://localhost:3000/message/remove', {id: messId})
      .then(successCallback, errorCallback);


    },
    setMessages: function (messageObj, callback) {

      var successCallback = function () {
        dayMessages.push({
          subject: messageObj.subject,
          message: messageObj.message,
          date: messageObj.date
          });
          callback();
      };
      var errorCallback = function (error) {
        console.log(error);
        callback();
      };

      $http.post('http://localhost:3000/message/create', messageObj)
      .then(successCallback, errorCallback);
    }

  };
}];
