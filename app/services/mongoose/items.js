const Items = require('../../api/v1/items/model');

const createItems = async (req) => {
  const {
    title,
    price,
    country,
    city,
    isPopular,
    description,
    unit,
    sumBooking,
  } = req.body;

  // cari categories dengan field name
  //   const check = await Categories.findOne({
  //     name,
  //     organizer: req.user.organizer,
  //   });

  //   // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  //   if (check) throw new BadRequestError('kategori nama duplikat');

  const result = await Items.create({
    title,
    price,
    country,
    city,
    isPopular,
    description,
    unit,
    sumBooking,
  });

  return result;
};

const getAllItems = async (req) => {};

module.exports = {
  createItems,
};
