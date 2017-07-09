/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config  = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
// var socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });
// require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
console.log('Express server starting hosting on %d, in %s mode', config.port, app.get('env'));

server.listen(config.port, config.ip, function () {
  console.log(config.ip);
  console.log('Express server listening on %d on %s, in %s mode', config.port, config.ip, app.get('env'));
});

//var theUpdate = 'we received an update';

// Expose app
exports = module.exports = app;
