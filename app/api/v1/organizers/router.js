const express = require("express");
const router = express();
const { createCMSOrganizers, createCMSUsers, getAllCMSUsers } = require("./controller");
const {
  authenticateUser,
  authorizeRole,
} = require("../../../middlewares/auth");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRole("owner"),
  createCMSOrganizers
);
router.post(
  "/admin",
  authenticateUser,
  authorizeRole("organizer"),
  authenticateUser,
  createCMSUsers
);
router.get(
  "/users",
  authenticateUser,
  authorizeRole("owner"),
  authenticateUser,
  getAllCMSUsers
);

module.exports = router;
