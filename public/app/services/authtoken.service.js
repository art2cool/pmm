'use strict';

module.exports = function ($window) {

  var storage = $window.localStorage;
  var cashedToken;
  var userToken = 'userToken';

  var authToken = {

    /**
    * @function set user token to the localStorage
    * @param {string} user token
    */

    setToken: function(token) {
      cashedToken = token;
      storage.setItem (userToken, token);
    },

    /**
    * @function getuser token from the localStorage
    * @param {string} user token
    */

    getToken: function () {
      if(!cashedToken) {
        cashedToken = storage.getItem(userToken);
      }
      return cashedToken;
    },

    /**
    * @function check is user token in localStorage
    */

    isAuthenticated: function() {
      return !!authToken.getToken();
    },

    /**
    * @function remove token from localStorage
    */

    removeToken: function () {
      cashedToken = null;
      storage.removeItem(userToken);
    },

    /**
    * @function set users name to the localStorage
    * @param {string} user name
    */

    setUser: function (username) {
      storage.setItem ('user', username);
    },

    /**
    * @function getting user from localStorage
    */
    
    getUser: function () {
      return storage.getItem ('user');
    },

    /**
    * @function remove user from localStorage
    */

    removeUser: function () {
      storage.removeItem('user');
    }
  };
  return authToken;
};
