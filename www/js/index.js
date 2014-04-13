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
