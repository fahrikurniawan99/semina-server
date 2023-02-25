const { getAllOrders } = require("../../../services/mongoose/orders.js");
const StatusCodes = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: { order: result.data, pages: result.pages, total: result.total },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };