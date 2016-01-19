'use strict';

module.exports = ['$scope', '$http', '$state', 'authToken',  function($scope, $http, $state, authToken){
  $scope.submit = function () {
    $scope.error = '';
    function isValid() {

      //TODO remade validation
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
      console.log(error);
    };

    var successCallback = function(data) {
      var data = data.data;
      $scope.complit = 'User logined';

      authToken.setToken(data.token);
      authToken.setUser(data.user.email);

      console.log(data.user);
      setTimeout(function() {
        $state.go('main');
      }, 2000);
    };
    if(isValid){
    $http.post('http://localhost:3000/users/login',  {
      email: $scope.email,
      pass: $scope.pass,
    }).then(successCallback, errorCallback)
  }
  }
}];
