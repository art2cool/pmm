module.exports = ['$http', '$rootScope', 'authToken', function($http, $rootScope, authToken) {
  var dayMessages= [];
    return {
      getMesages: function (day,callback) {
        var user = {user: authToken.getUser()};
        var successCallback = function (data) {
          dayMessages = data.data;
          callback(null, dayMessages)
        //  console.log(data.data);
        }
        var errorCallback = function (error) {
          console.log(error);
          callback(error, null);
        }
        $http.post('http://localhost:3000/messages/data' + day, user).then(successCallback, errorCallback);
      },
      get: function () {
        return dayMessages
      }

    }


}];
