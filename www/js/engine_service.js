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
  
  $http.post('http://localhost:5000', testinput)
    .success(function(data, status, headers, config){
      _this.recommendations = data;
      console.log(this.recommendations);
    });
}]);