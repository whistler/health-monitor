app.controller('DashCtrl', function($scope, EngineService, NotificationService) {
    $scope.recommendations = EngineService.recommendations;
    $scope.$watch(
      function() { return EngineService.recommendations },
      function(newRecommendations) { 
        console.log(newRecommendations)
        $scope.recommendations = newRecommendations;
      }
    )
    
    NotificationService.show('hello');
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SettingsCtrl', function($scope) {
})

.controller('UserInfoCtrl', function($scope, UserInfoService) {
     UserInfoService.$bind($scope, "userData");
});