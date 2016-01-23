'use strict';

module.exports = ['calendarFactory', function(calendarFactory){
  return {
    templateUrl: "templates/calendar.html",
    restrict: 'E',
    controller: function($scope) {
      var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.changeDate = function (direction) {
          calendarFactory.setingMonth(direction);
          var a = angular.element(document).find('.selected');
          a.removeClass('selected');
          $scope.buidMonth();
        };
        $scope.buidMonth = function () {
          $scope.year = calendarFactory.getYears();
          $scope.month = calendarFactory.getMonths();
          $scope.monthWord = monthNamesShort[$scope.month];
          $scope.days = calendarFactory.getDays();

        };
      $scope.buidMonth();
    },
  };
}];
