const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const itemSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: 'Indonesia',
    },
    city: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: 'night',
    },
    sumBooking: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    image: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
      },
    ],
    feature: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Feature',
      },
    ],
    activity: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Activity',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Item', itemSchema);
