'use strict';

const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  questions: [{ type: String }],
  votes: [{ type: Number }]
});

module.exports = mongoose.model('Poll', pollSchema);
