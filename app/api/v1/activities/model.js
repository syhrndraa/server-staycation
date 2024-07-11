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
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
    isPopular: {
      type: Boolean,
    },
    item: {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

module.exports = model('Activity', activitySchema);
