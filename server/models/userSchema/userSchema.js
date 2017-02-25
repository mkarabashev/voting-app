import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  username: {
    type: String,
    required: true
  },
  polls: [{ type: Number, ref: 'Poll' }]
});

export default mongoose.model('User', userSchema);
