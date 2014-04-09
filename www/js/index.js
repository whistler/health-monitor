var jq = $.noConflict();
angular.module('lifelyCordova', [])
.service('CordovaService', ['$document', '$q',
  function($document, $q) {

    var d = $q.defer(),
        resolved = false;

    var self = this;
    this.ready = d.promise;

    document.addEventListener('deviceready', function() {
      resolved = true;
      d.resolve(window.cordova);
    });

    // Check to make sure we didn't miss the 
    // event (just in case)
    setTimeout(function() {
      if (!resolved) {
        if (window.cordova) d.resolve(window.cordova);
      }
    }, 3000);
}]);

var lifely=angular.module('lifelyApp', ['lifelyCordova','ngRoute', 'ngAnimate']);

lifely.controller('LifelyController', 
  function($scope, CordovaService) {
    CordovaService.ready.then(function() {
	  var myDataRef = new Firebase('https://taycwf2hnde.firebaseio-demo.com/userData');
	  myDataRef.once('value', function(snapshot) {
		  var message = snapshot.val();
		  window.plugin.notification.local.add({message: "Name: " + message.name + " -- Weight: " + message.weight, autoCancel: true, title: "What's in Database"});
      });
	});
});

lifely.controller('LoginController', 
  function($scope) {
	 $scope.submit = function() {
		/* Get the filled email and password */
		var email = jq('#userName').val();
		var password = jq('#password').val();
		/* STEP 1: ask for the token */
		var oauthSev = new OAuthService();
		var jqXHR = oauthSev.makeOAuthRequest('POST', "http://api.fitbit.com/oauth/request_token");
		jqXHR.done(function(response) {
					 var tokenObj = oauthSev.getToken(response);
					 /* STEP 2: redirects to Fitbit's page for authorization */
					 //var redirectURL = "#settings";
					 var redirectURL = "https://www.fitbit.com/oauth/authenticate?oauth_token=" + tokenObj.oauth_token + "&display=touch&requestCredentials=true";
					 /* insert an iframe to display the page */
					 var iframe = jq('<iframe></iframe>', {'src': redirectURL});
					 iframe.css({'width': '100%', 'height': '100%', 'border': 'none'});
					 iframe.load(function(){
						 if (this.contentWindow.location == "https://www.fitbit.com/oauth") {
							// redirection finished
							var pins = iframe.contents().find('.pin');
							if (pins.length > 0) {
								// authorization successfully
								var pin = pins.html();
								/* STEP 3: ask for access token */
								var extraParams = {};
								extraParams.oauth_verifier = pin;
								var jqXHR_access = oauthSev.makeOAuthRequest('POST', "http://api.fitbit.com/oauth/access_token", extraParams, tokenObj);
								jqXHR_access.done(function(res) {
									if (typeof(res) === "string") {
										var accessTokenObj = oauthSev.getToken(res);
										jq('.loginContainer').html("<p>Access token: " + accessTokenObj.oauth_token + "</p>");
										/*****************  The oauth_token should be stored as we will use this token to access the resource
										                    every time without authentication again and again                                 *****************/
										/**** AUTHENTICATION FINISHED ****/
										jq('.loginContainer').html("<p>Login Successfully!</p>");
										/* test accessing resources */
										var jqXHR_resource = oauthSev.makeOAuthRequest('GET', "http://api.fitbit.com/1/user/-/profile.json", {}, accessTokenObj);
										jqXHR_resource.done(function(jsonData) {
											var jsonStr = JSON.stringify(jsonData, null, 4);
											jq('.loginContainer').append("<p>" + jsonStr + "</p>");
										})
										.fail(function(jqXHR_f, textStatus) {
											navigator.notification.alert('Fail to get resource');
											navigator.notification.alert(jqXHR_f.responseText);
										});

									} else {
										navigator.notification.alert('Fail to get access token: verifier, temporary token & scret may be invalid'); 
									}
									
								})
								.fail(function(jqXHR_f, textStatus) {
									navigator.notification.alert('Fail to get access token');
									navigator.notification.alert(jqXHR_f.responseText);
								});

							} else {
								// authorization fails
								// user provides invalid username or password or she denied access
								navigator.notification.alert('fail to authorize');
							}
						 } else {
							 /* fill the email and password for the user */
							 var emails_iframe = iframe.contents().find('#email');
							 if (emails_iframe.length > 0) {
								 emails_iframe.val(email);
								 iframe.contents().find('#password').val(password);
							 }
						 }
						
					 });
					 jq('.loginContainer').css('height', '100%');
					 jq('.loginContainer').html(iframe);
					 
					 
				})
				.fail(function(jqXHR, textStatus) {
					navigator.notification.alert('Fail to get temporary token.');
					navigator.notification.alert(jqXHR.responseText);
				});
	 };
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
   
      angular.bootstrap(document, ['lifelyApp']);

    }
    
};
