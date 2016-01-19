module.exports = [ function(){
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attr) {
      //  console.log(element.parent().parent().parent());
        element.on('click', function (e) {

          console.log(e.target);
//          dataMessage.getMesages(attr.day);
        });
      }
    }
}];
