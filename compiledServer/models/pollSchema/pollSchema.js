'use strict';

var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  questions: [{ type: String }],
  votes: [{ type: Number }]
});

module.exports = mongoose.model('Poll', pollSchema);