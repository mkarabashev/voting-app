import mongoose from 'mongoose';

const pollSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  questions: [{ type: String }],
  votes: [{ type: Number }]
});

export default mongoose.model('Poll', pollSchema);
