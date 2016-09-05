angular.module('calendarDemoApp', ['ui.bootstrap'])
    .factory('Holidays', function($http){
        var API = "988cc387-9dee-4630-a9c8-c3b232a9a84b";
        var getHolidays = function(year, month){
                return $http
                    .get('https://holidayapi.com/v1/holidays?country=US&year=' + year + '&month=' + month +'&key=' + API)
                    .then(function(response){
                        return response.data.holidays;
                    })
            }
        return {
            addHolidaysToCalendar:function(monthlyRange){
                return getHolidays(monthlyRange.start.getFullYear(), monthlyRange.start.getMonth() + 1)
                    .then(function(holidays){
                    var days = monthlyRange.days;
                    for (i = 0; i < holidays.length; i++){
                        var parts = holidays[i].date.match(/(\d+)/g);
                        var checkHoliday = new Date(parts[0], parts[1]-1, parts[2]);
                        console.log('Holiday: ' + checkHoliday.getUTCDate() + ':' + checkHoliday.getMonth());

                        for (d = 0; d < days.length; d++){
                            var checkDays = days[d].date;
                            console.log('Day: ' + checkDays.getDate()+ ':' + checkDays.getMonth());

                            /* check the date against the holiday */
                            if(checkDays.getMonth() == checkHoliday.getMonth() && checkDays.getDate() == checkHoliday.getDate()){
                                console.log('There is a holiday on this date: ' + holidays[i]);
                                days[d].holiday = holidays[i];
                            }
                        }
                    }
                    return monthlyRange;
                });
            }
        };
    })
  .directive('calendar', function(Holidays){
    return {
      restrict: 'E',
      templateUrl:'template.html',
      scope:true,
      link: function(scope, element, attrs){
        var today = new Date();
        scope.month = today.getMonth();
        scope.years = yearRange();
        scope.year = today.getFullYear();
        Holidays.addHolidaysToCalendar(CalendarRange.getMonthlyRange(today))
          .then(function(mRange){
            scope.monthlyRange = mRange;
          });
        scope.weekNum = function(i){
          return ~~(i / 7);
        }
        scope.dateChanged = function(){
          Holidays.addHolidaysToCalendar(CalendarRange.getMonthlyRange(new Date(scope.year, scope.month, 1)))
          .then(function(mRange){
            scope.monthlyRange = mRange;
          });
        }
      }
    }
});

(function(){
  console.log(CalendarRange.getMonthlyRange(new Date()));
})();

/* Get the range of Years */
var yearRange = function(){
    var thisYear = new Date().getFullYear();
    var yearRange = [];
    for (i = thisYear-20; i < thisYear+20; i++)
      yearRange.push(i);
    return yearRange;
};

/* 

API Key - 988cc387-9dee-4630-a9c8-c3b232a9a84b 
https://holidayapi.com/v1/holidays?country=US&year=2016&month=9&key=988cc387-9dee-4630-a9c8-c3b232a9a84b

*/
