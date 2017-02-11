'use strict';

var cluster = require('cluster');
var os = require('os');

function createWorker() {
  var worker = cluster.fork();

  // worker management master-level
  worker.on('message', function () {
    function masterMsg(message) {
      switch (message.type) {
        case 'error':
          console.log('Killing worker ' + String(message.from) + ' due to an error');
          worker.disconnect();
          setTimeout(function () {
            return worker && worker.kill('SIGKILL');
          }, 5000);
          break;
        default:
          console.log('Master received message ' + String(message.type) + ' from worker ' + String(message.from));
      }
    }

    return masterMsg;
  }());

  return worker;
}

// add node cluster multithreading when supported (no windows support)
if (cluster.isMaster) {
  var numCores = os.platform() !== 'win32' ? os.cpus().length : 1;

  console.log('Master cluster setting up ' + String(numCores) + ' workers');
  for (var i = 0; i < numCores; i++) {
    createWorker();
  }

  cluster.on('online', function (worker) {
    return console.log('Worker ' + String(worker.process.pid) + ' is online');
  });

  // reconnect if needed
  cluster.on('exit', function () {
    function onExit(worker, code, signal) {
      console.log('Worker ' + String(worker.process.pid) + ' died. Code: ' + String(code) + ', and signal: ' + String(signal) + ' Restarting in 1s...');
      setTimeout(createWorker, 1000);
    }

    return onExit;
  }());
} else {
  // require pipe server
  require('./server');

  // worker management worker-level
  process.on('message', function () {
    function workerMsg(message) {
      switch (message.type) {
        default:
          console.log('Worker ' + String(process.pid) + ' received message ' + String(message.type));
      }
    }

    return workerMsg;
  }());

  process.on('error', function () {
    function onError() {
      console.log('Worker ' + String(process.pid) + ' experienced an error');
      process.send({ type: 'error', from: process.pid });
    }

    return onError;
  }());

  var ignore = function ignore() {
    return 'Ignoring direct signals to worker';
  };
  process.on('SIGTERM', ignore);
  process.on('SIGINT', ignore);
}