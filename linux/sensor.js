exports.update = function(event) {
  console.log("Updating sensor:");
  console.log(event);

  var entry = kii.Kii.serverCodeEntry("sensor_reading");
  
  entry.execute(event)
    .then(function(params) {
      var execResult = params[2];

      console.log("Sensor reading updated: ");
      console.log(execResult);
    })
    .catch(function(error) {
      console.log("Error executing server code:");
      console.log(error);
    });
}
