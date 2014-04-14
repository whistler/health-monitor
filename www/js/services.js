app.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
app.factory("UserInfoService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://fiery-fire-1643.firebaseio.com/users/1/userInfo");
	var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		if (!error)
		{
			
		}
	});
	auth.login('password', {
	  email: 'health-monitor@googlegroups.com',
	  password: 'teamlifely'
	});
    return $firebase(ref);
  }]);
