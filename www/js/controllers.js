app.controller('DashCtrl', function($scope, SimulatorService, NotificationService) {
	SimulatorService.getFire().$bind($scope, "simulatorData");
	$scope.isEmpty=true;
	$scope.remove=function(sim)
	{
		$scope.simulatorData.$child(sim.$id).$remove();
	}
	$scope.$watch('simulatorData', function(newValue, oldValue) {
                if (newValue && newValue.$getIndex().length){
					//get the last index
					$scope.isEmpty=false;
					var notification=newValue.$child(newValue.$getIndex()[newValue.$getIndex().length-1]);
					if(notification.shown===false)
					{
						NotificationService.show(notification.message, notification.token);
						notification.$update({shown:true});
					}
				}
				else
				{
					$scope.isEmpty=true;
				}
            });
	
})
.controller('SettingsCtrl', function($scope) {
})

.controller('UserInfoCtrl', function($scope, UserInfoService) {
     UserInfoService.getFire().$bind($scope, "userData");
})

.controller('GraphCtrl', function ($scope) {

	  $scope.lineData = {
	    labels : ["January","February","March","April"],
	    datasets : [
	      {
	        fillColor : "rgba(100, 100, 100, 0.05)",
	        strokeColor : "#F7464A",
	        pointColor : "#F7464A",
	        pointStrokeColor : "#fff",
	        data : [40,50,50,50],
	        title:"activity"
	      },
	      {	       
	    	fillColor : "rgba(100, 100, 100, 0.05)",
	        strokeColor : "#7D4F6D",
	        pointColor : "#7D4F6D",
	        pointStrokeColor : "#fff",
	        data : [6,8,8,8],
	        title:"sleep"
	      },
	      {
		        fillColor :"rgba(100, 100, 100, 0.05)",
		        strokeColor : "#9D9B7F",
		        pointColor : "#9D9B7F",
		        pointStrokeColor : "#fff",
		        data : [80,81,90,100],
	      	title:"heart-rate"
		  },
	      {
		        fillColor :"rgba(100, 100, 100, 0.05)",
		        strokeColor : "#949FB1",
		        pointColor : "#949FB1",
		        pointStrokeColor : "#fff",
		        data : [100,100,90,80],
			title:"blood-pressure"
		  
		  }
	    ]
	  };
	  
	  $scope.barData = {
			    labels : ["January","February","March","April"],
			    datasets : [
			      {
//			        fillColor : "rgba(220,220,220,0.5)",
			        fillColor : "F7464A",
			        strokeColor : "rgba(100, 100, 100, 0.05)",
			        data : [40,50,50,50],
			      },
			      {
//			        fillColor : "rgba(151,187,205,0.5)",
			        fillColor : "#7D4F6D",
			        strokeColor : "rgba(100, 100, 100, 0.05)",
			        data : [6,8,8,8],
			      },
			      {
//				        fillColor : "rgb(157, 155, 127,0.5)",
				        fillColor : "#9D9B7F",
				        strokeColor : "rgba(100, 100, 100, 0.05)",
				        data : [80,81,90,100],
				      },
				      {
//				        fillColor : "rgb(148, 159, 177,0.5)",
				        fillColor : "#949FB1",
				        strokeColor : "rgba(100, 100, 100, 0.05)",
				        data : [100,100,90,80]
				      }

			    ]
			  };
	  
	// legend(document.getElementById("lineLegend"),  $scope.lineData);
});
