'use strict';

module.exports = ['$scope', '$state','calendarFactory', function($scope, $state, calendarFactory) {
  var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /**
  * @function This function routign to selected day
  * @param {object} This is object with data of selected day
  */

  $scope.getMessages = function (day) {
      $state.go('main.data', {'year': day.year, 'month' : day.month, 'day' : day.day });
  };

  /**
  * @function This function change month in callendar
  * @param {string} 'right' next month or 'left'- month before
  */

    $scope.changeDate = function (direction) {
      calendarFactory.setingMonth(direction);
      $scope.buidMonth();
    };

    /**
    * @function getting data for building calendar view
    */

    $scope.buidMonth = function () {
      $scope.year = calendarFactory.getYears();
      $scope.month = calendarFactory.getMonths();
      $scope.monthWord = monthNamesShort[$scope.month];
      $scope.days = calendarFactory.getDays();
    };
  $scope.buidMonth();
}];
