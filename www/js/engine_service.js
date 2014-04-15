app.service('EngineService', ['$http', function($http) {

  var testinput = {
    "userinfo": {
        "age": 45,
        "gender": "male",
        "height": 168,
        "weight": [
            {
                "value": 65.3,
                "date": "2012-04-24"
            }, {
                "value": 65.3,
                "date": "2012-04-17"
            }, {
                "value": 65.3,
                "date": "2012-03-24"
            }
        ],
        "hypertension": true,
        "diabetes": true,
        "insomnia": true,
        "cardio": true
    },
    "activities": [{
        "duration": 7.3,
        "date": "2012-04-24"
    }, {
        "duration": 140,
        "date": "2012-04-17"
    }, {
        "duration": 1430,
        "date": "2012-03-24"
    }],
    "sleep": [{
        "minutesAsleep": 453,
        "date": "2012-04-26"
    }, {
        "minutesAsleep": 453,
        "date": "2012-04-25"
    }, {
        "minutesAsleep": 453,
        "date": "2012-04-24"
    }],
    "heartBeats": [{
        "count": 56,
        "date": "2012-04-24"
    }, {
        "count": 60,
        "date": "2012-04-17"
    }, {
        "count": 59,
        "date": "2012-03-24"
    }],
    "bloodPressures": [{
        "systolic": 100,
        "diastolic": 71,
        "date": "2012-04-23"
    }, {
        "systolic": 100,
        "diastolic": 71,
        "date": "2012-04-22"
    }, {
        "systolic": 100,
        "diastolic": 71,
        "date": "2012-04-21"
    }]
  };

  // Some fake testing data
  this.recommendations = [];
  
  var _this = this;
  
  $http.post('http://health-engine.herokuapp.com', testinput)
    .success(function(data, status, headers, config){
      _this.recommendations = data;
    });
    
  this.suggestions = {
        'sleep_low': {
          name: 'Insufficient Sleep',
          icon: 'ion-ios7-moon',
          history: [0, 0, 1, 1, 2],
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
          history: [1, 0, 1, 1, 1],
          tips: [
          "The use of alcohol and prescription drugs, can make you feel more tired",
          "Put an alarm to wake up in the morning.",
          "Depression is a leading cause of oversleeping."]
        },
        'activity_low': {
          name: 'Inactive Lifestyle',
          icon: 'ion-ios7-speedometer',
          history: [0, 2, 2, 0, 1],
          tips: [
          "Take up a sport",
          "Excercise with your friends to help you be motivated",
          "Take a walk in the morning"]
        },
        'activity_high': {
          name: 'Overactive Lifestyle',
          icon: 'ion-ios7-speedometer',
          history: [2, 0, 2, 0, 2],
          tips:[ "Make sure you eat a balanced meal"]
        },
        'bloodpressure_low': {
          name: 'Low Bloodpressure',
          icon: 'ion-waterdrop',
          history: [0, 0, 0, 1, 2],
          tips: [
          "Low	Drink plenty of water, low blood pressure is often caused by dehydration",
          "Increasing salt intake increases blood volume, but check with your physician to ensure that it is safe to do for you"
          ]
        },
        'bloodpressure_high': {
          name: 'High Bloodpressure',
          icon: 'ion-waterdrop',
          history: [0, 0, 0, 1, 2],
          tips: [
          "Eat dark chocolate, it helps lower blood pressure",
          "Drink tea instead of coffee",
          "Add flaxseeds to your diet, 2 tablespoons in your yogurt and speghatti should do the job.",
          "Take a brisk 15 minutes walk every morning"
          ]
        }
      };

}]);