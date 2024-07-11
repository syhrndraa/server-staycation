const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const bookingSchema = Schema(
  {
    bookingStartDate: {
      type: Date,
      required: true,
    },
    bookingEndDate: {
      type: Date,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
    },
    // itemId: {
    //   _id: {
    //     type: ObjectId,
    //     ref: 'Item',
    //     required: true,
    //   },
    //   title: {
    //     type: String,
    //     required: true,
    //   },
    //   price: {
    //     type: Number,
    //     required: true,
    //   },
    //   duration: {
    //     type: Number,
    //     required: true,
    //   },
    // },
    bookingDetail: {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    member: {
      type: mongoose.Types.ObjectId,
      ref: 'Member',
    },
    bank: {
      type: mongoose.Types.ObjectId,
      ref: 'Bank',
    },
    payments: {
      proofPayment: {
        type: String,
        required: true,
      },
      bankFrom: {
        type: String,
        required: true,
      },
      accountHolder: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: 'Proses',
      },
    },
  },
  { timestamps: true }
);

module.exports = model('Booking', bookingSchema);
