'use strict';

var app = require('./app');

var PORT = parseInt(process.env.PORT) || 8080;

app().listen(PORT, function () {
  return console.log('Process ' + String(process.pid) + ' listening on port ' + String(PORT));
});