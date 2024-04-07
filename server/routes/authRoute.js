const express = require("express");
const {
  createUser,
  loginUserCtrl,
  logoutUserCtrl,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  handleRefreshToken,
} = require("../controllers/User.ctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logoutUserCtrl);
router.get("/all-users",authMiddleware, isAdmin, getAllUser);
router.get("/:phone",authMiddleware, isAdmin, getSingleUser);
router.put("/update/:phone", updateUser);
router.post("/delete/:phone", deleteUser);

module.exports = router;
