import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const userSchema = new Schema({
  Id: { type: 'String' },
  name: { type: 'String', required: true },
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  credit: { type: 'Number', default: 0 },
  cellphone: { type: 'Number' },
  city: String,
  avatar: { data: Buffer, contentType: String },
  google: {
    googleId: { type: String, required: false },
  },
  facebook: {
    facebookId: { type: String, required: false },
  },
  local: {
    cellphone: { type: Number, unique: false, required: false },
    password: { type: String, unique: false, required: false },
  },
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
userSchema.pre('save', function (next) {
  if (!this.local.password) {
    console.log('=======NO PASSWORD PROVIDED=======');
    next();
  } else {
    this.local.password = this.hashPassword(this.local.password);
    next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
