angular.module('calendarDemoApp', [])
  .directive('calendar', function(){
    return {
      restrict: 'E',
      templateUrl:'template.html',
      scope:true,
      link: function(scope, element, attrs){
        var today = new Date();
        scope.month = today.getMonth();
        scope.year = today.getFullYear();
        scope.years = yearRange();
        scope.monthlyRange = CalendarRange.getMonthlyRange(today);
        scope.weekNum = function(i){
          return ~~(i / 7);
        }
        scope.dateChanged = function(){
          scope.monthlyRange = CalendarRange.getMonthlyRange(new Date(scope.year, scope.month, 1));
        }
      }
    }
});

(function(){
  console.log(CalendarRange.getMonthlyRange(new Date()));
})();


var yearRange = function(){
    var thisYear = new Date().getFullYear();
    var yearRange = [];
    for (i = thisYear-20; i < thisYear+20; i++)
      yearRange.push(i);
    return yearRange;
}
// your controller and directive code go here

// Ranges of years

// Given a month, get the range of correct dates. (use the current month for now)

// Use ng-class for the background color of the dates.

// Possibly a week number.

// Use ng-repeat for filling in the dates using ng-repeat conditionals.

// Call the funtion, get the JSON and then parse the JSON to poluate the calendar.
