exports.addEvent = function(event) {
  console.log("Adding sensor event: " + JSON.stringify(event));

  var bucket = _thingContext.getAuthenticatedThing()
                    .bucketWithName("Events");

  var obj = bucket.createObject();

  for(var key in event) {
    obj.set(key, event[key]);
  }

  obj.save().then(
    function(theObject) {
      console.log("Event saved to cloud!");
      console.log(theObject);
    }).catch(function(error) {
       console.log("Error saving event: " + error);
    });
}
