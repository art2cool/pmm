'use strict'

module.exports = ['$http', '$scope', '$timeout', '$compile', '$location', 'authToken', 'dataMessage', function ($http, $scope, $timeout, $compile, $location, authToken, dataMessage) {
  $scope.data;
  $scope.username = authToken.getUser().split('@')[0];
  $scope.messages = [];


  /*******************************spaghetti ****************************/
  $("#datepickr-calendar-1").DatePickr({
    onMonthChange: function(){
      $scope.monthChange($scope.data);
      console.log($scope.data);
    },
    onChange: function(e){
     console.log(e.date);


     //TODO search data with url
      var messageurl = '?year=' + e.date.year + '&month=' + e.date.month + '&day=' + e.date.day;
      $location.path('/messages/data');
      $location.search({'year': e.date.year,  'month' : e.date.month, 'day' : e.date.day});

      dataMessage.getMesages(messageurl, function (err, data) {

        if(err) throw err;
        $scope.messages = data;

      });
    }
  });
  $scope.monthChange = function (data) {

    var year = $(".datepickr-day:not(.datepickr-disabled)").attr('data-year');
    var month = $(".datepickr-day:not(.datepickr-disabled)").attr('data-month');

    for(var i = 0; i < data.length; i++) {
      var messagedDate = new Date(data[i]._id);
      var messageDay = messagedDate.getDate();
      var messageYear = messagedDate.getFullYear();
      var messageMonth = messagedDate.getMonth();

      // console.log(messageYear + '-' + messageMonth + " - " + messageDay);
      // console.log(year + '-' + month);

      var count = data[i].num_prod;

      if( year == messageYear && month == messageMonth) {

        var selector = "[data-day=" + messageDay + "]:not(.datepickr-disabled)";
        $(selector).css('color', 'red');
        $(selector).attr('messenger', count);

      var newEl = '<sup><span messenger class="label label-info">' + count + '</span></sup>';
        $(selector).append(newEl);
      }

    }
  }
/********************************************end off spaghetti*************************/

  $scope.getAllMesseges = (function () {
    var errorCallback = function(error, status) {
      console.log(error);
    };

    var successCallback = function(data) {
    $scope.data = data.data;
      $scope.monthChange($scope.data);

      var messagedDate = new Date($scope.data[0]._id);
      var messageDay = messagedDate.getDate();
      var messageYear = messagedDate.getFullYear();
      var messageMonth = messagedDate.getMonth();

      var messageurl = '?year=' + messageYear + '&month=' + messageMonth + '&day=' + messageDay;
      dataMessage.getMesages(messageurl, function (err, data) {
        if(err) throw err;
        $scope.messages = data;

      });
      };
    var user = {user: authToken.getUser()};
    console.log(user);
    $http.post('http://localhost:3000/messages', user).then(successCallback, errorCallback);


  })();


  $scope.submit = function () {
    // var urlPath = $scope.date.getFullYear() + '-' + ( $scope.date.getMonth() + 1 )  + '-' + $scope.date.getDate();
    var messageObj = {
      user: authToken.getUser(),
      date: $scope.date,
      subject: $scope.subject,
      message: $scope.message
    };
    console.log(messageObj);

    var successCallback = function (resp) {
      console.log(resp);
      $scope.complit = 'New task Added';

      $timeout(function() {
        $scope.date = '';
        $scope.subject = '';
        $scope.message = '';
        $scope.complit = '';

      }, 2000 );
    }
    var errorCallback = function (error, status) {
      console.log(error);
    }

    $http.post('http://localhost:3000/message/create', messageObj)
      .then(successCallback, errorCallback)
  }
}]
