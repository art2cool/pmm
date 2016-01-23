'use strict';

module.exports =  function () {
  var curentDate = new Date();

  return {
    getCurrentDate: function () {
      return curentDate;
    },
    setCurrentDate: function (date) {
      curentDate = date;
    }
  };
};
