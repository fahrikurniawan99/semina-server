const Talents = require("../../api/v1/talents/model");
const { NotFoundError, BadRequestError } = require("../../errors");
const BadRequest = require("../../errors/bad-request");
const { checkingImage } = require("./images");

const getAllTalents = async (req) => {
  const { keyword } = req.query;
  let condition = { organizer: req.user.organizer };
  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .select("_id name role image")
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "organizer", select: "organizer" });

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name
  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara sudah terdaftar
  if (check) throw new BadRequest("pembicara sudah terdaftar");

  const result = await Talents.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;
  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .select("_id name role image")
    .populate({ path: "image", select: "_id name" });
  if (!result)
    throw new NotFoundError(`tidak pembicara dengan dengan id : ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  // cari image  dengan field image
  await checkingImage(image);

  // cari talents dengan field name dan id selain dari yang di kirimkan dari req.params
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apabila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara sudah terdaftar
  if (check) throw new BadRequestError("pembicara sudah terdaftar");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `tidak ada pembicara dengan id` yang dikirmkan dari client
  if (!result) throw new NotFoundError(`tidak ada pembicara dengan id : ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError(`tidak ada pembicara dengan id : ${id}`);
  result.remove();
  return result;
};

const checkingTalents = async (id) => {
  if (!id) throw new BadRequestError("talent harus di isi");
  const result = await Talents.findOne({ _id: id });
  if (!result) throw new NotFoundError(`tidak ada pembicara dengan id : ${id}`);
  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  checkingTalents,
  updateTalents,
  deleteTalents,
};
