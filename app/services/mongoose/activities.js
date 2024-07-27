const Activities = require('../../api/v1/activities/model');
const Items = require('../../api/v1/items/model');
const { checkingImage } = require('./images');
const { checkingItem } = require('./items');
const { NotFoundError, BadRequestError } = require('../../errors');

const createActivities = async (req) => {
  const { name, type, image, isPopular, item } = req.body;

  await checkingImage(image);
  await checkingItem(item);

  const result = await Activities.create({
    name,
    type,
    image,
    isPopular,
    item,
  });

  const items = await Items.findOne({ _id: id });
  items.activity.push({ _id: result._id });
  await items.save();

  return result;
};

const getOneActivities = async (req) => {
  const { id } = req.params;
  const result = await Activities.findOne({ _id: id })
    .populate({ path: 'image', select: '_id imageUrl' })
    .populate({ path: 'item', select: '_id title' });

  if (!result) throw new NotFoundError(`Tidak ada activity dengan id:${id}`);

  return result;
};

const getAllActivities = async (req) => {
  const result = await Activities.find()
    .populate({ path: 'image', select: '_id imageUrl' })
    .populate({ path: 'item', select: '_id title' });

  return result;
};

const updateActivities = async (req) => {
  const { id } = req.params;
  const { name, type, image, isPopular, item } = req.body;

  await checkingImage(image);
  await checkingItem(item);

  const check = await Activities.findOne({ _id: id });

  if (!check) throw new NotFoundError(`Tidak ada activity dengan id : ${id}`);

  const result = await Activities.findOneAndUpdate(
    { _id: id },
    {
      name,
      type,
      image,
      isPopular,
      item,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteActivities = async (req) => {
  const { id } = req.params;
  const result = await Activities.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada activity dengan id : ${id}`);

  const items = await Items.findOne({ _id: id }).populate({ path: 'activity' });

  for (const act of items.activity) {
    if (act._id.toString() === result._id.toString()) {
      items.activity.pull({ _id: result._id });
      await items.save();
    }
  }

  await result.deleteOne();
  return result;
};

const changeStatusActivities = async (req) => {
  const { id } = req.params;
  const { isPopular } = req.body;
  if (!['True', 'False'].includes(isPopular)) {
    throw new BadRequestError('Status hanya berisi True atau False');
  }

  const check = await Activities.findOne({ _id: id });

  if (!check) throw new NotFoundError(`Tidak ada activity dengan id : ${id}`);

  check.isPopular = isPopular;
  await check.save();
  return check;
};

const checkingActivity = async (id) => {
  const result = await Activities.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada activity dengan id :  ${id}`);

  return result;
};

module.exports = {
  createActivities,
  getOneActivities,
  getAllActivities,
  updateActivities,
  deleteActivities,
  changeStatusActivities,
  checkingActivity,
};
