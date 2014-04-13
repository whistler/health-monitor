app.factory('NotificationService', function() {

  return {
    show: function(message) {
      window.plugin.notification.local.add({message: message, autoCancel: true});
    }
  }
});