const {
  createOrganizers,
  createUsers,
  getAllUsers,
} = require("../../../services/mongoose/users");
const StatusCodes = require("http-status-codes");

const getAllCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const createCMSOrganizers = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const createCMSUsers = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCMSOrganizers, createCMSUsers, getAllCMSUsers };
