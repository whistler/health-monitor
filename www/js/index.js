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
