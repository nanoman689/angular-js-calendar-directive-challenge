angular.module('getDates', [""])


.controller('myController', function($scope, $http, $sce) {

	$scope.getHolidays = function(){
        
		var url = "https://metropolis-api-calendar.p.mashape.com/holidays";

		$http.jsonp(url)
 			.success(function(response) {
				console.log(response.data);
				$scope.results = response.data;

    })
			.error(function(error) {
			console.log("error");

			});

	};
    
    $scope.getHolidays();
    console.log("getHolidays");
});