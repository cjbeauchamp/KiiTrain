exports.addEvent = function(event) {
  console.log("Adding station event:");
  console.log(event);

  // upload to thing-scoped StationEvents bucket
  var bucket = _thingContext.getAuthenticatedThing()
			.bucketWithName("StationEvents");

  // Create a KiiObject.
  var obj = bucket.createObject();

  // Set key-value pairs.
  for(var key in event) {
    obj.set(key, event[key]);
  }

  // Save the KiiObject.
  obj.save().then(
    function(theObject) {
      console.log("Station event saved to cloud!");
    }
  ).catch(
    function(error) {
      console.log("Error saving station event:");
      console.log(error);
    }
  );
}
