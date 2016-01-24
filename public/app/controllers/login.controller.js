'use strict';

module.exports = ['$scope', '$http', '$state', 'authToken',  function($scope, $http, $state, authToken){
  $scope.submit = function () {
    $scope.error = '';
    function isValid() {

      if (!$scope.email || !$scope.pass){
        $scope.error = 'Fill all filds';
        return false;
      } else if($scope.pass !== $scope.pass2) {
        $scope.error = 'Passwords should be the same';
        return false;
      } else {
        return true;
      }
    }

    var errorCallback = function(error, status) {
      $scope.error = error.data;
      console.log(error, status);
    };

    var successCallback = function(resp) {
      var data = resp.data;
      $scope.complit = 'User logined';

      authToken.setToken(data.token);
      authToken.setUser(data.user.email);

      var today = new Date();

      setTimeout(function() {
        $state.go('main.data', {'year': today.getFullYear(), 'month' : today.getMonth(), 'day' : today.getDate() });
      }, 1000);
    };
    if(isValid){
      $http.post('http://localhost:3000/users/login',  {
        email: $scope.email,
        pass: $scope.pass,
      }).then(successCallback, errorCallback);
    }
  };
}];
