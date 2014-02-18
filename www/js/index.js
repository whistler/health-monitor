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
      navigator.notification.alert("Welcome to app. Dialog poc");
    });
});
lifely.controller('HomeController', 
  function($scope) {
 //    navigator.notification.alert("Home page");
});
lifely.controller('LoginController', 
  function($scope) {
 //    navigator.notification.alert("Login page");
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
											alert('Fail to get resource');
											alert(jqXHR_f.responseText);
										});

									} else {
										alert('Fail to get access token: verifier, temporary token & scret may be invalid'); 
									}
									
								})
								.fail(function(jqXHR_f, textStatus) {
									alert('Fail to get access token');
									alert(jqXHR_f.responseText);
								});

							} else {
								// authorization fails
								// user provides invalid username or password or she denied access
								alert('fail to authorize');
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
					alert('Fail to get temporary token.');
					alert(jqXHR.responseText);
				});

		/*jq.ajax({
					type: 'GET',
					url: "https://www.fitbit.com/oauth/authorize?display=touch",
					crossDomain: true	
				}).done(function(data) {
						var container = jq('.loginContainer');
						var preForm = container.html();
						container.html("");
						var iframe = jq('<iframe></iframe>').appendTo(container);;
					});*/
		/*var iframe = jq('<iframe src="https://www.fitbit.com/oauth/authorize?display=touch"></iframe>');
		iframe.css({'width': '100%', 'height': '100%', 'border': 'none'});
		jq('.loginContainer').css('height', '100%');
		jq('.loginContainer').html(iframe);*/
	 };
});
lifely.controller('SettingsController', 
  function($scope) {
  //  navigator.notification.alert("Settings page");
});
 lifely.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html',controller  : 'HomeController'})
                .when('/login', {templateUrl: 'login.html',controller  : 'LoginController'})
                .when('/settings/', {templateUrl: 'settings.html',controller  : 'SettingsController'})
				.otherwise({ redirectTo: '/'});
}]);


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
