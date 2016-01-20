module.exports = ['$compile','dataMessage',function ($compile,dataMessage) {
  return {
    restrict: 'A',
    controller: function () {

      this.allMassages = function() {
        return dataMessage.getMesages();
      }
    },

    link: function (scope, element, attr, Ctrl) {
      scope.messages = Ctrl.allMassages();
        for(var i = 0; i < scope.messages.length; i++) {
          var count = scope.messages[i].num_prod;
          var messagedDate = new Date(scope.messages[i]._id);
          var messageDay = messagedDate.getDate();
          var messageYear = messagedDate.getFullYear();
          var messageMonth = messagedDate.getMonth();

           if( attr.day == messageDay && attr.month == messageMonth && attr.year == messageYear) {
             var newEl = $compile('<sup><span class="label label-info">' + count + '</span></sup>')(scope);
             element.append(newEl);
           }
        }

        element.bind('mouseover', function () {
        element.css('background-color', '#DECECE');
      })
      element.bind('mouseleave', function () {
        element.css('background-color', '');
      })
      element.bind('mousedown', function () {
        console.log(attr.day + ' ' + attr.month + ' ' + attr.year);

      })
    }
  }
}];
