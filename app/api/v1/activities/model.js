const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const activitySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    imageId: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
    isPopular: {
      type: Boolean,
    },
    itemId: {
      type: ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

module.exports = model('Activity', activitySchema);
