var holidays = [
    {
        name: "International Women's Day",
        country: "US",
        date: "2016-03-08"
        },
    {
        name: "Saint Patrick's Day",
        country: "US",
        date: "2016-03-17"
        },
    {
        name: "Palm Sunday",
        country: "US",
        date: "2016-03-20"
        },
    {
        name: "Good Friday",
        country: "US",
        date: "2016-03-25"
        },
    {
        name: "Easter",
        country: "US",
        date: "2016-03-27"
    }
];

angular.module('calendarDemoApp', ['ui.bootstrap'])
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
        getHolidays(scope.monthlyRange.days, holidays);  
          console.log(scope.monthlyRange.days);
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

/* check for the holidays */
var getHolidays = function(days, holidays){
  for (i = 0; i < holidays.length; i++){
      var checkHoliday = Date.parse(holidays[i].date);
        
        for (d = 0; d < days.length; d++){
            var checkDays = days[d].date;
                console.log("checkDays is " + typeof checkDays);
                console.log("checkHolidays is " + typeof checkHoliday);
                /* check the date against the holiday */
                if(checkDays.getMonth() == checkHoliday.getMonth() && checkDays.getDate() == checkHoliday.getDate()){
                    days[d].holiday = holidays[i];
                }
        }
  }
};

/* Get the range of Years */
var yearRange = function(){
    var thisYear = new Date().getFullYear();
    var yearRange = [];
    for (i = thisYear-20; i < thisYear+20; i++)
      yearRange.push(i);
    return yearRange;
};

