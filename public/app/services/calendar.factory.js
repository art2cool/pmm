'use strict';

module.exports = ['dateBuilder','dataMessage', function (dateBuilder, dataMessage) {

  /**
  * @function This function creating array of month Days;
  * @param {number} firstDay is position on a week about first day in building month
  * @param {number} first Day is position on a week about last day in building month
  * @returns {Array} array of Days Objets for a current month
  */

  function createMonthDays(firstDay, lastDay) {
    var messages = dataMessage.getMesages(),
        endOf, i, array = [];

    var curentDate = dateBuilder.getCurrentDate(),
        y = curentDate.getFullYear(),
        m = curentDate.getMonth();

    for (i = 0; i < firstDay; i++) {
      array.push({day: '.'});
    }
    for (i = 0; i < lastDay; i++) {
      var counts= '';
      for(var j = 0; j < messages.length; j++) {
         var messagedDate = new Date(messages[j]._id);
         var messageDay = messagedDate.getDate();
         var messageYear = messagedDate.getFullYear();
         var messageMonth = messagedDate.getMonth();

         if( (i + 1) === messageDay && m === messageMonth && y === messageYear) {
           counts = messages[j].num_prod;
          }
       }
      array.push({day: i + 1, month: m, year: y, count: counts});
    }
    if(firstDay <= 5) {
      endOf =  42 - lastDay - firstDay - 7;
    } else {
      endOf =  42 - lastDay - firstDay;
    }
    for ( i = 0; i < endOf; i++) {
      array.push({day: '.'});
    }
    return array;
  }

  return {

    /**
    * @function This function return current selected year
    * @returns {number} curent year
    */

    getYears: function () {
      return dateBuilder.getCurrentDate().getFullYear();
    },

    /**
    * @function This function return current selected month
    * @returns {number} curent month
    */

    getMonths: function () {
      return dateBuilder.getCurrentDate().getMonth();
    },

    /**
    * @function This function return array of days
    * @returns {Array} with days objects
    */

    getDays: function () {
      var curentDate = dateBuilder.getCurrentDate(),
          y = curentDate.getFullYear(),
          m = curentDate.getMonth();

      var firstDay = new Date(y, m, 1),
          lastDay = new Date(y, m + 1, 0);

      return createMonthDays(firstDay.getDay(), lastDay.getDate());
    },

    /**
    * @function This function set new seleted month
    * @param {string} getting 'right' or 'left' direction of chooses month
    */

    setingMonth: function (direction) {
      var curentDate = dateBuilder.getCurrentDate(),
          y = curentDate.getFullYear(),
          m = curentDate.getMonth();

      if(direction === 'right') {
        dateBuilder.setCurrentDate(new Date(y,m+2,0));
      } else if(direction === 'left') {
        dateBuilder.setCurrentDate(new Date(y,m,0));
      }
    },
  };
}];
