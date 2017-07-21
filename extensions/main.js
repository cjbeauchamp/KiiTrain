var _params = null;

/* Linux1 */
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
/* END Linux1 */

/* Android */
function _get_thing_state(thing, context) {

  return new Promise(function(resolve, reject) {

    var adminToken = context.getAppAdminContext()._getToken();
    console.log("Using token: " +adminToken);
    var url = Kii.getBaseURL();
    url = url.substr(0, url.length-4);
    var targetUrl = url + "/thing-if/apps/" + context.getAppID() + "/targets/thing:" + thing._thingID + "/states";

    console.log("Thing url: " + targetUrl);
    $.ajax({
        url: targetUrl,
        type: "GET",
        headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + adminToken,
            "X-Kii-AppId": context.getAppID(),
            "X-Kii-AppKey": context.getAppKey(),
        },
        success: function(body) {
          console.log("Got thing body: " + JSON.stringify(body));
          for(var key in body) {
            thing[key] = body[key];
          }
          resolve(thing);
        },
        error: function(error) {
          console.log("Thing body retrieval error: " + JSON.stringify(error));
          reject(error);
        }
    });

  })
}

function retrieve_train(params, context, done) {

  // make sure we have an authenticated user
  if (context.getAccessToken()) {

    // get all the things!
    var dataParams = {
        thingQuery: {
            clause: {
                type: "all"
            },
            orderBy: "_created",
            descending: false
        },
        bestEffortLimit: 200
    };

    var adminToken = context.getAppAdminContext()._getToken();    
    var targetUrl = Kii.getBaseURL() + "/apps/" + context.getAppID() + "/things/query";
    $.ajax({
        url: targetUrl,
        type: "POST",
        headers: {
            "Accept": "*/*",
            "Authorization": "Bearer " + adminToken,
            "Content-Type": "application/vnd.kii.thingqueryrequest+json",
            "X-Kii-AppId": context.getAppID(),
            "X-Kii-AppKey": context.getAppKey(),
        },
        data: JSON.stringify(dataParams),
        success: function(body) {

          var controller = null;
          var seats = [];
          var doors = [];
          for(var i=0; i<body.results.length; i++) {
            var thing = body.results[i];
            if(thing._thingType == 'controller') {
              controller = thing;
            } else if(thing._thingType == 'seat') {
              seats.push(thing);
            } else if(thing._thingType == 'door') {
              doors.push(thing);
            }
          }

          console.log("Getting thing state: " + JSON.stringify(controller));

          _get_thing_state(controller, context).then(function(controller) {
            console.log("Returning controller: " + JSON.stringify(controller));
            done({
              'train': controller,
              'seats': seats,
              'doors': doors,
            })
          }).catch(function(error) {
            done({"error": error});
          });

        },
        error: function(msg) {
            done({ "error": true });
        }
    });


    // format it nicely

  } else {
    done({"error": "Unable to authorize user"});
  }

}
/* END Android */