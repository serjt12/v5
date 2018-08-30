import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  from: { type: 'String', required: true },
  to: { type: 'String', required: true },
  date: { type: 'Date', required: true },
  plate: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  content: { type: 'String' },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  likes: { type: Schema.Types.ObjectId, ref: 'Like' },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: String,
  },
});

export default mongoose.model('Travel', travelSchema);
