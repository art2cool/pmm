module.exports = ['dateBuilder','dataMessage', function (dateBuilder, dataMessage) {
  var endOf;

  var messages = dataMessage.getMesages();
  var curentDate = dateBuilder.getCurrentDate();
  var y = curentDate.getFullYear(),
      m = curentDate.getMonth();

  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  function createMonthDays(firstDay, lastDay) {
    var array = [];

    var curentDate = dateBuilder.getCurrentDate();
    var y = curentDate.getFullYear(),
        m = curentDate.getMonth();

    for (var i = 0; i < firstDay; i++) {
      array.push({day: '.'});
    }
    for (var i = 0; i < lastDay; i++) {
      var counts= '';
      for(var j = 0; j < messages.length; j++) {
         var messagedDate = new Date(messages[j]._id);
         var messageDay = messagedDate.getDate();
         var messageYear = messagedDate.getFullYear();
         var messageMonth = messagedDate.getMonth();

         if( (i + 1) == messageDay && m == messageMonth && y == messageYear) {
           counts = messages[j].num_prod;
          }
       }
      array.push({day: i + 1, month: m, year: y, count: counts});
      // debugger;
    }
    if(firstDay <= 5) {
      endOf =  42 - lastDay - firstDay - 7;
    } else {
      endOf =  42 - lastDay - firstDay;
    }
    for (var i = 0; i < endOf; i++) {
      array.push({day: '.'});
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
