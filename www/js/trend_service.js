app.factory('TrendService', function(){

  var trendService = {};

  // the first condition matched from top is used
  // levels: 0=good, 1=caution, 2=bad
  var table = {
    activities: [
      {lessThan: 30, level: 2},
      {lessThan: 60, moreThan: 30, level: 1},
      {moreThan: 60, level: 0}
    ],
    sleep: [
      {lessThan: 6, level: 2},
      {lessThan: 7, moreThan: 6, level: 1},
      {lessThan: 9, moreThan: 7, level: 0},
      {moreThan: 9, level: 2}
    ],
    bloodPressures: [ 
      {lessThan: 90, level: 2},
      {lessThan: 120, moreThan: 90, level: 0},
      {lessThan: 140, moreThan: 120, level: 1},
      {moreThan: 140, level: 2}
    ],
    heartBeats: [
      {lessThan: 60, level: 2},
      {lessThan: 100, moreThan: 60, level: 0},
      {moreThan: 100, level: 2}
    ]
  };

  function getLevel(metric, value) {
    var levels = table[metric];
    var val_level;
    for (i in levels) {
      level = levels[i];
      var lessThanTrue = (!level['lessThan'] || value <= level['lessThan']);
      var moreThanTrue = (!level['moreThan'] || value >= level['moreThan']);
      if (lessThanTrue && moreThanTrue) return level['level'];
    }
  };

  function getTrend(metric, data) {
    if (!data) {
      return [];
    } else {
      var values = getValues(metric, data);
      return values.map(function(x) {
        return getLevel(metric, x);
      })
    };
  };

  function getValues(metric, data) {
    var fields = {
      activities: 'duration',
      sleep: 'minutesAsleep',
      heartBeats: 'count',
      bloodPressures: 'systolic'
    };

    var field = fields[metric];
    var values = data.map(function(x){
      return x[field];
    });
    return values;
  }

  trendService = function (data) {
    return {
      activities: getTrend('activities', data.activities),
      sleep: getTrend('sleep', data.sleep),
      heartBeats: getTrend('heartBeats', data.heartBeats),
      bloodPressures: getTrend('bloodPressures', data.bloodPressures)
    };
  }

  return trendService;

});
