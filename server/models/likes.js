import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const likeSchema = new Schema({
  travel: { id: { type: Schema.Types.ObjectId, ref: 'Travel' } },
  likeCount: { type: 'Number', default: 0 },
  like: { type: 'bool', default: false },
  user: { id: { type: Schema.Types.ObjectId, ref: 'User' } },
  dateCreated: { type: 'Date', default: Date.now, required: true },
  dateUpdated: { type: 'Date' },
});
    // Create reference to User & export
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
