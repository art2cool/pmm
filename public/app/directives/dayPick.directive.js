'use strict';

module.exports = function() {
  return {
    restrict: 'A',
    link: function (scope, element) {

      element.bind('mouseover', function () {
        element.css('background-color', '#DECECE');
      });
      element.bind('mouseleave', function () {
        element.css('background-color', '');
      });
      element.bind('click', function () {
        var a = angular.element(document).find('.selected');
        a.removeClass('selected');
        element.addClass('selected');
      });
    }
  };
};
