
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  oauth: { type: String, required: true },
  polls: [{ type: Number, ref: 'Poll' }]
});

module.exports = mongoose.model('User', userSchema);
