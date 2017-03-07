'use strict';

// env
process.env.NODE_ENV = 'test';
require('dotenv').config()

// modules
global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./models').default;

global.sinon = require('sinon');
global.chai = require('chai');
global.expect = chai.expect;

// plugins for chai
chai.use(require('chai-as-promised'));
chai.use(require('chai-http'));

// plugins for sinon
require('sinon-mongoose');
require('sinon-as-promised');

// constants
global.PORT = parseInt(process.env.PORT, 10) || 8080;
global.URL = process.env.URL || 'http://localhost:8080';
