app.controller('DashCtrl', function($scope, EngineService, NotificationService) {
    $scope.recommendations = EngineService.recommendations;
    $scope.$watch(
      function() { return EngineService.suggestions },
      function(newSuggestions) {
        $scope.suggestions = newSuggestions;
      }
    )
    
    $scope.suggestions = Object.keys(EngineService.suggestions).map(function (key) {
      return EngineService.suggestions[key];
    });
   
})
.controller('SettingsCtrl', function($scope) {
})

.controller('UserInfoCtrl', function($scope, UserInfoService) {
     UserInfoService.$bind($scope, "userData");
})

.controller('GraphCtrl', function ($scope) {

	  $scope.lineData = {
	    labels : ["January","February","March","April","May","June","July"],
	    datasets : [
	      {
	        fillColor : "rgba(220,220,220,0.5)",
	        strokeColor : "rgba(220,220,220,1)",
	        pointColor : "rgba(220,220,220,1)",
	        pointStrokeColor : "#fff",
	        data : [65,59,90,81,56,55,40]
	      },
	      {
	        fillColor : "rgba(151,187,205,0.5)",
	        strokeColor : "rgba(151,187,205,1)",
	        pointColor : "rgba(151,187,205,1)",
	        pointStrokeColor : "#fff",
	        data : [28,48,40,19,96,27,100]
	      }
	    ]
	  };
});
