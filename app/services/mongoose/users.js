const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizers = async (req) => {
  const { name, role, email, password, confirmPassword, organizer } = req.body;

  if (confirmPassword !== password) {
    throw new BadRequestError("password dan confirmPassword tidak cocok");
  }

  const organizers = await Organizers.create({ organizer });
  const users = await Users.create({
    name,
    role,
    password,
    email,
    organizer: organizers._id,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req) => {
  const { name, role, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("password dan confirmPassword tidak cocok");

  const result = await Users.create({
    name,
    role,
    email,
    password,
    organizer: req.user.organizer,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find({ role: { $ne: req.user.role } });
  return result;
};

module.exports = { createOrganizers, createUsers, getAllUsers };
