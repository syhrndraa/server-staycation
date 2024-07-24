const Categories = require('../../api/v1/categories/model');
const { checkingItem } = require('./items');
const { NotFoundError, BadRequestError } = require('../../errors');
const { create } = require('../../api/v1/Images/controller');

const createCategories = async (req) => {
  const { name, item } = req.body;
  await checkingItem(item);

  const check = await Categories.findOne({ _id: id });
  if (!check) throw new NotFoundError(`Tidak ada category dengan id: ${id}`);

  const result = await Categories.create({
    name,
    item,
  });

  return result;
};

const getAllCategories = async (req) => {
  const result = await Categories.find().populate({
    path: 'item',
    select: '_id title',
  });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id }).populate({
    path: 'item',
    select: '_id title',
  });

  if (!result) throw new NotFoundError(`Tidak ada category dengan id:${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name, item } = req.body;

  await checkingItem(item);

  const check = await Categories.findOne({
    _id: { $ne: id },
    name: name,
  });
  if (!check) throw new BadRequestError('Name category duplikat!');

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name, item },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada category dengan id: ${id}`);

  await result.deleteOne();
  return result;
};

module.exports = {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
