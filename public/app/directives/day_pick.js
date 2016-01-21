module.exports = ['calendar_factory','dataMessage', 'messages_factory', function(calendar_factory, dataMessage, messages_factory) {
  return {
    restrict: 'E',
  //  controller: 'MainCtrl',
    replace: true,
    scope: {
    //  getMessages: '&',
      month: '@',
      year: '@',
      day: '@',
      count: '@'
    },
    template: "<span ng-click='$parent.getMessages(day)' count='{{day.count}}' class='datepickr-day' day='{{day.day}}' month='{{month}}' year='{{year}}'>{{day}}<sup><span  class='label label-info'>{{count}}</span></sup></span>",
    link: function (scope, element, attr, Ctrl) {

      element.bind('mouseover', function () {
        element.css('background-color', '#DECECE');
      })
      element.bind('mouseleave', function () {
        element.css('background-color', '');
      })
    }
  }
}];
