const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRole,
} = require("../../../middlewares/auth");

router.get("/categories", authenticateUser, authorizeRole("organizer"), index);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRole("organizer"),
  find
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRole("organizer"),
  create
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRole("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRole("organizer"),
  destroy
);

module.exports = router;
