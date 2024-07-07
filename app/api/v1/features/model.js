const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const featureSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    //   imageUrl: {
    //     type: String,
    //     required: true
    //   },
    imageId: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

module.exports = model('Feature', featureSchema);
