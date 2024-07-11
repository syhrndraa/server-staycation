const Banks = require('../../api/v1/banks/model');
const { checkingImage } = require('./images');
const { NotFoundError, BadRequestError } = require('../../errors');

const createBanks = async (req) => {
  const { bankName, rekeningNumber, name, image } = req.body;

  await checkingImage(image);
  const check = await Banks.findOne({ bankName });
  if (check) throw new BadRequestError('Nama Bank Duplikat');

  const result = await Banks.create({
    bankName,
    rekeningNumber,
    name,
    image,
  });

  return result;
};

const getAllBanks = async (req) => {
  const result = await Banks.find().populate({
    path: 'image',
    select: '_id imageUrl',
  });

  return result;
};

const getOneBanks = async (req) => {
  const { id } = req.params;

  const result = await Banks.findOne({ _id: id }).populate({
    path: 'image',
    select: '_id imageUrl',
  });
  if (!result) throw new NotFoundError(`Tidak ada bank dengan id : ${id}`);

  await result.findOne();
  return result;
};

const updateBanks = async (req) => {
  const { id } = req.params;
  const { bankName, rekeningNumber, name, image } = req.body;

  await checkingImage(image);

  const check = await Banks.findOne({
    _id: { $ne: id },
    bankName: bankName,
  });

  if (check) throw new BadRequestError('Nama bank duplikat');

  const result = await Banks.findOneAndUpdate(
    { _id: id },
    { bankName, rekeningNumber, name, image },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteBanks = async (req) => {
  const { id } = req.params;

  const result = await Banks.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada bank dengan id : ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  createBanks,
  getAllBanks,
  getOneBanks,
  updateBanks,
  deleteBanks,
};
