'use strict';

module.exports = ['$q','$http', '$state', 'authToken', function($q, $http, $state, authToken) {
var messages = [];
    return {

      /**
      * @function This function getting count of messages from server and save to cache messages
      * @returns {Object} promise for state
      */

      getMesagesServer: function () {
        var deferred = $q.defer();

        var user = {user: authToken.getUser()};
        var successCallback = function (data) {
          messages = data.data;
          deferred.resolve();
        };
        var errorCallback = function (error) {
          console.log(error);
           deferred.reject();
        };
        $http.post('http://localhost:3000/messages', user).then(successCallback, errorCallback);

        return deferred.promise;
      },

      /**
      * @function This function geting curent messages from cache
      * @returns {Array} of objects with date and count messages in this day
      */

      getMesages: function () {
        return messages;
      }
    };
}];
