var mqtt = require('mqtt');
var watch = require('./watch.js');

global._mqttClient = null;
global._installationParams = {};

function connectMQTT(response) {

  _installationParams = response;

  var endpoint = 'mqtt://' + _installationParams.host
  endpoint += ":" + _installationParams.portTCP + "/mqtt";

  _mqttClient = mqtt.connect(endpoint, {
    username: _installationParams.username,
    password: _installationParams.password,
    clientId: _installationParams.mqttTopic,
  });

  _mqttClient.on('connect', function() {
    console.log('MQTT Connected!');
    watch.init();
  });

  _mqttClient.on('message', function(topic, message) { 
    console.log("Message from topic: " + topic);
    console.log(message.toString());
  });

  _mqttClient.on('close', function() {
    console.log('MQTT Closed');
  });
}

function finishMQTTInstallation(response) {
  _thingContext.pushInstallation()
    .getMqttEndpoint(response.installationID)
    .then(connectMQTT)
    .catch(function(error) {
      console.log("Error setting up MQTT: ");
      console.log(error);
    });
}

exports.createInstallation = function() {
  console.log("Creating installation: " + _thingContext);

  _thingContext.pushInstallation()
    .installMqtt(false)
    .then(finishMQTTInstallation);
}
