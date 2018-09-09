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
  dateUpdated: { type: 'Date' },
  destino: { type: 'String' },
  likes: { type: Schema.ObjectId, ref: 'User' },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  passenger: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  traveltype: String,
  sits: { type: 'Number', default: '4' },
});

export default mongoose.model('Travel', travelSchema);
