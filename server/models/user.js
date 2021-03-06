import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const userSchema = new Schema({
  name: { type: 'String', required: false },
  email: {
    type: String, required: false,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  confirmed: { type: 'Boolean', default: false },
  authyId: String,
  credit: { type: 'Number', default: 0 },
  cellphone: { type: 'Number' },
  city: { type: String, default: 'Indicanos tu ciudad de origen' },
  avatar: { type: String, default: 'https://via.placeholder.com/106x106' },
  google: {
    googleId: { type: String, required: false },
  },
  facebook: {
    facebookId: { type: String, required: false },
  },
  local: {
    cellphone: { type: Number, unique: false },
    password: { type: String, unique: false },
  },
  dateCreated: { type: 'Date', default: Date.now, required: true },
  dateUpdated: { type: 'Date' },
  likes: [{ type: Schema.ObjectId, ref: 'Like' }],
  rateCount: { type: 'Number', default: '0' },
  rateValue: { type: 'Number', default: '0' },
});
// Define schema methods
userSchema.methods = {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.local.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function HashPassword(next) {
  if (!this.local.password) {
    next();
  } else {
    this.local.password = this.hashPassword(this.local.password);
    next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
