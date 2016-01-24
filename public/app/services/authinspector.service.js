'use strict';

module.exports = ['authToken', function(authToken) {
  return {
    /**
    * @function added to headers user token
    * @param {object} config from app.config.js
    */
    request: function (config) {
      var token = authToken.getToken();
      if(token) {
        config.headers.authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function (response) {
      return response;
    }
  };
}];
