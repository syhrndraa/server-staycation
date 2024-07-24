const Features = require('../../api/v1/features/model');
const { checkingImage } = require('./images');
const { checkingItem } = require('./items');
const { NotFoundError, BadRequestError } = require('../../errors');

const createFeatures = async (req) => {
  const { name, qty, image, item } = req.body;

  await checkingImage(image);
  await checkingItem(item);

  const result = await Features.create({
    name,
    qty,
    image,
    item,
  });

  return result;
};

const getAllFeatures = async (req) => {
  const result = await Features.find()
    .populate({ path: 'image', select: '_id imageUrl' })
    .populate({
      path: 'item',
      select: '_id title',
    });

  return result;
};

const getOneFeatures = async (req) => {
  const { id } = req.params;
  const result = await Features.findOne({ _id: id })
    .populate({ path: 'image', select: '_id imageUrl' })
    .populate({
      path: 'item',
      select: '_id title',
    });

  if (!result) throw new NotFoundError(`Tidak ada category dengan id:${id}`);

  return result;
};

const updateFeatures = async (req) => {
  const { id } = req.params;
  const { name, qty, image, item } = req.body;

  await checkingImage(image);
  await checkingItem(item);

  const check = await Features.findOne({ _id: id });
  if (!check) throw new NotFoundError(`Tidak ada feature dengan id: ${id}`);

  const result = await Features.findOneAndUpdate(
    { _id: id },
    {
      name,
      qty,
      image,
      item,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteFeatures = async (req) => {
  const { id } = req.params;

  const result = await Features.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada feature dengan id: ${id}`);

  await result.deleteOne();
  return result;
};

module.exports = {
  createFeatures,
  getAllFeatures,
  getOneFeatures,
  updateFeatures,
  deleteFeatures,
};
