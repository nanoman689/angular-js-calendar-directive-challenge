angular.module('calendarDemoApp', [])
  .directive('calendar', function(){
    return {
      restrict: 'E',
      templateUrl:'template.html',
      scope:true,
      link: function(scope, element, attrs){
        scope.monthlyRange = CalendarRange.getMonthlyRange(new Date());
        scope.weekNum = function(i){
          return ~~(i / 7);
        }
      }
    }
});

(function(){
  console.log(CalendarRange.getMonthlyRange(new Date()));
})();

var yearPicked = document.getElementById("yearSelect");
var yearSelected = yearPicked.options[yearPicked.selectedIndex].text;
console.log(yearPicked);


// your controller and directive code go here

// Ranges of years

// Given a month, get the range of correct dates. (use the current month for now)

// Use ng-class for the background color of the dates.

// Possibly a week number.

// Use ng-repeat for filling in the dates using ng-repeat conditionals.

// Call the funtion, get the JSON and then parse the JSON to poluate the calendar.
