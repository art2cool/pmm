module.exports = ['dateBuilder', function (dateBuilder) {
  var endOf;

  var curentDate = dateBuilder.getCurrentDate();
  var y = curentDate.getFullYear(),
      m = curentDate.getMonth();

  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  function createMonthDays(firstDay, lastDay) {
    var array = [];

    for (var i = 0; i < firstDay; i++) {
      array.push('.');
    }
    for (var i = 0; i < lastDay; i++) {
      array.push(i + 1);
    }
    if(firstDay <= 5) {
      endOf =  42 - lastDay - firstDay - 7;
    } else {
      endOf =  42 - lastDay - firstDay;
    }
    for (var i = 0; i < endOf; i++) {
      array.push('.');
    }
    return array;
  }

  return {
    getYears: function () {
      return dateBuilder.getCurrentDate().getFullYear();
    },
    getMonths: function () {
      return dateBuilder.getCurrentDate().getMonth();
    },
    getDays: function () {
      var curentDate = dateBuilder.getCurrentDate(),
          y = curentDate.getFullYear(),
          m = curentDate.getMonth();

      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);

      return createMonthDays(firstDay.getDay(), lastDay.getDate());
    },
    setingMonth: function (direction) {
      var curentDate = dateBuilder.getCurrentDate(),
          y = curentDate.getFullYear(),
          m = curentDate.getMonth();

      if(direction === 'right') {
          dateBuilder.setCurrentDate(new Date(y,m+2,0));
      } else {
        dateBuilder.setCurrentDate(new Date(y,m,0));
      }
    },
  }
}]
