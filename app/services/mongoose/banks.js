const Banks = require('../../api/v1/banks/model');

const createBanks = async (req) => {
  const { bankName, rekeningNumber, name } = req.body;

  const result = await Banks.create({
    bankName,
    rekeningNumber,
    name,
  });

  return result;
};

const getAllBanks = async (req) => {
  const result = await Banks.find();

  return result;
};

const deleteBanks = async (req) => {
  const { id } = req.params;

  const result = await Banks.findOne({ _id: id });
  await result.deleteOne();

  return result;
};

module.exports = {
  createBanks,
  getAllBanks,
  deleteBanks,
};
