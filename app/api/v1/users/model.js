const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model('User', userSchema);
