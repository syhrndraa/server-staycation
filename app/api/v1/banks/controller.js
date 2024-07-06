const { StatusCodes } = require('http-status-codes');

const {
  createBanks,
  getAllBanks,
  deleteBanks,
} = require('../../../services/mongoose/banks');

const create = async (req, res, next) => {
  try {
    const result = await createBanks(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllBanks(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = deleteBanks(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  destroy,
};
