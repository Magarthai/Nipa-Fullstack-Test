// const express = require("express");

import express from "express";


//--------------- API LIST ------------------------
const createUser = require("../Api/User/createUser");
const allUserData = require("../Api/User/alluser");
const loginUser = require("../Api/User/loginUser");
const refresh = require("../Api/User/handleRefreshToken");
const logout = require("../Api/User/logout");
//---------------------------------------------
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/user", createUser);
router.get("/user", allUserData);
router.post("/login", loginUser);
router.get("/refresh", refresh);
router.get("/logout", logout);
module.exports = router;