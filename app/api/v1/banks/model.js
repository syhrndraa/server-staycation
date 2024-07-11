const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const bankSchema = Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    rekeningNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
  },
  { timestamps: true }
);

module.exports = model('Bank', bankSchema);
