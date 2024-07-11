const Activities = require('../../api/v1/activities/model');
const { checkingImage } = require('./images');
const { checkingItem } = require('./items');
const { NotFoundError, BadRequestError } = require('../../errors');

const createActivities = async (req) => {
  const {
    name,
    type,
    image,
    isPopular,
    // item
  } = req.body;

  await checkingImage(image);
  //   await checkingItem(item);
  const check = await Activities.create({
    name,
    type,
    image,
    isPopular,
  });
};

const updateActivities = async (req) => {
  const { id } = req.params;
  const { name, type, image, isPopular } = req.body;

  const check = await Activities.findOne({ _id: id });

  if (!check) throw new NotFoundError(`Tidak ada activity dengan id : ${id}`);

  const result = await Activities.findOneAndUpdate(
    { _id: id },
    {
      name,
      type,
      image,
      isPopular,
    },
    { new: true, runValidators: true }
  );

  return result;
};

module.exports = {
  createActivities,
  updateActivities,
};
