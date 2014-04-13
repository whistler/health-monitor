app.factory('Notifications', function() {

  return {
    show: function(message) {
      window.plugin.notification.local.add({message: message, autoCancel: true});
    }
  }
});