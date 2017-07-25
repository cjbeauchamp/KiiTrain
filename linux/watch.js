var chokidar = require('chokidar');
var fs = require('fs');

exports.init = function() {
  console.log("Watching ./events path");
  chokidar.watch('./events', {ignoreInitial: true})
    .on('all', (event, path) => {
      console.log("File changed: " + event + " at path " + path);
    });
};
