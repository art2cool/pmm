
module.exports = ['$q','$http', 'authToken', function($q, $http, authToken) {
var messages = [];
    return {
      getMesagesServer: function () {
        var deferred = $q.defer();

        var user = {user: authToken.getUser()};
        console.log(user);
        var successCallback = function (data) {
          messages = data.data;
          deferred.resolve();
        }
        var errorCallback = function (error) {
           deferred.reject();

        }
        $http.post('http://localhost:3000/messages', user).then(successCallback, errorCallback)

        return deferred.promise;
      },
      getMesages: function () {
        return messages;
      }
    }

}];
