app.factory("NotificationService", ["$firebase", function($firebase) {
	var ref = new Firebase("https://fiery-fire-1643.firebaseio.com/users/1");
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
		show: function(message) {
			var ignored_till = $firebase(ref).ignored_till;
			//alert("ignored_till: " + ignored_till);
			if (ignored_till < 0 || new Date().getTime() < ignored_till) {
				// if ignored_till < 0, the notification is ignored forever
				return;
			}
			window.plugin.notification.local.add({message: message, autoCancel: true});
		},
		/**
		  * Sets the ignored_till
		  * days: how many days later the notification will be enabled again
		  * sets to -1 to disable the notification forever
		  */
		setIgnoredTill: function(days) {
			if (days < 0) {
				$firebase(ref).ignored_till = -1;
			} else {
				var tillDate = new Date();
				tillDate.setDate(new Date().getDate() + days);
				$firebase(ref).$update({ignored_till: tillDate.getTime()});

			}
		}
	}
}]);