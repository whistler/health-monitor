app.service('EngineService', ['$http', 'TrendService', function($http, TrendService) {

  // Some fake testing data
  this.suggestions = [];

  var _this = this;
  var ENGINE_URL = "http://lifely.herokuapp.com";

  var SUGGESTIONS = {
        'sleep_low': {
          name: 'Insufficient Sleep',
          icon: 'ion-ios7-moon',
          tips: [
          "A quiet, dark, and cool environment can help promote sound slumber.",
          "Use earplugs, heavy curtains, blackout shades, or an eye mask to block light.",
          "Keep the temperature comfortably cool — between 60 and 75°F.",
          "Keep the the room well ventilated.",
          "Make sure your bed is equipped with a comfortable mattress and pillows.",
          "Relax an hour before bed. Take a bath, read a book, watch television, or practice relaxation exercises."
          ]
        },
        'sleep_high': {
          name: 'Oversleeping',
          icon: 'ion-ios7-moon',
          tips: [
          "The use of alcohol and prescription drugs, can make you feel more tired",
          "Put an alarm to wake up in the morning.",
          "Depression is a leading cause of oversleeping."]
        },
        'activity_low': {
          name: 'Inactive Lifestyle',
          icon: 'ion-ios7-speedometer',
          tips: [
          "Take up a sport",
          "Excercise with your friends to help you be motivated",
          "Take a walk in the morning"]
        },
        'activity_high': {
          name: 'Overactive Lifestyle',
          icon: 'ion-ios7-speedometer',
          tips:[ "Make sure you eat a balanced meal"]
        },
        'bloodpressure_low': {
          name: 'Low Bloodpressure',
          icon: 'ion-waterdrop',
          tips: [
          "Low	Drink plenty of water, low blood pressure is often caused by dehydration",
          "Increasing salt intake increases blood volume, but check with your physician to ensure that it is safe to do for you"
          ]
        },
        'bloodpressure_high': {
          name: 'High Bloodpressure',
          icon: 'ion-waterdrop',
          tips: [
          "Eat dark chocolate, it helps lower blood pressure",
          "Drink tea instead of coffee",
          "Add flaxseeds to your diet, 2 tablespoons in your yogurt and speghatti should do the job.",
          "Take a brisk 15 minutes walk every morning"
          ]
        }
      };

  var TREND_NAMES = {
    sleep_low: 'sleep',
    sleep_high: 'sleep',
    activity_low: 'activity',
    activity_high: 'activity',
    bloodpressure_low: 'bloodpressure',
    bloodpressure_high: 'bloodpressure'
  }

  this.getSuggestions = function (inputdata) {

    console.log('getting recommendations');

    // data for trend chart
    var trends = TrendService(inputdata);

    // query the engine
    return $http.post(ENGINE_URL, inputdata).then(
      function(response){

        var suggestions = [];

        for (i in response.data) {
          var suggestion = response.data[i];
          var category = suggestion['category'];
          var tips = SUGGESTIONS[category];
          var trend_name = TREND_NAMES[category];
          suggestion['history'] = trends[trend_name];
          angular.extend(suggestion, tips);
          console.log(suggestion);
          suggestions.push(suggestion);
        }
        _this.suggestions = suggestions;
        console.log(suggestions);
        return suggestions;

      });

  }

}]);
