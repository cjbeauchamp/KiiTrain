global.kii = require('kii-cloud-sdk').create();
require('./kii.config.js');

var watch = require('./watch.js');

global._thingContext = null;

kii.Kii.authenticateAsThing("controller", "password")
  .then(
    function(thingContext) {
      console.log("Thing Loaded!");
      _thingContext = thingContext;
      watch.init();
      return thingContext;
    }
  ).catch(function(error) {
    console.log("Error authenticating thing: " + JSON.stringify(error));
  });
