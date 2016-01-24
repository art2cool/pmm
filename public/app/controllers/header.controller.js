'use strict';

module.exports = ['$scope', '$http', 'authToken', '$state',  function($scope, $http, authToken, $state){

	/**
	* username - shown in header
	*/
		$scope.username = authToken.getUser;
	 	$scope.isAuthenticated = authToken.isAuthenticated;

		/**
		* @function This function logout current user and route to login page
		*/

		$scope.logout = function () {

			$http.get('/users/logout').then(function() {
				authToken.removeToken();
				authToken.removeUser();
				$scope.isAuthenticated = authToken.isAuthenticated;
				$state.go('login');
		}, function(err) {
			 console.log(err);
		 });
	 };


}];
