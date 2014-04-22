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
    return {
		getFire:function(){
			return $firebase(ref);
		}
	};
  }]);
