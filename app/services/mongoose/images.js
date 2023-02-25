const Images = require("../../api/v1/images/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });
  return result;
};

const checkingImage = async (id) => {
  if (!id) throw new BadRequestError("image harus di isi");
  const result = await Images.findOne({ _id: id });
  if (!result) throw new NotFoundError(`tidak ada gambar dengan id : ${id}`);
  return result;
};

module.exports = { createImages, checkingImage };
