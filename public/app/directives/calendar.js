module.exports = ['calendar_factory', 'dataMessage', function(calendar_factory, dataMessage){
  return {
    template: "<div class='datepickr'><div class='datepickr-top'><span ng-click='changeDate(\"left\")' class='datepickr-left'>&lt;</span><span class='datepickr-date'><span class='datepickr-month'>{{monthWord}}</span> <span class='datepickr-year'>{{year}}</span></span><span ng-click='changeDate(\"right\")' class='datepickr-right' >&gt;</span></div><div class='datepickr-weekdays'><span class='datepickr-weekday'>Su</span><span class='datepickr-weekday'>Mo</span><span class='datepickr-weekday'>Tu</span><span class='datepickr-weekday'>We</span><span class='datepickr-weekday'>Th</span><span class='datepickr-weekday'>Fr</span><span class='datepickr-weekday'>Sa</span></div><div class='datepickr-days'><span class='datepickr-day' day='{{day}}' month='{{month}}' year='{{year}}' day-pick ng-repeat='day in days track by $index'>{{day}}</span></div></div> ",
    restrict: 'E',
    controller: function($scope) {
      var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      $scope.data;
        $scope.changeDate = function (direction) {
          calendar_factory.setingMonth(direction);

          $scope.buidMonth();
          }
        $scope.buidMonth = function () {

          $scope.year = calendar_factory.getYears();
          $scope.month = calendar_factory.getMonths();
          $scope.monthWord = month_names_short[$scope.month];
          $scope.days = calendar_factory.getDays();


          // dataMessage.getMesages(err, function (  ) {
          //   // body...
          // })
      //    $scope.monthChange();

        }
      $scope.buidMonth();

    //   $scope.monthChange = function (data) {
    //
    //     $(".datepickr-day").css('color', '');
    //
    //     var year = $(".datepickr-day").attr('year');
    //     var month = $(".datepickr-day").attr('month');
    //     debugger;
    //     for(var i = 0; i < data.length; i++) {
    //       var messagedDate = new Date(data[i]._id);
    //       var messageDay = messagedDate.getDate();
    //       var messageYear = messagedDate.getFullYear();
    //       var messageMonth = messagedDate.getMonth();
    //
    //       // console.log(messageYear + '-' + messageMonth + " - " + messageDay);
    //       // console.log(year + '-' + month);
    //
    //       var count = data[i].num_prod;
    //
    //       if( year == messageYear && month == messageMonth) {
    //
    //         var selector = "[day=" + messageDay + "]";
    //         $(selector).css('color', 'red');
    //         $(selector).attr('messenger', count);
    //
    //       var newEl = '<sup><span messenger class="label label-info">' + count + '</span></sup>';
    //         $(selector).append(newEl);
    //       }
    //
    //     }
    //   }
      }
    // link: function (scope, element, attr, Ctrl) {
    // }
  }
}];
