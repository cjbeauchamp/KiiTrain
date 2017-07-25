var chokidar = require('chokidar');
var fs = require('fs');

function fileRead(err, data) {
  if(err) {
   console.log("Error reading file: " + err);
  } else {
    var params = JSON.parse(data);
    console.log(JSON.stringify(params));
  }
}

function readEvent(path) {
  console.log("File added: " + path);

  // extract the file name
  var fileName = path.split('/')[1];
  console.log("Event occurred at file name: " + fileName);

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
      console.log("File changed: " + event + " at path " + path);
      readEvent(path);
    });
};
