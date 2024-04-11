const express = require("express");
const multer = require('multer');
const {
    getStatusCount,
    getMonthTicket,
    getSuccessErrorCount,
    getStatusAdminCount,
} = require("../controllers/Dashboard.ctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/getStatusCount', authMiddleware,isAdmin,getStatusCount);
router.get('/getMonthTicket', getMonthTicket,isAdmin,getStatusCount);
router.get('/getSuccessErrorCount', getSuccessErrorCount,isAdmin,getStatusCount);
router.post('/getStatusAdminCount', getStatusAdminCount,isAdmin,getStatusCount);
module.exports = router;
