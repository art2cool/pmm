module.exports = ['$http', 'authToken', function($http, authToken) {
    return {
      getMesages: function (day, callback) {
        var user = {user: authToken.getUser()};
      var successCallback = function (data) {

        callback(null, data.data);
      }
      var errorCallback = function (error) {
        console.log(error);
      }
        $http.post('http://localhost:3000/messages/data' + day, user).then(successCallback, errorCallback);
      }
    }

}];
