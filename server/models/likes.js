import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const likeSchema = new Schema({
  travel: { id: { type: Schema.Types.ObjectId, ref: 'Travel' } },
  likeCount: { type: 'Number', default: 0 },
  like: [],
});
    // Create reference to User & export
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
