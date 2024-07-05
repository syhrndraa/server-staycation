const { StatusCodes } = require('http-status-codes');

const { createItems } = require('../../../services/mongoose/items');
// const Items = require('./model');

const create = async (req, res, next) => {
  try {
    // const {
    //   title,
    //   price,
    //   country,
    //   city,
    //   isPopular,
    //   description,
    //   unit,
    //   sumBooking,
    // } = req.body;

    // const result = await Items.create({
    //   title,
    //   price,
    //   country,
    //   city,
    //   isPopular,
    //   description,
    //   unit,
    //   sumBooking,
    // });

    // res.status(200).json({
    //   data: result,
    // });

    const result = await createItems(req);
    // berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};

module.exports = {
  create,
};
