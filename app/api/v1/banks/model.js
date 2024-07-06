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
    //   imageUrl: {
    //     type: String,
    //     required: true,
    //   },
  },
  { timestamps: true }
);

module.exports = model('Bank', bankSchema);
