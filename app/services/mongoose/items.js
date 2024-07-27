const Items = require('../../api/v1/items/model');
const { checkingImage } = require('./images');
// const { checkingFeature } = require('./features');
const { checkingCategory } = require('./categories');
// const { checkingActivity } = require('./activities');
const { NotFoundError, BadRequestError } = require('../../errors');
const { checkingActivity } = require('./activities');

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
    category,
    image,
    // feature,
    // activity,
  } = req.body;

  for (const cat of category) {
    await checkingCategory(cat);
  }

  for (const img of image) {
    await checkingImage(img);
  }

  // for (const feat of feature) {
  //   await checkingFeature(feat);
  // }

  // for (const act of activity) {
  //   await checkingActivity(act);
  // }

  const check = await Items.findOne({ _id: id });
  if (!check)
    throw new BadRequestError(`Sudah ada item dengan judul: ${title}`);

  const result = await Items.create({
    title,
    price,
    country,
    city,
    isPopular,
    description,
    unit,
    sumBooking,
    category,
    image,
    // feature,
    // activity,
  });

  return result;
};

const getAllItems = async (req) => {
  const result = await Items.find()
    .populate({
      path: 'category',
      select: '_id',
    })
    .populate({
      path: 'image',
      select: '_id imageUrl',
    })
    .populate({
      path: 'feature',
      select: '_id name qty image',
      populate: { path: 'image', select: '_id imageUrl' },
    })
    .populate({
      path: 'activity',
      select: '_id name type image',
      populate: { path: 'image', select: '_id imageUrl' },
    });

  return result;
};

const getOneItems = async (req) => {
  const { id } = req.params;

  const result = await Items.findOne({ _id: id })
    .populate({
      path: 'category',
      select: '_id',
    })
    .populate({
      path: 'image',
      select: '_id imageUrl',
    })
    .populate({
      path: 'feature',
      select: '_id name qty image',
      populate: { path: 'image', select: '_id imageUrl' },
    })
    .populate({
      path: 'activity',
      select: '_id name type image',
      populate: { path: 'image', select: '_id imageUrl' },
    });

  if (!result) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

  return result;
};

const updateItems = async (req) => {
  const { id } = req.params;
  const {
    title,
    price,
    country,
    city,
    isPopular,
    description,
    unit,
    sumBooking,
    category,
    image,
    // feature,
    // activity,
  } = req.body;

  const check = await Items.findOne({ _id: id });
  if (!check) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

  const result = await Items.findOneAndUpdate(
    { _id: id },
    {
      title,
      price,
      country,
      city,
      isPopular,
      description,
      unit,
      sumBooking,
      category,
      image,
      // feature,
      // activity,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteItems = async (req) => {
  const { id } = req.params;

  const check = await Items.findOne({ _id: id });
  if (!check) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

  await result.deleteOne();
  return result;
};

const checkingItem = async (id) => {
  const result = await Items.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

  return result;
};

module.exports = {
  createItems,
  getAllItems,
  getOneItems,
  updateItems,
  deleteItems,
  checkingItem,
};
