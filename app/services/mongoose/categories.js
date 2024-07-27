const Categories = require('../../api/v1/categories/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ _id: id });
  if (!check) throw new NotFoundError(`Tidak ada category dengan id: ${id}`);

  const result = await Categories.create({
    name,
  });

  return result;
};

const getAllCategories = async (req) => {
  const result = await Categories.find();

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada category dengan id:${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    _id: { $ne: id },
    name: name,
  });
  if (!check) throw new BadRequestError('Name category duplikat!');

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
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

const checkingCategory = async (id) => {
  const result = await Categories.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Category dengan id :  ${id}`);

  return result;
};

module.exports = {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategory,
};
