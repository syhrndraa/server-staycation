const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    itemId: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);
