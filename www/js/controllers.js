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
	    labels : ["January","February","March","April"],
	    datasets : [
	      {
	        fillColor : "rgba(100, 100, 100, 0.05)",
//	        fillColor :"#FFFFFF",
	        strokeColor : "#F7464A",
	        pointColor : "#F7464A",
	        pointStrokeColor : "#fff",
	        data : [65,59,90,81]
	      },
	      {	        fillColor : "rgba(100, 100, 100, 0.05)",
//	        fillColor :"#FFFFFF",
	        strokeColor : "#7D4F6D",
	        pointColor : "#7D4F6D",
	        pointStrokeColor : "#fff",
	        data : [28,48,40,19]
	      },
	      {
		        fillColor :"rgba(100, 100, 100, 0.05)",
		        strokeColor : "#9D9B7F",
		        pointColor : "#9D9B7F",
		        pointStrokeColor : "#fff",
		        data : [89,80,86,90]
		  },
	      {
		        fillColor :"rgba(100, 100, 100, 0.05)",
		        strokeColor : "#949FB1",
		        pointColor : "#949FB1",
		        pointStrokeColor : "#fff",
		        data : [120,115,130,120]
		  }
	    ]
	  };
	  
	// legend(document.getElementById("lineLegend"),  $scope.lineData);
});
