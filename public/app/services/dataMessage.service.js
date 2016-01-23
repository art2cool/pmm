'use strict';

module.exports = ['$q','$http', '$state', 'authToken', function($q, $http, $state, authToken) {
var messages = [];
    return {
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
      getMesages: function () {
        return messages;
      }
    };

}];
