'use strict';

// env
process.env.NODE_ENV = 'test';

// modules
global.sinon = require('sinon');
global.chai = require('chai');
global.expect = chai.expect;
global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// chai config
chai.use(require('chai-http'));
chai.use(require('chai-as-promised'));

// sinon config
//require('sinon-mongoose');
require('sinon-as-promised');

// constants
global.PORT = 3001;
global.URL = `localhost:${PORT}`;
