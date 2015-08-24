/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var lat, long;

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

var main = new UI.Card({
    title: 'Nearby Cafés!',
    body: 'Loading...',
    scrollable: true,
    style: 'mono'
});

main.show();

function locationSuccess(pos) {
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    ajax(
      {
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAOU315Kg4ffxcC0y5ot2S8kzgsgTgf8To&location=' + lat + ',' + long + '&rankby=distance&keyword=cafe',
        type: 'json'
      },
      function(data, status, request) {
          var name = '';
          for(var i in data.results)
          {
              if (i < 3)
              {
                  name += data.results[i].name + ': ' + data.results[i].vicinity + "\n\n";
              }
          }
          main.body(name);
          console.log('results: ' + name);
      },
      function(error, status, request) {
        console.log('The ajax request failed: ' + error);
      }
    );
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

console.log('Getting location...');
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
console.log('lat=' + lat + ',long=' + long);