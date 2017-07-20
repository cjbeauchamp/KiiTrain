global.kii = require('kii-cloud-sdk').create();
require('./kii.config.js');

var push = require('./push.js');

global._thingContext = null;

kii.Kii.authenticateAsThing("controller1", "password")
  .then(
    function(thingContext) {
      console.log("Thing loaded!");
      _thingContext = thingContext;
      return thingContext;
    }
  )
  .then(push.createInstallation)
  .catch(function(error) {
    console.log("Error loading thing: " + error);
  });
