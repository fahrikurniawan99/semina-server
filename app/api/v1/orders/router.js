const express = require("express");
const router = express();
const { index} = require("./controller");
const {
  authenticateUser,
  authorizeRole,
} = require("../../../middlewares/auth");

router.get("/orders", authenticateUser, authorizeRole("owner", "organizer", "admin"), index);

module.exports = router