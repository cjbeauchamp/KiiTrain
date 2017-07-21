var _params = null;

function _update_thing(thing) {
  return new Promise(function(resolve, reject) {
    console.log("Thing loaded: " + thing.getVendorThingID());
    thing.fields.status = _params.status;
    thing.update().then(resolve).catch(reject);
  });
}

function sensor_reading(params, context, done) {

  _params = params;

  var adminContext = context.getAppAdminContext();

  adminContext.loadThingWithVendorThingID(params.identifier)
    .then(_update_thing)
    .then(done)
    .catch(function(error) {
      console.log("Error loading thing:");
      console.log(error);
    });
}
