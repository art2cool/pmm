'use strict';

module.exports = ['$http', '$q', 'authToken', function($http, $q, authToken) {
  var dayMessages= [];
  return {

    /**
    * @function This function getting messages for seleted day from server and save to cache dayMessages
    * @param {Object} from state (for example - {year: "2016", month: "0", day: "28"})
    * @returns {Object} promise for state
    */

    getMesagessServer: function (param) {

      var deferred = $q.defer();
      var user = {
        user: authToken.getUser()
      };
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

    /**
    * @function This function geting curent Day messages from cache
    * @returns {Array} of objects with Day messages
    */

    get: function () {
      return dayMessages;
    },

    /**
    * @function This function remove selected message from server and cache
    * @param {string} removed messages ID
    */

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

    /**
    * @function This function add new message in server and  to the cache
    * @param {Object} object with new message
    */

    setMessages: function (messageObj, callback) {

      var successCallback = function () {

        if(dayMessages[0]) {
          var current = new Date(dayMessages[0].date);

          if(current.getMonth() === messageObj.date.getMonth() && current.getFullYear() === messageObj.date.getFullYear() && current.getDate() === messageObj.date.getDate()) {

            dayMessages.push({
              subject: messageObj.subject,
              message: messageObj.message,
              date: messageObj.date
            });
          }
        } else {

          dayMessages.push({
            subject: messageObj.subject,
            message: messageObj.message,
            date: messageObj.date
          });

        }
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
