const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const imageSchema = Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Image', imageSchema);
