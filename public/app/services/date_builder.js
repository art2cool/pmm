'use strict';

module.exports =  function () {
  var curentDate = new Date();

  return {
    getCurrentDate: function () {
    //  console.log('setedDay: ' + curentDate.getFullYear() + ' ' + curentDate.getMonth())
      return curentDate;
    },
    setCurrentDate: function (date) {
    //  console.log('setedDay: ' + curentDate.getFullYear() + ' ' + curentDate.getMonth())
      curentDate = date;
    }
  };
};
