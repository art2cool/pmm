'use strict';

module.exports = ['$scope', '$http', 'authToken', '$state',  function($scope, $http, authToken, $state){
		$scope.username = authToken.getUser;
	 	$scope.isAuthenticated = authToken.isAuthenticated;

  		$scope.logout = function () {

			$http.get('/users/logout').then(function(request) {
				authToken.removeToken();
				authToken.removeUser();
				$scope.isAuthenticated = authToken.isAuthenticated;
				$state.go('login');
		}, function(err) {
			 console.log(err);
		 });
	 };


}];
