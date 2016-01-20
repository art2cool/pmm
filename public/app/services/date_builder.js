module.exports =  function () {
  var curentDate = new Date(2016,0);

  return {
    getCurrentDate: function () {
      return curentDate;
    },
    setCurrentDate: function (date) {
      curentDate = date;
      console.log('setedDay: ' + date.getFullYear() + ' ' + date.getMonth())
    }
  }
};
