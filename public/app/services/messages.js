module.exports = ['$http', 'authToken', function($http, authToken) {
    var messages = [];

    var successCallback = function(data) {

      var messagedDate = new Date($scope.data[0]._id);
      var messageDay = messagedDate.getDate();
      var messageYear = messagedDate.getFullYear();
      var messageMonth = messagedDate.getMonth();

      var messageurl = '?year=' + messageYear + '&month=' + messageMonth + '&day=' + messageDay;
      dataMessage.getMesages(messageurl, function (err, data) {
        if(err) throw err;

      });
      };
    var user = {user: authToken.getUser()};
    $http.post('http://localhost:3000/messages', user).then(successCallback, errorCallback);
    return {
      
    }
}];
