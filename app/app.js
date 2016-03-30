angular.module('calendarDemoApp', ['ui.bootstrap'])
  .directive('calendar', function($http){
    var fetchHolidays = function(month, year){
    return $http.get('http://holidayapi.com/v1/holidays?country=US&year=' + year + '&month=' + month)
        .then(function(response){
            console.log(response);
            return response.data.holidays;
        });
    }

    /* check for the holidays */
    var getHolidays = function(month, year){
      fetchHolidays(month, year).then(function(holidays){
          var monthlyRange = CalendarRange.getMonthlyRange(new Date(year, month, 1))
          var days = monthlyRange.days;
            console.log(holidays);
            for (i = 0; i < holidays.length; i++){
              var checkHoliday = new Date(holidays[i].date);

                for (d = 0; d < days.length; d++){
                    var checkDays = days[d].date;
                        /* check the date against the holiday */
                        if(checkDays.getMonth() == checkHoliday.getMonth() && checkDays.getDate() == checkHoliday.getDate()){
                            days[d].holiday = holidays[i];
                        }
                }
          }
          return monthlyRange;
      });    

    };
    return {
      restrict: 'E',
      templateUrl:'template.html',
      scope:true,
      link: function(scope, element, attrs){
        var today = new Date();
        scope.month = today.getMonth();

        scope.years = yearRange();
        scope.year = today.getFullYear();
        // scope.monthlyRange = CalendarRange.getMonthlyRange(today);
        // scope.monthlyRange = getHolidays(scope.month, scope.year);
        getHolidays(scope.month,scope.year)  
          .then(function(mRange){
            scope.monthlyRange = mRange;   
          });
        scope.weekNum = function(i){
          return ~~(i / 7);
        }
        scope.dateChanged = function(){
          scope.monthlyRange = getHolidays(scope.month, scope.year);
            .then(function(mRange){
                scope.monthlyRange = mRange;
            });
              //CalendarRange.getMonthlyRange(new Date(scope.year, scope.month, 1));
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

