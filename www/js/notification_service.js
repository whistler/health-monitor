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
		show: function(message, title) {
      console.log("Navigator: " + navigator.userAgent);
			var ignored_till = $firebase(ref).ignored_till;
			//alert("ignored_till: " + ignored_till);
			if (ignored_till < 0 || new Date().getTime() < ignored_till) {
				// if ignored_till < 0, the notification is ignored forever
				return;
			}
			if ( !message ) {
				message = "";
			}
			if ( !title ) {
				title = "";
			}
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        // if running on mobile device
        window.plugin.notification.local.add({message: message, title: title, autoCancel: true});
      } else {
        // if running in a browser
        alert(title + ": " + message); //this is the browser
      }
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
