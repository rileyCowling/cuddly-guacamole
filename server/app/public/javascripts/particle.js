var Particle = require('particle-api-js');
var particle = new Particle();
var token;

particle.login({username: 'rileycowling@outlook.com', password: 'cowwin-jadmy6-Pewcez'}).then(
  function(data) {
    token = data.body.access_token;
    console.log(token);
    var devicesPr = particle.listDevices({ auth: token });

    devicesPr.then(
        function(devices){
            console.log('Devices: ', devices);
        },
        function(err) {
            console.log('List devices call failed: ', err);
        }
    );
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);

