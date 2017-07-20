exports.update = function(params) {

  var topic = "p/" + _installationParams.mqttTopic
  topic += "/thing-if/apps/" + kii.Kii.getAppID() 
  topic += "/targets/thing:" + _thingContext._thingId 
  topic += "/states";

  var accessToken = _thingContext.getAuthenticatedThing()
			.getAccessToken();

  var requestID = (new Date().getTime());

  var payload = "PUT\r\n";
  payload += "Authorization: Bearer " + accessToken + "\r\n";
  payload += "Content-Type: application/json\r\n";
  payload += "X-Kii-RequestID: " + requestID + "\r\n";
  payload += '\r\n' + JSON.stringify(params) + '\r\n';

  _mqttClient.publish(topic, payload);
}
