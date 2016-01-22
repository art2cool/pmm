'use strict';

module.exports = ['calendar_factory', function(calendar_factory){
  return {
    templateUrl: "templates/calendar.html",
    restrict: 'E',
    controller: function($scope) {
      var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.changeDate = function (direction) {
          calendar_factory.setingMonth(direction);
          $scope.buidMonth();
        };
        $scope.buidMonth = function () {
          $scope.year = calendar_factory.getYears();
          $scope.month = calendar_factory.getMonths();
          $scope.monthWord = month_names_short[$scope.month];
          $scope.days = calendar_factory.getDays();

        };
      $scope.buidMonth();
    },
  };
}];
