var chokidar = require('chokidar');
var fs = require('fs');

var state = require('./state.js');
var station = require('./station.js');
var sensor = require('./sensor.js');

function fileRead(err, data) {
  if(err) {
    console.log("Error reading file: " + err);
  } else {
    var params = JSON.parse(data);

    if(params.eventType == 'station') {
      station.addEvent(params.data);
    } else if(params.eventType == 'location') {
      state.update(params.data);
    } else if(params.eventType == 'sensor') {
      sensor.update(params.data);
    }
  }
}

function readEvent(path) {
  console.log("File added: " + path);

  // extract the file name
  var fileName = path.split("/")[1];
  console.log("Event occurred at: " + fileName);

  // save
  try {
    fs.readFile(path, 'utf8', fileRead);
  } catch(e) {
    console.log("Error saving event: " + e);
  }
}

exports.init = function() {
  console.log("Watching ./events path");
  chokidar.watch('./events', {ignoreInitial: true})
    .on('all', (event, path) => {
      if(event == "add") {
        readEvent(path);
      }
    });
}

