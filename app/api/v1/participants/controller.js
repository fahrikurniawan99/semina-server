const {
  signupParticipant,
  activateParticipant,
  singinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getPayment,
} = require("../../../services/mongoose/participants");

const StatusCodes = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await singinParticipant(req);
    res.status(StatusCodes.OK).json({ data: { token: result } });
  } catch (error) {
    next(error);
  }
};

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getPaymentByOrganizer = async (req, res, next) => {
  try {
    const result = await getPayment(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  activeParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
  checkout,
  getPaymentByOrganizer,
};
