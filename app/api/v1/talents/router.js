const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRole,
} = require("../../../middlewares/auth");

router.get("/talents", authenticateUser, authorizeRole("organizer"), index);
router.post("/talents", authenticateUser, authorizeRole("organizer"), create);
router.get("/talents/:id", authenticateUser, authorizeRole("organizer"), find);
router.put(
  "/talents/:id",
  authenticateUser,
  authorizeRole("organizer"),
  update
);
router.delete(
  "/talents/:id",
  authenticateUser,
  authorizeRole("organizer"),
  destroy
);

module.exports = router;
