const express = require("express");
const {
  createUser,
  loginUserCtrl,
  logoutUserCtrl,
  getAllUser,
  handleRefreshToken,
} = require("../controllers/User.ctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserCtrl);
router.get("/all-users",authMiddleware, isAdmin, getAllUser);

module.exports = router;